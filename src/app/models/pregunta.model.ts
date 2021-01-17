export class PreguntaModel {

    constructor(public descripcion: string, public alternativas: string[],
                public tipoAlternativa: number, public tipoVariable: string,
                public nroPagina: number, public id: string,
                public peso?: number, public pesoAlternativas?: number[]) {

    }

}
