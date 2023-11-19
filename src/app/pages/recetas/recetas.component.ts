import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../servicios/recetas.service';
import { Recetas } from 'src/app/modelos/datos';
import { Router } from '@angular/router';
import { ContactosFirebaseService } from '../servicios/recetas-firebase.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  template: `<form (ngSubmit)="buscar()">
  <input [(ngModel)]="palabraClave" placeholder="Buscar recetas">
  <button type="submit">Buscar</button>
</form>`,
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent {

  receta!: RecetasService;
  recetas: Recetas[] = [];

  listaRecetas: any;

  busquedaNombre: string = '';

  constructor(
    private router: Router,
    private recetasSer: RecetasService,
    private recetasFire: ContactosFirebaseService
  ) {
    this.recetas = recetasSer.getInfo();
    this.listaRecetas = this.recetasSer.getAll();
    console.log('Viendo: ' + this.listaRecetas)

    this.recetasFire.getRecetas().subscribe((recetas) =>
      this.recetas = recetas)

  }

  eliminarReceta(dato: Recetas) {
    const confirmarEli = window.confirm('¿Desea eliminar la receta?');

    if (confirmarEli) {
      for (let i = 0; i < this.recetas.length; i++) {
        if (dato == this.recetas[i]) {
          this.recetas.splice(i, 1);
          localStorage.setItem('datos', JSON.stringify(this.recetas));
        }
      }
    } else {
      console.log('No se elimino la receta');
    }
  }

  editarReceta(dato: Recetas) {
    /**const index = this.datos.indexOf(dato);

    let params: NavigationExtras = {
      queryParams: {
        dato: this.datos
      }
    }

    if (index !== -1) {
      this.router.navigate(['/inicio'], params);
    }*/

  }


  actualizarRecetas() {
    console.log("llamado a recetas", this.recetas)
  }

  buscarRecetas() {
    if (this.busquedaNombre.trim() !== '') {
      this.recetasFire
        .buscarRecetas(this.busquedaNombre.toLowerCase())
        .subscribe((recetas) => {
          console.log("recetas encontradas: ", recetas)
          this.recetas = recetas;
        });
    } else {
      // Si la búsqueda está vacía, muestra todas las recetas
      this.recetasFire.getRecetas().subscribe((recetas) => {
        this.recetas = recetas;
        //console.log("todas las recetas: " + recetas);
      });
    }
  }

}