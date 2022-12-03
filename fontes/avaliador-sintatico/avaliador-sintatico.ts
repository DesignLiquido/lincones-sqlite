import { Criar, Declaracao } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    public declaracaoIdenteificadorCriar(): boolean {
        if (
            this.simbolos[this.atual].lexema === 'CRIAR' &&
            this.simbolos[this.atual++].tipo ===
                tiposDeSimbolos.IDENTIFICADOR &&
            this.simbolos[this.atual++].lexema === 'TABELA'
        )
            return true;
        return false;
    }

    public declaracao(): Declaracao {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.IDENTIFICADOR:
                if (this.declaracaoIdenteificadorCriar()) {
                    const numero = this.simbolos[this.atual].linha;
                    const tabela = this.simbolos[this.atual++].lexema;
                    const colunas: SimboloInterface[] = [];

                    this.atual = 3;

                    while (
                        this.simbolos[this.atual].tipo !==
                        tiposDeSimbolos.PONTO_VIRGULA
                    ) {
                        colunas.push(this.simbolos[this.atual]);
                        this.avancarEDevolverAnterior();
                    }

                    return new Criar(numero, tabela, colunas);
                }
                break;
            default:
                this.avancarEDevolverAnterior();
        }
    }

    public analisar(retornoLexador: RetornoLexador): RetornoAvaliadorSintatico {
        this.erros = [];
        this.atual = 0;
        this.bloco = 0;
        this.simbolos = retornoLexador?.simbolos || [];

        const declaracoes: Declaracao[] = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }

        return {
            declaracoes: declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
