import { Comando } from "./comando";

export class Inserir extends Comando {
    tabela: string;
    colunas: string[];
    valores: any[];

    constructor(linha: number, tabela: string, colunas: string[], valores: any[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
        this.valores = valores;
    }
}