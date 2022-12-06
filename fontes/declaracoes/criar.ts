import { InformacoesColuna } from '../avaliador-sintatico';
import { Declaracao } from './declaracao';

export class Criar extends Declaracao {
    public tabela: string;
    public colunas: InformacoesColuna[];
    constructor(linha: number, tabela: string, colunas: InformacoesColuna[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
    }
}
