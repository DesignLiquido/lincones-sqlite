import { ErroAvaliadorSintatico } from '../avaliador-sintatico';
import { SimboloInterface } from './simbolo-interface';

export interface AvaliadorSintaticoInterface {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];

    atual: number;
    bloco: number;
}
