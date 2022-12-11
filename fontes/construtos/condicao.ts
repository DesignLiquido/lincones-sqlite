export class Condicao {
    esquerda: any;
    direita: any;
    operador: 'IGUAL' | 'MAIOR' | 'MAIOR_IGUAL' | 'MENOR' | 'MENOR_IGUAL';

    constructor(esquerda: any, operador: any, direita: any) {
        this.esquerda = esquerda;
        this.direita = direita;
        this.operador = operador;
    }
}