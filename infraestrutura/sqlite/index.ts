import { ISqlite } from '../../interfaces';

export class Sqlite implements ISqlite {
    open(): void {
        throw new Error('Method not implemented.');
    }
    fechar(): void {
        throw new Error('Method not implemented.');
    }
    public iniciar() {
        console.log('Sqlite iniciado');
    }
}
