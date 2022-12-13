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

            it('Excluir', () => {
                const codigo = [
                    'EXCLUIR clientes ONDE nome = "Donald"'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('DELETE');
                expect(resultado).toContain('FROM');
                expect(resultado).toContain('clientes');
                expect(resultado).toContain('WHERE');
                expect(resultado).toContain('nome');
                expect(resultado).toContain('=');
                expect(resultado).toContain('Donald');
            });

            it('Atualizar', () => {
                const codigo = [
                    'ATUALIZAR clientes DEFINIR NOME = "Pernalonga", IDADE = 18, ATIVO = VERDADEIRO, CASADO = FALSO ONDE ID = 10;'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('UPDATE');
                expect(resultado).toContain('clientes');
                expect(resultado).toContain('SET');
                expect(resultado).toContain('NOME');
                expect(resultado).toContain('Pernalonga');
                expect(resultado).toContain('IDADE');
                expect(resultado).toContain('18');
                expect(resultado).toContain('ATIVO');
                expect(resultado).toContain('true');
                expect(resultado).toContain('CASADO');
                expect(resultado).toContain('false');
                expect(resultado).toContain('WHERE');
                expect(resultado).toContain('ID');
                expect(resultado).toContain('=');
                expect(resultado).toContain('10');
            });

            it('Inserir', () => {
                const codigo = [
                    'INSERIR EM clientes (NOME, IDADE, ATIVO, CASADO) VALORES ("Pernalonga", 18, verdadeiro, falso)'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('INSERT');
                expect(resultado).toContain('INTO');
                expect(resultado).toContain('VALUES');
                expect(resultado).toContain('Pernalonga');
                expect(resultado).toContain('18');
                expect(resultado).toContain('true');
                expect(resultado).toContain('false');
            });

            it('Selecionar Tudo', () => {
                const codigo = [
                    'SELECIONAR * DE clientes'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('SELECT');
                expect(resultado).toContain('*');
                expect(resultado).toContain('FROM');
                expect(resultado).toContain('clientes');
            });

            it('Selecionar Colunas', () => {
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

            it('Criar', () => {
                const codigo = [
                    'CRIAR TABELA clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NULO, ATIVO LOGICO NAO NULO);'
                ];
                const retornoLexador = lexador.mapear(codigo);
                const retornoAvaliadorSintatico =
                    avaliadorSintatico.analisar(retornoLexador);
                const resultado = tradutor.traduzir(retornoAvaliadorSintatico.comandos);
                expect(resultado).toBeTruthy();
                expect(resultado).toContain('CREATE');
                expect(resultado).toContain('TABLE');
                expect(resultado).toContain('clientes');
                expect(resultado).toContain('PRIMARY KEY');
                expect(resultado).toContain('INTEGER');
                expect(resultado).toContain('NOT NULL');
                expect(resultado).toContain('BOOLEAN');
                // expect(resultado).toContain('VARCHAR');
            });
        });
    });
});
