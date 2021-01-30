import { PreguntaModel } from './pregunta.model';
export class CuestionarioModel {
    constructor(public preguntas: PreguntaModel[], public completados: boolean[],
                public cantCompletados: number, public nroPaginaAsignada: number) {

    }
}
