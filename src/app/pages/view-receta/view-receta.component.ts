import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recetas } from 'src/app/modelos/datos';
import { RecetasService } from '../servicios/recetas.service';

@Component({
  selector: 'app-view-receta',
  templateUrl: './view-receta.component.html',
  styleUrls: ['./view-receta.component.scss']
})
export class ViewRecetaComponent {

  datos: Recetas = new Recetas();

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private recetaSer: RecetasService) {
      this.route.params.subscribe(params => {
        console.log(params)
        if (params['id']) {
          this.loadReceta(params['id'])
        }
      })
    
  }

  loadReceta(uid: string) {
    this.recetaSer.getReceta(uid).subscribe(data => {
      console.log(data)
      this.datos = <any> data;
    })
  }

  goReceta(){
    console.log("llamado a recetas", this.datos)
    //this.router.navigate(['pages/recetas'])
  }

  goListado (){
    this.router.navigate(['pages/recetas'])
  }
}
