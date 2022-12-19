import * as caminho from 'node:path';

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

    public async abrir() {
        const database = await sqlite.open(this.origemDados);
        this.instanciaBancoDeDados = database;
        console.log('Conectado ao banco de dados SQLite.');
    }

    public async executarComando(comando: string): Promise<any> {
        if (comando.startsWith('SELECT')) {
            return await this.executarComandoSelecao(comando);
        }

        return await this.instanciaBancoDeDados.run(comando, (erro: Error) => {
            if (erro) {
                console.log(erro.message);
            }
        });
    }

    private async executarComandoSelecao(comando: string) {
        return await this.instanciaBancoDeDados.all(comando);
    }
}
