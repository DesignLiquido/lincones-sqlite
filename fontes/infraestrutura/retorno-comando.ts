export class RetornoComando {
    linhasAfetadas: number;
    ultimoId: any;
    linhasRetornadas: any[] = [];
    comandoExecutado: string;

    constructor(resultadoExecucao: any) {
        if (resultadoExecucao.changes) {
            this.linhasAfetadas = resultadoExecucao.changes;
        }

        if (resultadoExecucao.lastID) {
            this.ultimoId = resultadoExecucao.lastID;
        }

        if (resultadoExecucao.stmt) {
            this.comandoExecutado = resultadoExecucao.stmt;
        }

        if (Array.isArray(resultadoExecucao)) {
            this.linhasRetornadas = resultadoExecucao;
        }
    }
}