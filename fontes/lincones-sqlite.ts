import { Tradutor } from "../comum/fontes/tradutor";
import { AvaliadorSintatico } from "../comum/fontes/avaliador-sintatico";
import { Lexador } from "./lexador";

export class LinconesSQLite {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: Tradutor

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new Tradutor();
    }

    
}