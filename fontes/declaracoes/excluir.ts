import { Declaracao } from "./declaracao";

export class Excluir extends Declaracao {
    tabela: string;
    condicoes: any[];

    constructor(linha: number, tabela: string, condicoes: any[]) {
        super(linha);
        this.tabela = tabela;
        this.condicoes = condicoes;
    }
}
