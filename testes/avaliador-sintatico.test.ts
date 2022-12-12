import { AvaliadorSintatico } from '../fontes/avaliador-sintatico';
import { Lexador } from '../fontes/lexador';

describe('Avaliador Sintático', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;

    describe('analisar()', () => {
        describe('Cenário de sucesso', () => {
            beforeEach(() => {
                lexador = new Lexador();
                avaliadorSintatico = new AvaliadorSintatico();
            });

            it('Sucesso - Criar Tabela Clientes', () => {
                const codigo = [
                    'CRIAR TABELA clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.comandos).toHaveLength(2);
                expect(resultadoAvaliadorSintatico.erros).toHaveLength(0);
            });

            it('Sucesso - Atualizar Tabela Clientes', () => {
                const codigo = [
                    'ATUALIZAR clientes DEFINIR NOME = "Pernalonga" ONDE ID = 10;'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.comandos).toHaveLength(2);
                expect(resultadoAvaliadorSintatico.erros).toHaveLength(0);
            });

            it('Sucesso - Excluir em Tabela Clientes', () => {
                const codigo = [
                    'EXCLUIR clientes ONDE ID = 3;'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.comandos).toHaveLength(1);
                expect(resultadoAvaliadorSintatico.erros).toHaveLength(0);
            });

            it('Sucesso - Inserir em Tabela Clientes', () => {
                const codigo = [
                    'INSERIR EM clientes (NOME) VALORES ("Pernalonga")'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.comandos).toHaveLength(1);
                expect(resultadoAvaliadorSintatico.erros).toHaveLength(0);
            });

            it('Sucesso - Selecionar tabela Clientes', () => {
                const codigo = [
                    'SELECIONAR NOME, EMAIL DE clientes ONDE IDADE = 18;'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                expect(retornoAvaliadorSintatico).toBeTruthy();
                expect(retornoAvaliadorSintatico.comandos).toHaveLength(1);
                expect(retornoAvaliadorSintatico.erros).toHaveLength(0);
            });
        });
    });
});
