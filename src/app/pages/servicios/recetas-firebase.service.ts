import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Datos } from 'src/app/modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class ContactosFirebaseService {

  
  private path = '/recetas';

  contactosRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) { 
    this.contactosRef = db.collection(this.path)

    this.contactosRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  getAll(){
    return this.contactosRef.valueChanges()
  }

  save(receta: Datos){
    const uid = this.db.createId()
    //const dataWithId = { uid, ...receta };
    //return this.contactosRef.doc(uid).set(Object.assign({}, dataWithId))
    return this.contactosRef.doc(uid).set(Object.assign({},Datos))
  }

  getReceta (uid: string){
    console.log('uid', uid)
    return this.db.doc(this.path+'/'+uid).valueChanges()
  }
}

