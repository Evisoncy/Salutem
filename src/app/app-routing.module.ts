import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './home/home.component';
import { TriajeComponent } from './triaje/triaje.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"",pathMatch:"full", redirectTo: "/home"},
    {path:"triaje", component:TriajeComponent},
  {path:"download", component:DownloadComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
