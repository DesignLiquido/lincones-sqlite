import { Criar, Comando, Excluir } from '../comum/fontes/comandos';
import {
    RetornoAvaliadorSintatico,
    RetornoLexador
} from '../comum/fontes/interfaces/retornos';
import tiposDeSimbolos from '../comum/fontes/tipos-de-simbolos';
import { AvaliadorSintaticoBase } from '../comum/fontes/avaliador-sintatico/avaliador-sintatico-base';
import { Coluna } from '../comum/fontes/construtos/coluna';

export class AvaliadorSintatico extends AvaliadorSintaticoBase {
    override comandoCriacaoColuna(): Coluna {
        // Nome
        const nomeDaColuna = this.consumir(tiposDeSimbolos.IDENTIFICADOR, 
            'Esperado identificador de nome de coluna em comando de criação de tabela.');
        
        // Tipo de dados
        let tipoColuna = null;
        let tamanhoColuna = null;
        switch (this.simbolos[this.atual].tipo) {
            case tiposDeSimbolos.INTEIRO:
                tipoColuna = tiposDeSimbolos.INTEIRO;
                this.avancar();
                break;
            case tiposDeSimbolos.LOGICO:
                tipoColuna = tiposDeSimbolos.LOGICO;
                this.avancar();
                break;
            case tiposDeSimbolos.TEXTO:
                tipoColuna = tiposDeSimbolos.TEXTO;
                this.avancar();
                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PARENTESE_ESQUERDO)) {
                    tamanhoColuna = this.consumir(tiposDeSimbolos.NUMERO, 
                        'Esperado tamanho de texto de coluna em comando de criação de tabela.');
                    this.consumir(tiposDeSimbolos.PARENTESE_DIREITO, 
                        'Esperado parêntese direito após declaração de tamanho de coluna em comando de criação de tabela.');
                }

                break;
            default:
                throw this.erro(this.simbolos[this.atual], 
                    'Esperado tipo de dados válido na definição de coluna em comando de criação de tabela.');
        }

        // Nulo/Não Nulo
        let nulo = true;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.NAO, tiposDeSimbolos.NULO)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            switch (simboloAnterior.tipo) {
                case tiposDeSimbolos.NAO:
                    this.consumir(tiposDeSimbolos.NULO, 
                        'Esperado palavra reservada "NULO" após palavra reservada "NÃO" em declaração de coluna em comando de criação de tabela.');
                    nulo = false;
                    break;
                case tiposDeSimbolos.NULO:
                default:
                    break;
            }
        }

        // Chave primária?
        let chavePrimaria = false;
        let autoIncremento = false;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CHAVE)) {
            switch (this.simbolos[this.atual].tipo) {
                case tiposDeSimbolos.PRIMARIA:
                    chavePrimaria = true;
                    this.avancar();
                    if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.AUTO)) {
                        this.consumir(tiposDeSimbolos.INCREMENTO, 
                            'Esperado palavra reservada "INCREMENTO" após palavra reservada "AUTO" em declaração de coluna em comando de criação de tabela.');
                        autoIncremento = true;
                    }
                    break;
                default:
                    throw this.erro(this.simbolos[this.atual], 
                        'Esperado palavra reservada "PRIMARIA" após palavra reservada "CHAVE" na definição de coluna em comando de criação de tabela.');
            }
        }

        return new Coluna(nomeDaColuna.lexema, tipoColuna, tamanhoColuna, nulo, chavePrimaria, false);
    }

    override comandoCriar(): Criar {
        // Essa linha nunca deve retornar erro.
        this.consumir(tiposDeSimbolos.CRIAR, 'Esperado palavra reservada "CRIAR".');

        switch (this.simbolos[this.atual].tipo) {
            case 'TABELA':
            default:
                return this.comandoCriarTabela();
        }        
    }

    override comandoCriarTabela() {
        // Essa linha nunca deve retornar erro.
        this.consumir(tiposDeSimbolos.TABELA, 'Esperado palavra reservada "TABELA".');

        const nomeDaTabela = this.consumir(tiposDeSimbolos.IDENTIFICADOR, 
            'Esperado identificador de nome de tabela após palavra reservada "TABELA".');

        this.consumir(tiposDeSimbolos.PARENTESE_ESQUERDO, 
            'Esperado abertura de parênteses após nome da tabela');

        const colunas: Coluna[] = [];

        do {
            colunas.push(this.comandoCriacaoColuna());
        }
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.VIRGULA));

        this.consumir(tiposDeSimbolos.PARENTESE_DIREITO, 
            'Esperado fechamento de parênteses após nome da tabela');

        // Ponto-e-vírgula opcional.
        // TODO: trazer isso mais tarde.
        // this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO_VIRGULA);

        return new Criar(
            this.simbolos[this.atual].linha,
            nomeDaTabela.lexema,
            colunas
        );
    }

    override comandoExcluir() {
        // Essa linha nunca deve retornar erro.
        const simboloExcluir = this.consumir(tiposDeSimbolos.EXCLUIR, 'Esperado palavra reservada "EXCLUIR".');

        const nomeDaTabela = this.consumir(tiposDeSimbolos.IDENTIFICADOR, 
            'Esperado identificador de nome de tabela após palavra reservada "TABELA".');

        const condicoes = this.logicaComumCondicoes('exclusão');

        this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO_VIRGULA);

        return new Excluir(-1, nomeDaTabela.lexema, condicoes);
    }

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
