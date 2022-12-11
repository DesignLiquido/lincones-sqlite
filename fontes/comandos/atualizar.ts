import { Comando } from "./comando";

export class Atualizar extends Comando {
    tabela: string;
    colunasEValores: any[];
    condicoes: any[];

    constructor(linha: number, tabela: string, colunasEValores: any[], condicoes: any[]) {
        super(linha);
        this.tabela = tabela;
        this.colunasEValores = colunasEValores;
        this.condicoes = condicoes;
    }
}