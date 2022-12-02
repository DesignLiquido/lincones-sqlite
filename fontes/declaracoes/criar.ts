import { SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';

export class Criar extends Declaracao {
    simbolo: SimboloInterface;
    constructor(simbolo: SimboloInterface) {
        super(simbolo.linha);
        this.simbolo = simbolo;
    }

    async aceitar(visitante: any): Promise<any> {
        return await visitante.visitarCriar(this);
    }
}
