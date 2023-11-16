import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datos } from 'src/app/modelos/datos';
import { RecetasFirebaseService } from 'src/app/recetas-firebase.service';
import { RecetasService } from '../servicios/recetas.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  datos: Datos = new Datos();

  images: string[];

  constructor(
    private router: Router,
    private recetasSer: RecetasService,
    private recetaFireSer: RecetasFirebaseService,
    private storage: Storage
  ) {
    this.images = [];
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log(params)
      this.datos = params['recetas']
    }
  }

  ngOnInit() {
    this.getImagenes();
  }

  addInfo(newNombre: HTMLInputElement, newIngre: HTMLTextAreaElement, newProcess: HTMLTextAreaElement) {
    if (!newNombre.value || !newIngre.value || !newProcess.value) {
      alert('Tonto Verga');
      return false;
    } else {
      const recetaExistente = this.router.getCurrentNavigation()?.extras.state?.['receta'];
      const receta = {
        nombre: newNombre.value,
        ingredientes: newIngre.value,
        procedimiento: newProcess.value,
      }

      if (recetaExistente) {
        this.recetasSer.editarInfo(recetaExistente, receta);
        alert('imbescil.');

      } else {
        this.recetasSer.addInfo(receta);
        console.log(receta);
        this.recetaFireSer.save(receta);
        this.datos = new Datos();
      }
      alert('Se guardó la receta de manera correcta.');
      this.router.navigate(['pages/recetas/']);
      newNombre.value = '';
      newIngre.value = '';
      newProcess.value = '';
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
        console.log(respuesta);
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

