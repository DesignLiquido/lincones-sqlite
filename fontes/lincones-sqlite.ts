import { TradutorSqLite } from "./tradutor";
import { AvaliadorSintatico } from "./comum/fontes/avaliador-sintatico";
import { Lexador } from "./comum/fontes/lexador";
import { ClienteSQLite } from "./infraestrutura/cliente-sqlite";
import { RetornoComando } from "./infraestrutura";
import { Comando, TecnologiaLinconesInterface } from "./comum/fontes";

/**
 * Implementação da tecnologia LinConEs para SQLite, permitindo a execução de comandos escritos em LinConEs diretamente em um banco de dados SQLite.
 * Esta classe integra o processo de lexagem, avaliação sintática, tradução e execução de comandos, proporcionando uma interface unificada para 
 * interagir com o banco de dados SQLite usando a sintaxe do LinConEs.
 */
export class LinconesSQLite implements TecnologiaLinconesInterface {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: TradutorSqLite;
    clienteSQLite: ClienteSQLite | undefined;
    configuracao?: { caminho?: string; [chave: string]: any };

    constructor(configuracao?: { caminho?: string; [chave: string]: any }) {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new TradutorSqLite();
        this.configuracao = configuracao;
    }

    async iniciar(caminho?: string): Promise<void> {
        const caminhoEfetivo = caminho ?? this.configuracao?.caminho ?? null;
        this.clienteSQLite = new ClienteSQLite(caminhoEfetivo);
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
     * @returns {Promise<RetornoComando[]>} Uma promessa que resolve para um array de objetos RetornoComando, representando os resultados da execução dos comandos.
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

        // Filtrar comandos nulos ou indefinidos antes de processar.
        const comandosValidos = comandos.filter((c) => c);
        
        for (const comando of comandosValidos) {
            const resultadoTraducao = this.tradutor.traduzir([comando]);
            
            if (!resultadoTraducao || resultadoTraducao.trim() === '') {
                throw new Error(`Tradução produziu SQL vazio para comando: ${comando.constructor.name}`);
            }
            
            // TODO: Parâmetros
            if (!this.clienteSQLite) {
                throw new Error("Cliente SQLite não inicializado.");
            }

            const resultadoExecucao = await this.clienteSQLite.executarComando(resultadoTraducao, parametros);
            const retorno = new RetornoComando(resultadoExecucao);
            retornosComandos.push(retorno);
        }

        return retornosComandos;
    }
}
