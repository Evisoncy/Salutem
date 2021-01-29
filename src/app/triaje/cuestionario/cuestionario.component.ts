import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CuestionarioModel } from '../../models/cuestionario.model';
import { Router } from '@angular/router';
import { XFuzzyService } from '../../services/xfuzzy.service';
import { AnalisisCuestionarioModel } from '../../models/AnalizasCuestionario.model';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  @Input()
  cuestionario!: CuestionarioModel;
  @Input() 
  cantidadCuestionarios!: number;
  @Input() paginaActual: number= 1;
  @Output() numeroCambiado: EventEmitter<number>;
  @Output() analizarCuestionario: EventEmitter<AnalisisCuestionarioModel>;
  cuestionarioFomr: FormGroup ;

  nombreControles: string[][];
  nombreGrupos: string[];

  loading: boolean;

  colFinalizar: number = 12 ;
  colSiguiente: number = 0;
  colVolver: number = 0;

  triaje: number[];  // pos 0: cantidad, pos 1: gravedad, pos 2: contacto, pos 3: riesgo

  constructor(private router: Router, private xFuzzyService: XFuzzyService) {
    this.nombreControles = [];
    this.nombreGrupos = [];
    this.loading = true;
    this.paginaActual = 1;
    this.numeroCambiado = new EventEmitter();
    this.analizarCuestionario = new EventEmitter();
    this.cuestionarioFomr = new FormGroup({});
    this.triaje = [0, 0, 0, 0];
  }

  definirColumnasXPagina = () => {
    if (this.cuestionario.nroPaginaAsignada === 1){
      this.colSiguiente = 12;
      this.colFinalizar = 0;
      this.colVolver = 0;
    }else if (this.cuestionario.nroPaginaAsignada === 5){
      this.colSiguiente = 0;
      this.colFinalizar = 6;
      this.colVolver = 6;
    }else{
      this.colSiguiente = 6;
      this.colFinalizar = 0;
      this.colVolver = 6;
    }
  }

  ngOnInit() {
    this.definirColumnasXPagina();

    this.crearFormulario();
    this.crearListener();

    this.loading = false;
  }

  valorNoValido(value: string){
    var valor = this.cuestionarioFomr.get(value);
    return (valor!==null) ? (valor.touched && valor.invalid) : false;
  }

  crearFormulario(){
    const cantPreguntas: number = this.cuestionario.preguntas.length ;

    for (let i = 1; i <= cantPreguntas; i += 1){
      const pregunta = this.cuestionario.preguntas[i - 1];
      const cantidadAlternativas: number = pregunta.alternativas.length;
      let fromPregunta: FormGroup;
      const nombres: string[] = [];

      if (pregunta.tipoAlternativa === 2){
        this.nombreGrupos.push(`no-posee`);
        nombres.push(`pregunta ${i}`);
        this.cuestionarioFomr.addControl(`pregunta ${i}`, new FormControl([Validators.requiredTrue]));

      }else{
        fromPregunta = new FormGroup({});
        this.nombreGrupos.push(`pregunta ${i}`);
        for (let j = 1; j <= cantidadAlternativas; j += 1){
          const nombre = `pregunta ${i} - alternativa ${j}`;
          fromPregunta.addControl(nombre, new FormControl());
          nombres.push(nombre);
        }

        this.cuestionarioFomr.addControl(`pregunta ${i}`, fromPregunta);
      }
      this.nombreControles.push(nombres);
    }
  }

  crearListener(){
    this.cuestionarioFomr.valueChanges.subscribe((valor) => {
      console.log(this.cuestionarioFomr);
      console.log(valor);
    });
    this.cuestionarioFomr.statusChanges.subscribe((status) => {
      console.log({status});
    });
    // this.cuestionarioFomr.get('nombre').valueChanges.subscribe(console.log);
  }

  controlaMarkTouch(fc: any){
    Object.values(fc).forEach( control => {
      if (control instanceof FormControl){
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.controlaMarkTouch(control.controls);
      }
    });
  }

  pasarCuestionario(){

    this.analizar();

    this.paginaActual += 1;

    this.numeroCambiado.emit(this.paginaActual);
  }

  rergesarCuestionario(){

    this.paginaActual -= 1;

    this.numeroCambiado.emit(this.paginaActual);
  }

  finalizarCuestionario(){
    this.analizar();
  }

  analizar(): boolean {
    if (this.cuestionarioFomr.invalid){
      this.controlaMarkTouch(this.cuestionarioFomr);
      return false;
    }
    console.log(this.cuestionario);

    console.log(this.triaje);

    this.realizarCalculoCuestionario();

    console.log(this.triaje);

    this.analizarCuestionario.emit( new AnalisisCuestionarioModel(this.triaje, this.paginaActual));

    return true;
  }

  private realizarCalculoCuestionario(){
    const valoresCuestionario: any = this.cuestionarioFomr.value;
    console.log(valoresCuestionario);
    let index: number = 0;
    this.triaje = [0, 0, 0, 0];

    for (const preguntaM of this.cuestionario.preguntas){
      const tipoVariable: string = preguntaM.tipoVariable;
      const puntaje: number =
        (preguntaM.peso !== undefined) ? preguntaM.peso : (preguntaM.pesoAlternativas !== undefined) ? preguntaM.pesoAlternativas[valoresCuestionario[`pregunta ${index + 1}`]]:0;

      if (preguntaM.tipoAlternativa === 2){
        this.procesarAlternativa(tipoVariable, puntaje);
      } else {

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < preguntaM.alternativas.length ; i += 1){
          const valor = valoresCuestionario[`pregunta ${index + 1}`][`pregunta ${index + 1} - alternativa ${i + 1}`];

          if ( valor !== null && valor !== false ){
            this.procesarAlternativa(tipoVariable, puntaje);
          }
          }
        }
      index += 1;
    }

    }
    private procesarAlternativa = (tipoVariable: string, puntaje: number) => {
      switch (tipoVariable){
        case 'sintoma': {
          this.triaje[0] += 1;
          this.triaje[1] += puntaje ;
          break;
        }
        case 'contacto': {
          this.triaje[2] += puntaje;
          break;
        }
        case 'riesgo': {
          this.triaje[3] += puntaje;
          break;
        }
      }

    }

  }

