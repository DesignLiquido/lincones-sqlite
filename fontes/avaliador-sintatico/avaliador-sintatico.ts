import {
    Identificador,
    Declaracao,
    ParenteseEsquerdo,
    ParenteseDireito,
    Numero,
    PontoEVirgula
} from '../declaracoes';
import { Virgula } from '../declaracoes/virgula';
import { SimboloInterface } from '../interfaces';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    declaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.IDENTIFICADOR:
                return new Identificador(
                    this.consumir(
                        tiposDeSimbolos.IDENTIFICADOR,
                        'Esperava-se um identificador'
                    )
                );
            case tiposDeSimbolos.PARENTESE_DIREITO:
                return new ParenteseDireito(
                    this.consumir(
                        tiposDeSimbolos.PARENTESE_DIREITO,
                        'Esperava-se um parentese direito'
                    )
                );
            case tiposDeSimbolos.PARENTESE_ESQUERDO:
                return new ParenteseEsquerdo(
                    this.consumir(
                        tiposDeSimbolos.PARENTESE_ESQUERDO,
                        'Esperava-se um parentese esquerdo'
                    )
                );
            case tiposDeSimbolos.VIRGULA:
                return new Virgula(
                    this.consumir(
                        tiposDeSimbolos.VIRGULA,
                        'Esperava-se uma vírgula'
                    )
                );
            case tiposDeSimbolos.NUMERO:
                return new Numero(
                    this.consumir(
                        tiposDeSimbolos.NUMERO,
                        'Esperava-se um número'
                    )
                );
            case tiposDeSimbolos.PONTO_VIRGULA:
                return new PontoEVirgula(
                    this.consumir(
                        tiposDeSimbolos.PONTO_VIRGULA,
                        'Esperava-se um ponto e vírgula'
                    )
                );
            default:
                console.log(
                    `O tipo ${this.simbolos[this.atual].tipo} não é válido`
                );
                this.atual++;
        }
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
            declaracoes: declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
