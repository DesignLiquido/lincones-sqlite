import { LinconesSQLite } from '../fontes/lincones-sqlite';

describe('LinconesSqlite', () => {
    let linconesSqlite: LinconesSQLite;

    beforeEach(() => {
        linconesSqlite = new LinconesSQLite();
    });

    it('Execução com parâmetros', async () => {
        const comandoCriarTabela = 'CRIAR TABELA SE NÃO EXISTIR clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);';
        const comandoInserir = 'INSERIR EM clientes (NOME, IDADE, EMAIL, ATIVO) VALORES (?, ?, ?, ?);';
        const comandoAtualizar = 'ATUALIZAR clientes DEFINIR NOME = ?, IDADE = ?, EMAIL = ?, ATIVO = ? ONDE ID = ?;';
        const comandoExcluir = 'EXCLUIR DE clientes ONDE ID = ?;';
        const comandoSelecionar = 'SELECIONAR * DE clientes;';

        await linconesSqlite.clienteSQLite.abrir();

        const retornoCriarTabela = await linconesSqlite.executar(null, comandoCriarTabela);
        expect(retornoCriarTabela).toBeTruthy();

        const retornoInserir = await linconesSqlite.executar(null, comandoInserir, ['Pernalonga', 18, 'pernalonga@warnerbros.com', true]);
        expect(retornoInserir).toBeTruthy();
        expect(retornoInserir.ultimoId).toBeGreaterThan(0);
        
        const retornoAtualizar = await linconesSqlite.executar(null, comandoAtualizar, ['Pernalonga Atualizado', 19, 'pernalonga2@warnerbros.com', false, retornoInserir.ultimoId]);
        expect(retornoAtualizar).toBeTruthy();
        expect(retornoAtualizar.linhasAfetadas).toBeGreaterThan(0);

        const retornoExcluir = await linconesSqlite.executar(null, comandoExcluir, [retornoInserir.ultimoId]);
        expect(retornoExcluir).toBeTruthy();
        expect(retornoExcluir.linhasAfetadas).toBeGreaterThan(0);

        const retornoSelecionar = await linconesSqlite.executar(null, comandoSelecionar);
        expect(retornoSelecionar).toBeTruthy();
    });
});
