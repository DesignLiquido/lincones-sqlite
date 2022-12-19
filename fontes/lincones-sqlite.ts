import { Tradutor } from "../comum/fontes/tradutor";
import { AvaliadorSintatico } from "../comum/fontes/avaliador-sintatico";
import { Lexador } from "./lexador";
import { ClienteSQLite } from "./infraestrutura/cliente-sqlite";
import { RetornoComando } from "./infraestrutura";

export class LinconesSQLite {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: Tradutor;
    clienteSQLite: ClienteSQLite;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new Tradutor();
        this.clienteSQLite = new ClienteSQLite();
    }

    async executar(comando: string): Promise<RetornoComando> {
        const resultadoLexador = this.lexador.mapear([comando]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);
        const resultadoTraducao = this.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);

        if (resultadoAvaliacaoSintatica.comandos.length <= 0) {
            return new RetornoComando(null);
        }

        const resultadoExecucao = await this.clienteSQLite.executarComando(resultadoTraducao);
        const retorno = new RetornoComando(resultadoExecucao);

        return retorno;
    }
}