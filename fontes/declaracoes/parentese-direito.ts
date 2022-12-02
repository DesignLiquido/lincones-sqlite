import { SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';

export class ParenteseDireito extends Declaracao {
    simbolo: SimboloInterface;
    constructor(simbolo: SimboloInterface) {
        super(simbolo.linha);
        this.simbolo = simbolo;
    }
}
