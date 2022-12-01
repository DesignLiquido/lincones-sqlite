import { Declaracao } from '../declaracoes';
import { AvaliadorSintaticoInterface, SimboloInterface } from '../interfaces';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';

export class AvaliadorSintatico implements AvaliadorSintaticoInterface {
    erros: ErroAvaliadorSintatico[];
    bloco: number;
    atual: number;
    simbolos: SimboloInterface[];

    estaNoFinal(): boolean {
        return this.atual === this.simbolos.length;
    }

    declaracao() {
        return null;
    }

    analisar(retornoLexador: RetornoLexador): RetornoAvaliadorSintatico {
        this.erros = [];
        this.atual = 0;
        this.bloco = 0;
        this.simbolos = retornoLexador?.simbolos || [];

        const declaracoes: Declaracao[] = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao() as Declaracao);
        }

        return {
            declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
