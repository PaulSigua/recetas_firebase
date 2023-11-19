import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Event, NavigationEnd, Router } from '@angular/router';
import { ref } from 'firebase/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recetas } from 'src/app/modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  public currentUrl = new BehaviorSubject<any>(undefined);

  datos: Recetas[];

  recetas: Recetas[] = [];
  recetasSer!: RecetasService;


  private path = '/recetas'
  recetasRef: AngularFirestoreCollection<any>

  constructor(private router: Router, private db: AngularFirestore) {
    this.recetasRef = db.collection(this.path)
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

  addInfo(dato: Recetas) {
    this.datos.push(dato);
    let datos: Recetas[] = [];
    if (localStorage.getItem('datos') === null) {
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    } else {
      datos = JSON.parse(localStorage.getItem('datos')!);
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  }

  editarInfo(recetaExistente: Recetas, nuevaReceta: Recetas) {
    const recetas = this.recetasSer.getInfo();
    const indice = recetas.findIndex(r => r === recetaExistente);

    if (indice !== -1) {
      recetas.splice(indice, 1, nuevaReceta);
      localStorage.setItem('datos', JSON.stringify(recetas)!);
    }
  }

  getAll() {
    return this.recetasRef.valueChanges();
  }

  save(receta: Recetas) {
    const uid = this.db.createId()
    //const dataWithId = { uid, ...receta };
    //return this.contactosRef.doc(uid).set(Object.assign({}, dataWithId))
    return this.recetasRef.doc(uid).set(Object.assign({}, Recetas))
  }

  getReceta(uid: string) {
    console.log('uid', uid)
    return this.db.doc(this.path + '/' + uid).valueChanges()
  }

}
