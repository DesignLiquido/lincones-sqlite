import { AvaliadorSintatico } from "../fontes/avaliador-sintatico";
import { Lexador } from "../fontes/lexador";
import { Tradutor } from "../fontes/tradutor";

describe('Tradutor', () => {
    let lexador: Lexador;
    let avaliadorSintatico: AvaliadorSintatico;
    let tradutor: Tradutor;

    describe('traduzir()', () => {
        describe('Cenário de sucesso', () => {
            beforeEach(() => {
                lexador = new Lexador();
                avaliadorSintatico = new AvaliadorSintatico();
                tradutor = new Tradutor();
            });

            it('Inserir', () => {
                const codigo = [
                    'INSERIR EM clientes (NOME) VALORES ("Pernalonga")'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('INSERT');
                expect(resultado).toContain('INTO');
                expect(resultado).toContain('VALUES');
            });

            it('Selecionar', () => {
                const codigo = [
                    'SELECIONAR NOME, EMAIL DE clientes ONDE IDADE = 18;'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('SELECT');
                expect(resultado).toContain('FROM');
                expect(resultado).toContain('WHERE');
            });
        });
    });
});
