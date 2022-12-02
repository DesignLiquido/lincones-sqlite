import { Declaracao } from "./declaracao";

export class Selecionar extends Declaracao {
    tabela: string;
    colunas: string[];
    condicoes: any[];

    constructor(linha: number, tabela: string, colunas: string[], condicoes: any[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
        this.condicoes = condicoes;
    }
}