import { TradutorSqLite } from "./tradutor";
import { AvaliadorSintatico } from "./comum/fontes/avaliador-sintatico";
import { Lexador } from "./comum/fontes/lexador";
import { ClienteSQLite } from "./infraestrutura/cliente-sqlite";
import { RetornoComando } from "./infraestrutura";

export class LinconesSQLite {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: TradutorSqLite;
    clienteSQLite: ClienteSQLite;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new TradutorSqLite();
        this.clienteSQLite = new ClienteSQLite();
    }

    /**
     * Traduz um comando de LinConEs para SQL e executa no banco de dados SQLite.
     * @param _ Normalmente a instância do interpretador Delégua.
     * @param comando O comando em LinConEs a ser traduzido e executado.
     * @param parametros Parâmetros adicionais para o comando, se necessário.
     * @returns 
     */
    async executar(_: any, comando: string, parametros: any[] = []): Promise<RetornoComando> {
        const resultadoLexador = this.lexador.mapear([comando]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);
        const resultadoTraducao = this.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);

        if (resultadoAvaliacaoSintatica.comandos.length <= 0) {
            return new RetornoComando(null);
        }

        const resultadoExecucao = await this.clienteSQLite.executarComando(resultadoTraducao, parametros);
        const retorno = new RetornoComando(resultadoExecucao);

        return retorno;
    }
}