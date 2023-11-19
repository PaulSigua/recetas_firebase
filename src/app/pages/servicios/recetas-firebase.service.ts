import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Recetas } from 'src/app/modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class ContactosFirebaseService {


  private path = '/recetas'
  recetasRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
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

  getRecetas(): Observable<Recetas[]> {
    return this.db.collection<Recetas>('recetas').valueChanges();
  }

  buscarRecetas(nombre: string): Observable<Recetas[]> {
    return this.db
      .collection<Recetas>('recetas', (ref) =>
        ref.where('nombre', '>=', nombre).where('nombre', '<=', nombre + '\uf8ff')
      )
      .valueChanges();
  }
}

