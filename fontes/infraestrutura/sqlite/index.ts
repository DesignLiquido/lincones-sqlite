import * as caminho from 'node:path';

// import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

export class ClienteSQLite {
    // bancoDeDadosInstancia: sqlite3.Database;
    instanciaBancoDeDados: sqlite.Database;
    readonly caminhoRaiz: string;
    origemDados: string;

    // Segundo a documentação, o método new sqlite3.Database()
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
    
    /* private async fechar(): Promise<void> {
        this.bancoDeDadosInstancia.close((erro: Error) => {
            if (erro) {
                console.error(erro.message);
            }
            console.log('Conexão com o banco de dados SQLite encerrada.');
        });
    } */

    public async abrir() {
        const database = await sqlite.open(this.origemDados);
        this.instanciaBancoDeDados = database;
        console.log('Conectado ao banco de dados SQLite.');
    }

    public async executarComando(comando: string): Promise<sqlite.Statement> {
        /* if (!this.bancoDeDadosInstancia) {
            console.log(
                'Não foi possível executar o SQLite. Você precisa inicializar o banco de dados.'
            );
            return null;
        } */

        return await this.instanciaBancoDeDados.run(comando, (erro: Error) => {
            if (erro) {
                console.log(erro.message);
            }
        });
    }

    public async executarComandoSelecao(comando: string) {
        return await this.instanciaBancoDeDados.get(comando);
    }
}
