import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Datos } from './modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class RecetasFirebaseService {

  recetas: Datos [] = [];

  private path = '/recetas'
  recetasRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
    this.recetasRef = db.collection(this.path);

    this.recetasRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  getAll(){
    return this.recetasRef.valueChanges();
  }

  save(receta: Datos){
    const uid = this.db.createId();
    receta.uid =  uid;
    this.recetasRef.doc(uid).set(Object.assign({}, receta));

  }

}
