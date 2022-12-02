import { SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';

export class Virgula extends Declaracao {
    simbolos: SimboloInterface;
    constructor(simbolo: SimboloInterface) {
        super(simbolo.linha);
        this.simbolos = simbolo;
    }
}
