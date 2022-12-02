import { SimboloInterface } from '..';
import { ErroAvaliadorSintatico } from '../../avaliador-sintatico';
import { Declaracao } from '../../declaracoes';

export interface RetornoAvaliadorSintatico {
    declaracoes: Declaracao[];
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
