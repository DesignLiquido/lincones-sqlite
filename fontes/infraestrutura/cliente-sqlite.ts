import * as caminho from 'node:path';

import Database from 'better-sqlite3';

// better-sqlite3 rejeita booleans como parâmetro de bind; SQLite não tem
// tipo booleano nativo, então convertemos para 0/1 antes de ligar o valor.
function normalizarParametros(parametros: any[]): any[] {
    return parametros.map((parametro) => (typeof parametro === 'boolean' ? (parametro ? 1 : 0) : parametro));
}

export class ClienteSQLite {
    instanciaBancoDeDados: Database.Database;
    readonly caminhoRaiz: string;
    origemDados: string;

    // Segundo a documentação, o método new Database()
    // pode receber 3 formas de filename
    // caminho do arquivo exemplo: /tmp/banco.db
    // ":memory:" para criar um banco de dados em memória
    // null para criar um banco de dados temporário
    constructor(origemDados: string | null = null) {
        this.caminhoRaiz = process.cwd();
        this.origemDados = null;

        if (origemDados !== ':memory:' && origemDados !== null) {
            this.origemDados = caminho.join(this.caminhoRaiz, origemDados);
        } else {
            this.origemDados = ':memory:';
        }
    }

    async abrir() {
        this.instanciaBancoDeDados = new Database(this.origemDados);
        console.info('Conectado ao banco de dados SQLite.');
    }

    async executarComando(comando: string, parametros: any[] = []): Promise<any> {
        if (comando.startsWith('SELECT')) {
            return await this.executarComandoSelecao(comando, parametros);
        }

        const resultado = this.instanciaBancoDeDados.prepare(comando).run(...normalizarParametros(parametros));
        return {
            changes: resultado.changes,
            lastID: resultado.lastInsertRowid,
            stmt: comando
        };
    }

    private async executarComandoSelecao(comando: string, parametros: any[] = []): Promise<any> {
        return this.instanciaBancoDeDados.prepare(comando).all(...normalizarParametros(parametros));
    }
}
