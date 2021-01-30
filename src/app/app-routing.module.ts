import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './home/home.component';
import { TriajeComponent } from './triaje/triaje.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"triaje", loadChildren: () => import('./triaje/triaje.module').then( m => m.TriajeModule)},
  {path:"download", component:DownloadComponent},

  {path:"",pathMatch:"full", redirectTo: "/home"},
  {path:"**",pathMatch:"full", redirectTo: "/home"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
