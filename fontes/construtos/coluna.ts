export class Coluna {
    public nomeColuna: string;
    public tipo: 'INTEIRO' | 'LOGICO' | 'NUMERO' | 'TEXTO';
    public tamanho: number;
    public nulo: boolean;
    public chavePrimaria: boolean;
    public chaveEstrangeira: boolean;

    constructor(
        nomeColuna: string,
        tipo: 'INTEIRO' | 'LOGICO' | 'NUMERO' | 'TEXTO',
        tamanho?: number,
        nulo?: boolean,
        chavePrimaria?: boolean,
        chaveEstrangeira?: boolean
    ) {
        this.nomeColuna = nomeColuna;
        this.tipo = tipo;
        this.tamanho = tamanho || -1;
        
        this.nulo = nulo || false;
        this.chavePrimaria = chavePrimaria || false;
        this.chaveEstrangeira = chaveEstrangeira || false;
    }
}
