import { InformacoesColuna } from '../avaliador-sintatico';
import { Comando } from './comando';

export class Criar extends Comando {
    public tabela: string;
    public colunas: InformacoesColuna[];
    constructor(linha: number, tabela: string, colunas: InformacoesColuna[]) {
        super(linha);
        this.tabela = tabela;
        this.colunas = colunas;
    }
}
