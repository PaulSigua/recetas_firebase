import { HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';

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

  isScrolled = false;
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  @HostListener('window:scroll', [])
  windownScroll() {
    this.isScrolled = window.scrollY > 0;
  }

}
