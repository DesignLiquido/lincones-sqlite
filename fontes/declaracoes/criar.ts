import { SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';

export class Criar extends Declaracao {
    public tabela: string;
    public colunas: SimboloInterface[];
    constructor(linha: number, tabela: string, colunas: SimboloInterface[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
    }
}
