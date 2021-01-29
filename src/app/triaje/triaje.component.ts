import { Component, OnInit, Output } from '@angular/core';
import { PreguntasService } from '../services/preguntas.service';
import { PreguntaModel } from '../models/pregunta.model';
import { CuestionarioModel } from '../models/cuestionario.model';
import { AnalisisCuestionarioModel } from '../models/AnalizasCuestionario.model';
import { XFuzzyService } from '../services/xfuzzy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.component.html',
  styleUrls: ['./triaje.component.css']
})
export class TriajeComponent implements OnInit {

  preguntas: PreguntaModel[] = [];
  cuestionarios: CuestionarioModel[] = [];

  paginaActual: number;
  cantidadCuestionarios: number;

  triaje: AnalisisCuestionarioModel[];
  
  limite: number[];

  loading: boolean;


  constructor(private preguntaServices: PreguntasService, private xFuzzyService: XFuzzyService,
              private router: Router) {
    console.log(1212);
    this.paginaActual = 1;
    this.cantidadCuestionarios = 5;
    this.loading = true;
    this.triaje = [
      new AnalisisCuestionarioModel([0, 0, 0, 0], 1),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 2),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 3),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 4),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 5)
    ];
    this.limite = [45, 60, 90, 150, 240];
  }

  ngOnInit() {
    this.preguntaServices.getPreguntas()
          .subscribe( (resp) => {
            this.preguntas = resp;
            this.cuestionarios = this.generarCuestionarios(resp);
          });
  }

  private generarCuestionarios = (preguntas: PreguntaModel[]): CuestionarioModel[] => {
    const cuestionarios: CuestionarioModel[] = [];

    for (let i = 1; i <= this.cantidadCuestionarios ; i += 1){

      const pregungtasXCuestionario: PreguntaModel[] = preguntas.filter( pregunta => pregunta.nroPagina === i );

      const completados: boolean[] = [];
      for (let j = 1; j <= pregungtasXCuestionario.length ; j += 1){
        completados.push(false);
      }

      cuestionarios.push(new CuestionarioModel(pregungtasXCuestionario , completados, 0, i));
    }

    this.loading = false;

    return cuestionarios;
  }

  actualizarPagina(nuevaPagina: number){
    this.paginaActual = nuevaPagina;
  }

  realizarTriaje(datosTriajeXCuestionario: AnalisisCuestionarioModel){
    console.log(datosTriajeXCuestionario);
    this.triaje[(datosTriajeXCuestionario.nroPagina - 1)] = datosTriajeXCuestionario;
    this.analizarTriaje(datosTriajeXCuestionario.nroPagina).subscribe(resp => {
        if (datosTriajeXCuestionario.nroPagina === 5){
          console.log(resp);
          this.router.navigateByUrl(`/resultado/${resp}`);
        }
      });
  }

  private analizarTriaje(nroPagina: number){
    let cantidad = 0;
    let gravedad = 0;
    let contacto = 0;
    let riesgo = 0;
    for (let i = 0; i < nroPagina; i += 1){
      cantidad += this.triaje[i].datosTriaje[0];
      gravedad += this.triaje[i].datosTriaje[1];
      contacto += this.triaje[i].datosTriaje[2];
      riesgo += this.triaje[i].datosTriaje[3];
    }
    if (cantidad > 6){
      cantidad = 6;
    }

    if (gravedad > 20) {
      gravedad = 20;
    }

    if (contacto > 1) {
      contacto = 1;
    }

    if (riesgo > 8){
      riesgo = 8;
    }

    console.log(cantidad, gravedad, contacto, riesgo);
    return this.xFuzzyService.analizarTriaje(cantidad, gravedad, contacto, riesgo);
  }

}

