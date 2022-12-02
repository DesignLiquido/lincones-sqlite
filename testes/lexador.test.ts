import { Lexador } from '../fontes/lexador';

describe('Lexador', () => {
    let lexador: Lexador;

    beforeEach(() => {
        lexador = new Lexador();
    });

    describe('mapear()', () => {
        describe('Cenário de sucesso', () => {
            it('Sucesso com código vazio', () => {
                const codigo = [''];
                const resultado = lexador.mapear(codigo);
                expect(resultado).toBeTruthy();
                expect(resultado.simbolos).toHaveLength(0);
            });

            it('Sucesso com código com apenas espaços', () => {
                const codigo = ['    '];
                const resultado = lexador.mapear(codigo);
                expect(resultado).toBeTruthy();
                expect(resultado.simbolos).toHaveLength(0);
            });

            it('Sucesso com código repetindo instruçoes', () => {
                const codigo = [
                    '((((((((((((((((((((((((((',
                    ')))))))))))))))))))))))))',
                    'CRIAR CRIAR CRIAR CRIAR CRIAR CRIAR'
                ];
                const resultado = lexador.mapear(codigo);
                expect(resultado).toBeTruthy();
                expect(resultado.simbolos).toHaveLength(57);
            });

            it('Sucesso - CRIAR TABELA', () => {
                const codigo = ['CRIAR TABELA usuarios'];
                const resultado = lexador.mapear(codigo);
                expect(resultado).toBeTruthy();
                expect(resultado.simbolos).toHaveLength(3);
            });

            it('Sucesso - ATUALIZAR', () => {
                const codigo = ['ATUALIZAR usuarios'];
                const resultado = lexador.mapear(codigo);
                expect(resultado).toBeTruthy();
                expect(resultado.simbolos).toHaveLength(2);
            });

            describe('Sucesso - Simulação real', () => {
                it('Sucesso - Criar Tabela Clientes', () => {
                    const codigo = [
                        'CRIAR TABELA clientes(id INTEIRO NAO NULO CHAVE PRIMARIA AUTOINCREMENTO, nome TEXTO(100) NAO NULO, idade INTEIRO NAO NULO, email TEXTO(255) NAO NULO, ativo LOGICO NAO NULO)'
                    ];
                    const resultado = lexador.mapear(codigo);
                    expect(resultado).toBeTruthy();
                    expect(resultado.simbolos).toHaveLength(38);
                });

                it('Sucesso - CRUD', () => {
                    const codigo = [
                        'INSERIR EM clientes VALORES(1, "João", 20, "joao@gmail.com", VERDADEIRO)',
                        'INSERIR EM clientes VALORES(2, "Carlos", 23, "carlos@gmail.com", VERDADEIRO)',
                        'INSERIR EM clientes VALORES(3, "Thiago", 40, "thiago@gmail.com", VERDADEIRO)',
                        'INSERIR EM clientes VALORES(4, "Jose", 44, "jose@gmail.com", VERDADEIRO)'
                    ];
                    const resultado = lexador.mapear(codigo);
                    expect(resultado).toBeTruthy();
                    expect(resultado.simbolos).toHaveLength(60);
                });

                it('Sucesso - Selecionar', () => {
                    const codigo = ['SELECIONAR * DE clientes'];
                    const resultado = lexador.mapear(codigo);
                    expect(resultado).toBeTruthy();
                    expect(resultado.simbolos).toHaveLength(4);
                });
                
                it('Sucesso - Criar Tabela Clientes', () => {
                    const codigo = [
                        'CRIAR TABELA clientes(id INTEIRO NAO NULO CHAVE PRIMARIA AUTOINCREMENTO, nome TEXTO(100) NAO NULO, idade INTEIRO NAO NULO, email TEXTO(255) NAO NULO, ativo LOGICO NAO NULO);'
                    ];
                    const resultado = lexador.mapear(codigo);
                    expect(resultado).toBeTruthy();
                    expect(resultado.simbolos).toHaveLength(39);
                });
            });
        });
    });
});
