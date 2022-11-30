import { ISqlite } from '../../interfaces';

export class Sqlite implements ISqlite {
    public iniciar() {
        console.log('Sqlite iniciado');
    }
}
