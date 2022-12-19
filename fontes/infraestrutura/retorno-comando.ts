export class RetornoComando {
    linhasAfetadas: number;
    ultimoId: any;
    linhasRetornadas: any[] = [];
    comandoExecutado: string;
    mensagemExecucao: string;

    constructor(resultadoExecucao: any) {
        if (!resultadoExecucao) {
            return;
        }

        if (resultadoExecucao.changes) {
            this.linhasAfetadas = resultadoExecucao.changes;
        }

        if (resultadoExecucao.lastID) {
            this.ultimoId = resultadoExecucao.lastID;
        }

        if (resultadoExecucao.stmt) {
            this.comandoExecutado = resultadoExecucao.stmt;
            this.mensagemExecucao = `Ok (${this.linhasAfetadas || 0} linhas afetadas)`;
        }

        if (Array.isArray(resultadoExecucao)) {
            this.linhasRetornadas = resultadoExecucao;
            this.mensagemExecucao = `(${this.linhasRetornadas.length} linhas retornadas)`;
        }
    }
}