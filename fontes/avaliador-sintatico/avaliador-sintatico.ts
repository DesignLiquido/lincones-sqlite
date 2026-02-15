import { Comando, Criar } from '../comum/fontes/comandos';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../comum/fontes/interfaces/retornos';
import { AvaliadorSintaticoBase } from '../comum/fontes/avaliador-sintatico/avaliador-sintatico-base';
import { Coluna } from '../comum/fontes/construtos';

import tiposDeSimbolos from '../comum/fontes/tipos-de-simbolos';

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

    override comandoCriar(): Criar {
        // Essa linha nunca deve retornar erro.
        this.consumir(
            tiposDeSimbolos.CRIAR,
            'Esperado palavra reservada "CRIAR".'
        );

        // Essa linha nunca deve retornar erro.
        const simboloTabela = this.consumir(
            tiposDeSimbolos.TABELA,
            'Esperado palavra reservada "TABELA".'
        );

        let seNaoExistir = false;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.SE)) {
            this.consumir(
                tiposDeSimbolos.NAO,
                'Esperado palavra reservada "NÃO" após palavra reservada "SE".'
            );

            this.consumir(
                tiposDeSimbolos.EXISTIR,
                'Esperado palavra reservada "EXISTIR" após palavra reservada "NÃO".'
            );

            seNaoExistir = true;
        }

        const nomeDaTabela = this.consumir(
            tiposDeSimbolos.IDENTIFICADOR,
            'Esperado identificador de nome de tabela após palavra reservada "TABELA".'
        );

        this.consumir(
            tiposDeSimbolos.PARENTESE_ESQUERDO,
            'Esperado abertura de parênteses após nome da tabela'
        );

        const colunas: Coluna[] = [];

        do {
            colunas.push(this.comandoCriacaoColuna());
        } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.VIRGULA));

        this.consumir(
            tiposDeSimbolos.PARENTESE_DIREITO,
            'Esperado fechamento de parênteses após nome da tabela'
        );

        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO_VIRGULA);

        return new Criar(
            simboloTabela.linha,
            nomeDaTabela.lexema,
            colunas,
            seNaoExistir
        );
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
