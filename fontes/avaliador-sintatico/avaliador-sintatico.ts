import { Criar, Declaracao } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    primario(): void {
        throw new Error('Method not implemented.');
    }
    chamar(): void {
        throw new Error('Method not implemented.');
    }

    sincronizar(): void {
        this.avancarEDevolverAnterior();

        while (!this.estaNoFinal()) {
            const tipoSimboloAtual: string = this.simbolos[this.atual - 1].tipo;
            if (tipoSimboloAtual === tiposDeSimbolos.PONTO_VIRGULA) return;
        }
    }

    declaracao() {
        try {
            if (this.verificarTipoSimboloAtual(tiposDeSimbolos.IDENTIFICADOR)) {
                this.avancarEDevolverAnterior();
                const simbolo: SimboloInterface = this.consumir(
                    tiposDeSimbolos.IDENTIFICADOR,
                    'Esperava-se um identificador.'
                );
                return new Criar(simbolo);
            }
        } catch (erro: any | unknown) {
            this.sincronizar();
            return null;
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
            declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
