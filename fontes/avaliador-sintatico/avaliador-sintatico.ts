import { Declaracao } from '../declaracoes';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
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
