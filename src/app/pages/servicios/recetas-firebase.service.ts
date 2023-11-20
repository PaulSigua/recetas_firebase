import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Recetas } from 'src/app/modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class ContactosFirebaseService{


  private path = '/recetas'
  recetasRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore,
    private firestore: Firestore) {
    this.recetasRef = db.collection(this.path)

    this.recetasRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  saveRecetaFirebase(receta: Recetas) {
    const uid = this.db.createId();
    receta.uid = uid;
    this.recetasRef.doc(uid).set(Object.assign({}, receta));
  }

  getRecetas(): Observable<Recetas[]> { //Este metodo me devuelve un observable para poder obtener todas las recetas
    const respuesta = collection(this.firestore, 'recetas');
    return collectionData(respuesta, {idField: 'uid'}) as Observable<Recetas[]>;
  }

  eliminarReceta(receta: Recetas){
    const recetaRef = doc(this.firestore, `recetas/${receta.uid}`);
    return deleteDoc(recetaRef);
  }

}

