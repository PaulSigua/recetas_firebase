import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../servicios/recetas.service';
import { Recetas } from 'src/app/modelos/datos';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactosFirebaseService } from '../servicios/recetas-firebase.service';
import { updateDoc, doc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  template: `<form (ngSubmit)="buscar()">
  <input [(ngModel)]="palabraClave" placeholder="Buscar recetas">
  <button type="submit">Buscar</button>
</form>`,
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {

  recetaEditando!: Recetas;
  mostrarFormulario = false;

  receta!: RecetasService;
  recetas: Recetas[] = [];

  listaRecetas: any;

  datos: Recetas = new Recetas();

  busquedaNombre: string = '';

  constructor(
    private router: Router,
    private recetasSer: RecetasService,
    private recetasFire: ContactosFirebaseService,
    private firestore: Firestore,
  ) {
    this.recetas = recetasSer.getInfo();
    this.listaRecetas = this.recetasSer.getAll();
    //console.log('Viendo: ' + this.listaRecetas)

    this.recetasFire.getRecetas().subscribe((recetas) =>
      this.recetas = recetas)
  }

  async eliminarReceta(receta: Recetas) {
    const confirmacion = window.confirm(`¿Deseas eliminar la receta ${receta.nombre}?`)

    if (confirmacion) {
      const respuesta = this.recetasFire.eliminarReceta(receta);
      console.log(respuesta);
    } else {
      console.log("no se elimino la receta");
    }

  }

  async actualizarReceta(receta: Recetas) {

    try {
      this.recetaEditando = receta;
      this.mostrarFormulario = true;

      const formulario = document.getElementById('formularioReceta') as HTMLFormElement;

      const nombre = (formulario.elements.namedItem('nombre') as HTMLTextAreaElement).value;
      const ingredientes = (formulario.elements.namedItem('ingredientes') as HTMLTextAreaElement).value;
      const procedimiento = (formulario.elements.namedItem('procedimiento') as HTMLTextAreaElement).value;

      const recetaRef = doc(this.firestore, `recetas/${receta.uid}`);
      const datos = {
        nombre: nombre,
        ingredientes: ingredientes,
        procedimiento: procedimiento
      };

      if (datos.nombre == '' || datos.ingredientes == '' || datos.procedimiento == '') {
        alert("Debe llenar todos los parametros");
      } else {

        const confirmacion = window.confirm("¿Seguro que deseas actualizar?")

        if (confirmacion) {
          return await updateDoc(recetaRef, datos);
          this.mostrarFormulario = false;
        } else {
          this.mostrarFormulario = true;
        }
      }
    } catch (e) {
      //console.log(e);
    }

  }

  cancelarEdicion(receta: Recetas) {
    this.mostrarFormulario = false;
  }

  ngOnInit(): void {
    this.recetasFire.getRecetas().subscribe(recetas => {
      console.log(recetas);
      this.recetas = recetas;
    })
  }

}