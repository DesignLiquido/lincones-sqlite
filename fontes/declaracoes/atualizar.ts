import { Declaracao } from './declaracao';

export class Atualizar extends Declaracao {
    constructor(linha: number, declaracoes: Declaracao[]) {
        super(linha);
    }

    async aceitar(visitante: any): Promise<any> {
        // TODO @Italo - Implementar visita na Expressão Atualizar
        // return Promise.reject(visitante)
    }
}
