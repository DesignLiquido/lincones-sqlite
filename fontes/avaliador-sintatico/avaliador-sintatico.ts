import { Comando } from '../comum/fontes/comandos';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../comum/fontes/interfaces/retornos';
import tiposDeSimbolos from '../comum/fontes/tipos-de-simbolos';
import { AvaliadorSintaticoBase } from '../comum/fontes/avaliador-sintatico/avaliador-sintatico-base';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    override declaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.ATUALIZAR:
                return this.comandoAtualizar();
            case tiposDeSimbolos.CRIAR:
                return this.comandoCriar();
            case tiposDeSimbolos.EXCLUIR:
                return this.comandoExcluir();
            case tiposDeSimbolos.INSERIR:
                return this.comandoInserir();
            case tiposDeSimbolos.SELECIONAR:
                return this.comandoSelecionar();
            default:
                this.avancar();
                return null;
        }
    }

    analisar(retornoLexador: RetornoLexador): RetornoAvaliadorSintatico {
        this.erros = [];
        this.atual = 0;
        this.bloco = 0;
        this.simbolos = retornoLexador?.simbolos || [];

        const declaracoes: Comando[] = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }

        return {
            comandos: declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
