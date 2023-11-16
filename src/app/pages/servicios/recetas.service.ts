import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Datos } from 'src/app/modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  public currentUrl = new BehaviorSubject<any>(undefined);

  datos: Datos[];
  recetasSer!: RecetasService;

  constructor(private router: Router) {

    this.datos = [];

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  getInfo() {
    if (localStorage.getItem('datos') === null) {
      return this.datos;
    } else {
      this.datos = JSON.parse(localStorage.getItem('datos')!);
      return this.datos;
    }
  }

  addInfo(dato: Datos) {
    this.datos.push(dato);
    let datos: Datos[] = [];
    if (localStorage.getItem('datos') === null) {
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    } else {
      datos = JSON.parse(localStorage.getItem('datos')!);
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  }

  editarInfo(recetaExistente: Datos, nuevaReceta: Datos) {
    const recetas = this.recetasSer.getInfo();
    const indice = recetas.findIndex(r => r === recetaExistente);

    if (indice !== -1) {
      recetas.splice(indice, 1, nuevaReceta);
      localStorage.setItem('datos', JSON.stringify(recetas)!);
    }
  }

}
