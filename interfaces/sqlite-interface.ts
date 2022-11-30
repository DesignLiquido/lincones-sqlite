import sqlite3 from 'sqlite3';

export interface ISqlite {
    bancoDeDadosInstancia: sqlite3.Database;
    readonly caminhoRaiz: string;
    caminhoTotalArquivo: string;

    iniciar(filename: string | null): void;
}
