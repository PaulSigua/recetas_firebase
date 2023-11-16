import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ViewRecetaComponent } from './pages/view-receta/view-receta.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/inicio', pathMatch: 'full' },
  { path: 'pages/inicio', component: InicioComponent },
  { path: 'pages/recetas', component: RecetasComponent },
  { path: 'pages/recetas/:id', component: ViewRecetaComponent},
  { path: 'pages/sobre_nosotros', component: SobreNosotrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
