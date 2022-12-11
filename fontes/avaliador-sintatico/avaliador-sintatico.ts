import { Condicao } from '../construtos';
import { Criar, Comando, Selecionar } from '../comandos';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../interfaces/retornos';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { AvaliadorSintaticoBase } from './avaliador-sintatico-base';
import { InformacoesColuna } from './informacaoColuna';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    private avancar(): void {
        this.atual++;
    }

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

    private declaracaoSelecionar() {
        // Essa linha nunca deve retornar erro.
        this.consumir(tiposDeSimbolos.SELECIONAR, 'Esperado palavra reservada "SELECIONAR".')

        // Colunas
        let tudo = false;
        const colunas = [];
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.TUDO)) {
            tudo = true;
        } else {
            do {
                colunas.push(this.simbolos[this.atual].lexema);
                this.avancar();
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.VIRGULA))
        }

        // De
        this.consumir(tiposDeSimbolos.DE, 'Esperado palavra reservada "de" após definição das colunas em comando de seleção.');
        const nomeTabela = this.consumir(tiposDeSimbolos.IDENTIFICADOR, 'Esperado nome de coluna ou literal em condição de seleção.');

        // Condições
        const condicoes = [];
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ONDE)) {
            do {
                const esquerda = this.consumir(tiposDeSimbolos.IDENTIFICADOR, 'Esperado nome de coluna ou literal em condição de seleção.');
                if (![
                    tiposDeSimbolos.IGUAL, 
                    tiposDeSimbolos.MAIOR, 
                    tiposDeSimbolos.MAIOR_IGUAL, 
                    tiposDeSimbolos.MENOR, 
                    tiposDeSimbolos.MENOR_IGUAL
                ].includes(this.simbolos[this.atual].tipo)) {
                    throw this.erro(this.simbolos[this.atual], 'Esperado operador válido após identificador em condição de seleção.');
                }

                const operador = this.simbolos[this.atual].tipo;
                this.avancar();

                if (![
                    tiposDeSimbolos.IDENTIFICADOR, 
                    tiposDeSimbolos.NUMERO, 
                    tiposDeSimbolos.TEXTO
                ].includes(this.simbolos[this.atual].tipo)) {
                    throw this.erro(this.simbolos[this.atual], 'Esperado operador válido após identificador em condição de seleção.');
                }

                const direita = this.simbolos[this.atual];
                this.avancar();
                
                condicoes.push(new Condicao(esquerda, operador, direita.literal || direita.lexema));
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.E));
        }

        return new Selecionar(-1, nomeTabela.lexema, colunas, condicoes, tudo);
    }

    private declaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.CRIAR:
                return this.declaracaoCriar();
            case tiposDeSimbolos.SELECIONAR:
                return this.declaracaoSelecionar();
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

        const declaracoes: Comando[] = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }

        return {
            declaracoes: declaracoes,
            erros: this.erros
        } as RetornoAvaliadorSintatico;
    }
}
