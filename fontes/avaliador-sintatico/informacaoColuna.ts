export class InformacoesColuna {
    public nomeColuna: string;
    public nulo: boolean;
    public chavePrimaria: boolean;
    public chaveEstrangeira: boolean;
    public tipo: string;
    public tamanho: number;
    constructor(
        nomeColuna: string,
        tipo: string,
        tamanho: number,
        nulo?: boolean,
        chavePrimaria?: boolean,
        chaveEstrangeira?: boolean
    ) {
        this.nomeColuna = nomeColuna;
        this.nulo = nulo || false;
        this.chavePrimaria = chavePrimaria || false;
        this.chaveEstrangeira = chavePrimaria ? false : chaveEstrangeira;
        this.tipo = tipo;
        this.tamanho = tamanho;
    }
}
