import { Comando } from "../comandos";

export class Tradutor {

    traduzirComandoAtualizar() {
        return '';
    }

    traduzirComandoCriar() {
        return '';
    }

    traduzirComandoExcluir() {
        return '';
    }

    traduzirComandoInserir() {
        return '';
    }

    traduzirComandoSelecionar() {
        return '';
    }

    dicionarioComandos = {
        Atualizar: this.traduzirComandoAtualizar.bind(this),
        Criar: this.traduzirComandoCriar.bind(this),
        Excluir: this.traduzirComandoExcluir.bind(this),
        Inserir: this.traduzirComandoInserir.bind(this),
        Selecionar: this.traduzirComandoSelecionar.bind(this)
    }

    traduzir(comandos: Comando[]) {
        let resultado = '';

        for (const comando of comandos) {
            resultado += `${this.dicionarioComandos[comando.constructor.name](comando)} \n`;
        }

        return resultado;
    }
}