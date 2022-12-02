import { ErroAvaliadorSintatico } from '../avaliador-sintatico';
import { SimboloInterface } from './simbolo-interface';

export interface AvaliadorSintaticoInterface {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];

    atual: number;
    bloco: number;

    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    estaNoFinal(): boolean;
    verificarTipoSimboloAtual(tipo: string): boolean;
    avancarEDevolverAnterior(): SimboloInterface;
    erro(
        simbolo: SimboloInterface,
        mensagemDeErro: string
    ): ErroAvaliadorSintatico;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
}
