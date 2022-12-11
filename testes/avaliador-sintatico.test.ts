import { AvaliadorSintatico } from '../fontes/avaliador-sintatico';
import { Lexador } from '../fontes/lexador';

describe('Avaliador Sintático', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;

    beforeEach(() => {
        lexador = new Lexador();
        avaliadorSintatico = new AvaliadorSintatico();
    });

    describe('analisar()', () => {
        describe('Cenário de sucesso', () => {
            it('Sucesso - Criar Tabela Clientes', () => {
                const codigo = [
                    'CRIAR TABELA clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.declaracoes).toHaveLength(2);
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
                expect(retornoAvaliadorSintatico.declaracoes).toHaveLength(2);
                expect(retornoAvaliadorSintatico.erros).toHaveLength(0);
            });
        });
    });
});
