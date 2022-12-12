import { Condicao } from "../construtos";
import { Comando } from "./comando";

export class Atualizar extends Comando {
    tabela: string;
    colunasEValores: { esquerda: any, direita: any }[];
    condicoes: Condicao[];

    constructor(
            linha: number, 
            tabela: string, 
            colunasEValores: { esquerda: any, direita: any }[], 
            condicoes: Condicao[]) 
    {
        super(linha);
        this.tabela = tabela;
        this.colunasEValores = colunasEValores;
        this.condicoes = condicoes;
    }
}