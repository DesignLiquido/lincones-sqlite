import { TradutorSqLite } from "./tradutor";
import { AvaliadorSintatico } from "./comum/fontes/avaliador-sintatico";
import { Lexador } from "./comum/fontes/lexador";
import { ClienteSQLite } from "./infraestrutura/cliente-sqlite";
import { RetornoComando } from "./infraestrutura";
import { Comando, TecnologiaLinconesInterface } from "./comum/fontes";

export class LinconesSQLite implements TecnologiaLinconesInterface {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: TradutorSqLite;
    clienteSQLite: ClienteSQLite;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new TradutorSqLite();
    }

    async iniciar(caminho: string): Promise<void> {
        this.clienteSQLite = new ClienteSQLite(caminho);
        await this.clienteSQLite.abrir();
    }

    async executarComando(comando: Comando) {
        return await this.executarInterno([comando], comando.parametros);
    }

    /**
     * Traduz um comando de LinConEs para SQL e executa no banco de dados SQLite.
     * @param _ Normalmente a instância do interpretador Delégua.
     * @param sentencaLincones A sentença em LinConEs a ser traduzida e executada.
     * @param parametros Parâmetros adicionais para o comando, se necessário.
     * @returns 
     */
    async executar(_: any, sentencaLincones: string, parametros: any[] = []): Promise<RetornoComando[]> {
        const parametrosNaoNulos = parametros || [];
        const resultadoLexador = this.lexador.mapear([sentencaLincones]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);

        if (resultadoAvaliacaoSintatica.erros.length > 0) {
            throw new Error(`Erros encontrados na avaliação de comandos: ${resultadoAvaliacaoSintatica.erros.reduce((mensagens, erro) => mensagens += erro.message + '; ', '')}.`);
        }

        return await this.executarInterno(resultadoAvaliacaoSintatica.comandos, parametrosNaoNulos);
    }

    private async executarInterno(comandos: Comando[], parametros: any[]): Promise<RetornoComando[]> {
        if (comandos.length <= 0) {
            return [];
        }

        const retornosComandos: RetornoComando[] = [];

        for (const comando of comandos) {
            const resultadoTraducao = this.tradutor.traduzir([comando]);
            // TODO: Parâmetros
            const resultadoExecucao = await this.clienteSQLite.executarComando(resultadoTraducao, parametros);
            const retorno = new RetornoComando(resultadoExecucao);
            retornosComandos.push(retorno)
        }

        return retornosComandos;
    }
}
