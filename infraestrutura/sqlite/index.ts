import * as caminho from 'node:path';

import { ISqlite } from '../../interfaces';
import sqlite3 from 'sqlite3';

export class Sqlite implements ISqlite {
    bancoDeDadosInstancia: sqlite3.Database;
    readonly caminhoRaiz: string;
    caminhoTotalArquivo: string;

    constructor() {
        this.caminhoRaiz = __dirname;
        this.caminhoTotalArquivo = null;
    }

    private async abrir(arquivo: string | null): Promise<void> {
        if (arquivo !== ':memory:' && arquivo !== null) {
            this.caminhoTotalArquivo = caminho.join(this.caminhoRaiz, arquivo);
        }

        this.bancoDeDadosInstancia = new sqlite3.Database(
            arquivo,
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

    // Segundo a documentação, o método new sqlite3.Database()
    // pode receber 3 formas de filename
    // caminho do arquivo exemplo: /tmp/banco.db
    // ":memory:" para criar um banco de dados em memória
    // null para criar um banco de dados temporário

    public iniciar(filename: string | null): void {
        this.abrir(filename);
    }

    public executarSqlite(sql: string): void {
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
