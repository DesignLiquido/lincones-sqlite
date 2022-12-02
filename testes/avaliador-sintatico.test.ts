import { AvaliadorSintatico } from '../fontes/avaliador-sintatico';
import { Lexador } from '../fontes/lexador';

describe('Avaliador Sintático', () => {
    it('Sucesso', () => {
        expect(1).toBe(1);
    });
    describe('analisar()', () => {
        let lexador: Lexador;
        let avaliadorSintatico: AvaliadorSintatico;
        beforeEach(() => {
            lexador = new Lexador();
            avaliadorSintatico = new AvaliadorSintatico();
        });
        describe('Cenário de sucesso', () => {
            it('Sucesso - Criar Tabela Clientes', () => {
                const codigo = [
                    'CRIAR TABELA clientes(id INTEIRO NAO NULO CHAVEPRIMARIA AUTOINCREMENTO, nome TEXTO(100) NAO NULO, idade INTEIRO NAO NULO, email TEXTO(255) NAO NULO, ativo LOGICO NAO NULO);'
                ];
                const resultadoLexador = lexador.mapear(codigo);
                const resultadoAvaliadorSintatico =
                    avaliadorSintatico.analisar(resultadoLexador);
                expect(resultadoAvaliadorSintatico).toBeTruthy();
                expect(resultadoAvaliadorSintatico.declaracoes).toHaveLength(
                    38
                );
                expect(resultadoAvaliadorSintatico.erros).toHaveLength(0);
            });
        });
    });
});
