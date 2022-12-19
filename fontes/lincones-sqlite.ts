import { Tradutor } from "../comum/fontes/tradutor";
import { AvaliadorSintatico } from "../comum/fontes/avaliador-sintatico";
import { Lexador } from "./lexador";
import { ClienteSQLite } from "./infraestrutura/sqlite";

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

    async executar(comando: string): Promise<any> {
        const resultadoLexador = this.lexador.mapear([comando]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);
        const resultadoTraducao = this.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);

        let resultadoExecucao: any;
        if (resultadoAvaliacaoSintatica.comandos[0].constructor.name === 'Selecionar') {
            resultadoExecucao = await this.clienteSQLite.executarComandoSelecao(resultadoTraducao);
        } else {
            resultadoExecucao = await this.clienteSQLite.executarComando(resultadoTraducao);
        }

        return resultadoExecucao;
    }
}