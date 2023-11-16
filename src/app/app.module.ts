import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './enviroments/environments';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { ViewRecetaComponent } from './pages/view-receta/view-receta.component';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    RecetasComponent,
    SobreNosotrosComponent,
    InicioComponent,
    ViewRecetaComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
