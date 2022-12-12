import { Comando, Selecionar } from "../comandos";

import tiposDeSimbolos from "../tipos-de-simbolos";

export class Tradutor {

    traduzirOperador(operador: string) {
        switch (operador) {
            case tiposDeSimbolos.IGUAL:
                return '=';
        }
    }

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

    traduzirComandoSelecionar(comandoSelecionar: Selecionar) {
        let resultado = 'SELECT ';

        // Colunas
        if (comandoSelecionar.tudo) {
            resultado += '*'
        } else {
            for (const coluna of comandoSelecionar.colunas) {
                resultado += coluna + ', ';
            }

            resultado = resultado.slice(0, -2);
        }

        resultado += `\nFROM ${comandoSelecionar.tabela}`;

        // Condições
        if (comandoSelecionar.condicoes.length > 0) {
            resultado += '\n WHERE ';
            for (const condicao of comandoSelecionar.condicoes) {
                resultado += `${condicao.esquerda.lexema} ${this.traduzirOperador(condicao.operador)} ${condicao.direita} AND `;
            }
            resultado = resultado.slice(0, -5);
        }

        return resultado;
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