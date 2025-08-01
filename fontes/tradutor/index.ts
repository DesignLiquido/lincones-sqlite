import { Coluna } from '../comum/fontes/construtos';
import {
    Atualizar,
    Comando,
    Criar,
    Excluir,
    Inserir,
    Selecionar
} from '../comum/fontes/comandos';
import { Simbolo } from '../comum/fontes/lexador/simbolo';
import { TradutorSqlAnsi } from '../comum/fontes/tradutor/tradutor-sql-ansi';

import tiposDeSimbolos from '../comum/fontes/tipos-de-simbolos';

export class TradutorSqLite extends TradutorSqlAnsi {
    traduzirOperador(operador: string) {
        switch (operador) {
            case tiposDeSimbolos.IGUAL:
                return '=';
            case tiposDeSimbolos.VERDADEIRO:
                return true;
            case tiposDeSimbolos.FALSO:
                return false;
        }
    }

    traduzirColuna(coluna: Coluna) {
        let traduzir = '';
        
        if (tiposDeSimbolos.INTEIRO === coluna.tipo) {
            traduzir += `INTEGER `;
        } else if (tiposDeSimbolos.TEXTO === coluna.tipo) {
            const simbolo = coluna.tamanho as Simbolo;
            traduzir += `VARCHAR(${simbolo.literal}) `;
        } else if (tiposDeSimbolos.LOGICO === coluna.tipo)
            traduzir += 'BOOLEAN ';
        if (coluna.chavePrimaria) traduzir += 'PRIMARY KEY ';
        if (coluna.nulo) traduzir += 'NULL';
        else traduzir += 'NOT NULL';

        return traduzir;
    }

    traduzirComandoCriar(comandoCriar: Criar) {
        let resultado = `CREATE TABLE ${comandoCriar.nomeEntidade} (`;

        for (const coluna of comandoCriar.colunas) {
            resultado += `${coluna.nomeColuna} ${this.traduzirColuna(
                coluna
            )}, `;
        }

        resultado = resultado.slice(0, -2);
        resultado += ')';

        return resultado;
    }

    dicionarioComandos = {
        Alterar: this.traduzirComandoAlterar.bind(this),
        Atualizar: this.traduzirComandoAtualizar.bind(this),
        Criar: this.traduzirComandoCriar.bind(this),
        Excluir: this.traduzirComandoExcluir.bind(this),
        Inserir: this.traduzirComandoInserir.bind(this),
        Selecionar: this.traduzirComandoSelecionar.bind(this)
    };

    traduzir(comandos: Comando[]) {
        let resultado = '';

        for (const comando of comandos.filter((c) => c)) {
            resultado += `${this.dicionarioComandos[comando.constructor.name](
                comando
            )} \n`;
        }

        return resultado;
    }
}
