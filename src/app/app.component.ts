import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  paginas = [
    { enlace: 'Inicio', path: 'pages/inicio' },
    { enlace: 'Recetas', path: 'pages/recetas' },
    { enlace: 'Sobre nosotros', path: 'pages/sobre_nosotros' }
  ];
}
