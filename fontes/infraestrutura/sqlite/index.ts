import * as caminho from 'node:path';

import sqlite3 from 'sqlite3';

export class ClienteSQLite {
    bancoDeDadosInstancia: sqlite3.Database;
    readonly caminhoRaiz: string;
    caminhoTotalArquivo: string;

    // Segundo a documentação, o método new sqlite3.Database()
    // pode receber 3 formas de filename
    // caminho do arquivo exemplo: /tmp/banco.db
    // ":memory:" para criar um banco de dados em memória
    // null para criar um banco de dados temporário
    constructor(origemDados: string | null) {
        this.caminhoRaiz = process.cwd();
        this.caminhoTotalArquivo = null;

        if (origemDados !== ':memory:' && origemDados !== null) {
            this.caminhoTotalArquivo = caminho.join(this.caminhoRaiz, origemDados);
        }

        this.bancoDeDadosInstancia = new sqlite3.Database(
            origemDados,
            (erro: Error) => {
                if (erro) {
                    console.error(erro.message);
                    return;
                }
                console.log('Conectado ao banco de dados SQLite.');
            }
        );
    }
    
    private async fechar(): Promise<void> {
        this.bancoDeDadosInstancia.close((erro: Error) => {
            if (erro) {
                console.error(erro.message);
            }
            console.log('Conexão com o banco de dados SQLite encerrada.');
        });
    }

    public executarComando(sql: string): void {
        if (!this.bancoDeDadosInstancia) {
            console.log(
                'Não foi possível executar o SQLite. Você precisa inicializar o banco de dados.'
            );
            return null;
        }

        this.bancoDeDadosInstancia.run(sql, (erro: Error) => {
            if (erro) {
                console.log(erro.message);
            }
        });
    }
}
