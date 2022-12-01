import { Declaracao } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';

export class AvaliadorSintatico implements AvaliadorSintaticoBase {
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean {
        throw new Error('Method not implemented.');
    }
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface {
        throw new Error('Method not implemented.');
    }
    estaNofinal(): boolean {
        throw new Error('Method not implemented.');
    }
    verificarTipoSimboloAtual(tipo: string): boolean {
        throw new Error('Method not implemented.');
    }
    avancarEDevolverAnterior(): SimboloInterface {
        throw new Error('Method not implemented.');
    }
    erro(
        simbolo: SimboloInterface,
        mensagemDeErro: string
    ): ErroAvaliadorSintatico {
        throw new Error('Method not implemented.');
    }
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
