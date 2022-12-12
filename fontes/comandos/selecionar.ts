import { Condicao } from "../construtos";
import { Comando } from "./comando";

export class Selecionar extends Comando {
    tabela: string;
    colunas: string[];
    tudo: boolean;
    condicoes: Condicao[];

    constructor(linha: number, tabela: string, colunas: string[], condicoes: Condicao[], tudo = false) {
        super(linha);
        this.tabela = tabela;
        this.tudo = tudo;
        this.colunas = colunas;
        this.condicoes = condicoes;
    }
}