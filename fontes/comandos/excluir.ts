import { Comando } from "./comando";

export class Excluir extends Comando {
    tabela: string;
    condicoes: any[];

    constructor(linha: number, tabela: string, condicoes: any[]) {
        super(linha);
        this.tabela = tabela;
        this.condicoes = condicoes;
    }
}
