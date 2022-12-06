import { Criar, Declaracao } from '../declaracoes';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';
import { InformacoesColuna } from './informacaoColuna';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    private logicaColunas(): InformacoesColuna {
        

        return null;
    }

    private declaracaoCriar(): Criar {
        this.avancar();
        if (this.verificaSeLexemaSimboloAtual('TABELA')) {
            this.avancar();
            const nomeDaTabela = this.simbolos[this.atual].lexema;
            this.avancar();
            if (this.verificaSeLexemaSimboloAtual('(')) {
                this.consumir(
                    '(',
                    'Esperado abrir parenteses após nome da tabela'
                );

                const colunas: InformacoesColuna[] = [];

                while (!this.verificaSeLexemaSimboloAtual(')')) {
                    this.logicaColunas();
                    this.avancar();
                }

                return new Criar(
                    this.simbolos[this.atual].linha,
                    nomeDaTabela,
                    colunas
                );
            }
        }
    }

    private avancar(): void {
        this.avancar();
        this.atual++;
    }

    private declaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.CRIAR:
                return this.declaracaoCriar();
            default:
                this.avancar();
                return null;
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
