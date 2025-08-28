import { LinconesSQLite } from '../fontes/lincones-sqlite';

describe('LinconesSqlite', () => {
    let linconesSqlite: LinconesSQLite;

    beforeAll(async () => {
        linconesSqlite = new LinconesSQLite();
        const comandoCriarTabela = 'CRIAR TABELA SE NÃO EXISTIR clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);';
        
        try {
            await linconesSqlite.clienteSQLite.abrir();
            await linconesSqlite.executar(null, comandoCriarTabela);
        } catch (error) {
            console.error('Erro no pré-teste:', error);
            throw error;
        }
    });

    it.skip('Execução com parâmetros', async () => {
        const comandoInserir = 'INSERIR EM clientes (NOME, IDADE, EMAIL, ATIVO) VALORES (?, ?, ?, ?);';
        const comandoAtualizar = 'ATUALIZAR clientes DEFINIR NOME = ?, IDADE = ?, EMAIL = ?, ATIVO = ? ONDE ID = ?;';
        const comandoExcluir = 'EXCLUIR DE clientes ONDE ID = ?;';
        const comandoSelecionar = 'SELECIONAR * DE clientes;';

        try {
            const retornosInserir = await linconesSqlite.executar(null, comandoInserir, ['Pernalonga', 18, 'pernalonga@warnerbros.com', true]);
            expect(retornosInserir).toBeTruthy();
            expect(retornosInserir.length).toBeGreaterThan(0);
            const retornoInserir = retornosInserir[0];
            expect(retornoInserir.ultimoId).toBeGreaterThan(0);
            
            const retornosAtualizar = await linconesSqlite.executar(null, comandoAtualizar, ['Pernalonga Atualizado', 19, 'pernalonga2@warnerbros.com', false, retornoInserir.ultimoId]);
            expect(retornosAtualizar).toBeTruthy();
            expect(retornosAtualizar.length).toBeGreaterThan(0);
            const retornoAtualizar = retornosAtualizar[0];
            expect(retornoAtualizar.linhasAfetadas).toBeGreaterThan(0);

            const retornosExcluir = await linconesSqlite.executar(null, comandoExcluir, [retornoInserir.ultimoId]);
            expect(retornosExcluir).toBeTruthy();
            expect(retornosExcluir.length).toBeGreaterThan(0);
            const retornoExcluir = retornosExcluir[0];
            expect(retornoExcluir.linhasAfetadas).toBeGreaterThan(0);

            const retornosSelecionar = await linconesSqlite.executar(null, comandoSelecionar);
            expect(retornosSelecionar).toBeTruthy();
            expect(retornosSelecionar.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('Erro de execução em teste:', error);
            throw error;
        }
    });
});
