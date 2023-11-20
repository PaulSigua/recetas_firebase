import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recetas } from 'src/app/modelos/datos';
import { RecetasService } from '../servicios/recetas.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { ContactosFirebaseService } from '../servicios/recetas-firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  datos: Recetas = new Recetas();

  images: string[];

  recetaForm!: FormGroup;

  constructor(
    private router: Router,
    private recetasSer: RecetasService,
    private recetaFireSer: ContactosFirebaseService,
    private storage: Storage,
    public fb: FormBuilder
  ) {
    this.images = [];
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log(params)
      this.datos = params['recetas']
    }
  }

  ngOnInit(): void {
    this.getImagenes();
    this.recetaForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      procedimientos: ['', Validators.required],
    })
  }

  addInfo(newNombre: HTMLInputElement, newIngre: HTMLTextAreaElement, newProcess: HTMLTextAreaElement) {
    if (!newNombre.value || !newIngre.value || !newProcess.value) {
      alert('Todos los campos deben estar llenos.');
      return false;
    } else {
      const recetaExistente = this.router.getCurrentNavigation()?.extras.state?.['recetas'];
      const receta = {
        nombre: newNombre.value,
        ingredientes: newIngre.value,
        procedimiento: newProcess.value,
      }

      if (recetaExistente) {
        this.recetasSer.editarInfo(recetaExistente, receta);
        alert('La receta se ha actualizado correctamente.');

      } else {
        this.recetasSer.addInfo(receta);
        console.log(receta);
        this.recetaFireSer.saveRecetaFirebase(receta);
        
        this.datos = new Recetas();
      }
      alert('Se guardó la receta de manera correcta.');
      this.router.navigate(['pages/recetas/']);
      newNombre.focus();
      return false;
    }
  };

  subirImagen($event: any) {
    const archivo = $event.target.files[0];
    console.log(archivo);

    const imgRef = ref(this.storage, `imagenes/${archivo.name}`);

    uploadBytes(imgRef, archivo).then(
      respuesta => {
        //console.log(respuesta);
        this.getImagenes();
      }
    ).catch(error => console.log(error));
  }

  getImagenes() {
    const imagenesRef = ref(this.storage, 'imagenes');

    listAll(imagenesRef).then(async respuesta => {
      console.log(respuesta);
      this.images = [];

      for (let item of respuesta.items) {
        const url = await getDownloadURL(item);

        this.images.push(url);
        console.log(url);
      }

    }).catch(error => console.log(error));
  }

}

