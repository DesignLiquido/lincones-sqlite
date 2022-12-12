import { SimboloInterface } from "../interfaces";
import { Comando } from "./comando";

export class Inserir extends Comando {
    tabela: string;
    colunas: string[];
    valores: SimboloInterface[];

    constructor(linha: number, tabela: string, colunas: string[], valores: any[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
        this.valores = valores;
    }
}