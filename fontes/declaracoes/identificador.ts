import { SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';

export class Identificador extends Declaracao {
    simbolo: SimboloInterface;
    constructor(simbolo: SimboloInterface) {
        super(simbolo.linha);
        this.simbolo = simbolo;
    }
}
