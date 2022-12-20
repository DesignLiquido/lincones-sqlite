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
            const linhas = this.linhasAfetadas || 0;
            this.comandoExecutado = resultadoExecucao.stmt;
            this.mensagemExecucao = `Ok (${linhas} ${linhas > 1 ? 'linhas afetadas' : 'linha afetada'})`;
        }

        if (Array.isArray(resultadoExecucao)) {
            const linhas = this.linhasRetornadas.length || 0
            this.linhasRetornadas = resultadoExecucao;
            this.mensagemExecucao = `(${linhas} ${linhas > 1 ? 'linhas retornadas' : 'linha retornada'})`;
        }
    }
}