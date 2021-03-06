import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TriajeComponent } from './triaje/triaje.component';
import { DownloadComponent } from './download/download.component';
import { CuestionarioComponent } from './triaje/cuestionario/cuestionario.component';
import { PreguntaComponent } from './triaje/pregunta/pregunta.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultadoComponent } from './triaje/resultado/resultado.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TriajeComponent,
    DownloadComponent,
    CuestionarioComponent,
    PreguntaComponent,
    NavbarComponent,
    FooterComponent,
    ResultadoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
