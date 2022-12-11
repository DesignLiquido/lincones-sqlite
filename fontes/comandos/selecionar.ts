import { Comando } from "./comando";

export class Selecionar extends Comando {
    tabela: string;
    colunas: string[];
    tudo: boolean;
    condicoes: any[];

    constructor(linha: number, tabela: string, colunas: string[], condicoes: any[], tudo = false) {
        super(linha);
        this.tabela = tabela;
        this.tudo = tudo;
        this.colunas = colunas;
        this.condicoes = condicoes;
    }
}