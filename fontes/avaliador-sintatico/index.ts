import { Declaracao } from "../declaracoes";
import { SimboloInterface } from "../interfaces";
import { RetornoLexador } from "../interfaces/retornos";

export class AvaliadorSintatico {
    atual: number;
    simbolos: SimboloInterface[];
    erros: any[];

    estaNoFinal(): boolean {
        return this.atual === this.simbolos.length;
    }

    declaracao() {
        return null;
    }

    analisar(retornoLexador: RetornoLexador) {
        this.simbolos = retornoLexador?.simbolos || [];

        const declaracoes: Declaracao[] = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao() as Declaracao);
        }
    }
}