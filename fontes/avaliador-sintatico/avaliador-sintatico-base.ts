import { AvaliadorSintaticoInterface, SimboloInterface } from '../interfaces';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';

export abstract class AvaliadorSintaticoBase
    implements AvaliadorSintaticoInterface
{
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    atual: number;
    bloco: number;

    consumir(tipo: string, mensagemDeErro: string): SimboloInterface {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }

    estaNoFinal(): boolean {
        return this.atual === this.simbolos.length;
    }

    verificarTipoSimboloAtual(tipo: string): boolean {
        if (this.estaNoFinal()) return false;
        return this.simbolos[this.atual].tipo === tipo;
    }

    verificaSeLexemaSimboloAtual(lexama: string): boolean {
        if (this.estaNoFinal()) return false;
        return this.simbolos[this.atual].lexema === lexama;
    }

    avancarEDevolverAnterior(): SimboloInterface {
        if (!this.estaNoFinal()) this.atual++;
        return this.simbolos[this.atual - 1];
    }

    erro(
        simbolo: SimboloInterface,
        mensagemDeErro: string
    ): ErroAvaliadorSintatico {
        const excecao = new ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }

    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean {
        for (let i = 0; i < argumentos.length; i++) {
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }

        return false;
    }
}
