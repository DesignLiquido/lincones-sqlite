import { AvaliadorSintatico } from "./avaliador-sintatico";
import { Lexador } from "./lexador";

export class Lincones {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
    }

    
}