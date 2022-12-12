import { SimboloInterface } from '..';
import { ErroAvaliadorSintatico } from '../../avaliador-sintatico';
import { Comando } from '../../comandos';

export interface RetornoAvaliadorSintatico {
    comandos: Comando[];
    erros: ErroAvaliadorSintatico[];
}

export interface RetornoLexador {
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
}

export interface ErroLexador {
    linha: number;
    caractere: string;
    mensagem: string;
}
