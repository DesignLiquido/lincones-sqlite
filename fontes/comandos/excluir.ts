import { Condicao } from "../construtos";
import { Comando } from "./comando";

export class Excluir extends Comando {
    tabela: string;
    condicoes: Condicao[];

    constructor(linha: number, tabela: string, condicoes: Condicao[]) {
        super(linha);
        this.tabela = tabela;
        this.condicoes = condicoes;
    }
}
