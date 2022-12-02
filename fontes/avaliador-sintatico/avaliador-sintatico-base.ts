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
        for (const argumento of argumentos) {
            const tipoAtual = argumentos[argumento];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }
        return false;
    }

    abstract declaracao(): void;
    abstract sincronizar(): void;
    abstract primario(): void;
    abstract chamar(): void;
}
