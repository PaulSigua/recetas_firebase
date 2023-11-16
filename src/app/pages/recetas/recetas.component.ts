import { Component } from '@angular/core';
import { RecetasFirebaseService } from 'src/app/recetas-firebase.service';
import { RecetasService } from '../servicios/recetas.service';
import { Datos } from 'src/app/modelos/datos';
import { Router } from '@angular/router';

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
  datos: Datos[] = [];

  listaRecetas: any;


  constructor(
    private router: Router,
    public recetasSer: RecetasService,
    private recetaFire: RecetasFirebaseService,
  ) {
    this.datos = recetasSer.getInfo();
    this.listaRecetas = this.recetaFire.getAll();
    console.log('Viendo: ' + this.listaRecetas)

  }

  eliminarReceta(dato: Datos) {
    const confirmarEli = window.confirm('¿Desea eliminar la receta?');

    if (confirmarEli) {
      for (let i = 0; i < this.datos.length; i++) {
        if (dato == this.datos[i]) {
          this.datos.splice(i, 1);
          localStorage.setItem('datos', JSON.stringify(this.datos));
        }
      }
    } else {
      console.log('No se elimino la receta');
    }
  }

  editarReceta(dato: Datos) {
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
    console.log("llamado a recetas", this.datos)
  }

}