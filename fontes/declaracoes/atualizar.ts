import { Declaracao } from "./declaracao";

export class Atualizar extends Declaracao {
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