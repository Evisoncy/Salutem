import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreguntaModel } from '../models/pregunta.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const URL = environment.urlXFuzzy;

@Injectable({
  providedIn: 'root'
})
export class XFuzzyService {

  constructor(private http: HttpClient) { }


  public analizarTriaje =
    (cantidad: number, gravedad: number, contacto: number, riesgo: number) =>{
      console.log(cantidad, gravedad, contacto, riesgo);
      return this.http.get(`${URL}/xFuzzy?cantidad=${cantidad}&gravedad=${gravedad}&contacto=${contacto}&riesgo=${riesgo}`)
                .pipe(map( (resp: any) => resp.valorTriaje))
    }
}
