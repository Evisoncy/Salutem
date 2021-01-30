import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoComponent } from './resultado/resultado.component';
import { TriajeComponent } from './triaje.component';



const routes: Routes = [
  {path:"", component:TriajeComponent},
  {path:"resultado/:id", component:ResultadoComponent},

  {path:"**", pathMatch:"full", redirectTo:""}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriajeRoutingModule { }
