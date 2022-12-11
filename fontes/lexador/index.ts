import { SimboloInterface } from '../interfaces';
import { Simbolo } from './simbolo';

import palavrasReservadas from '../palavras-reservadas';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { RetornoLexador } from '../interfaces/retornos';

export class Lexador {
    inicioSimbolo: number;
    atual: number;
    linha: number;
    codigo: string[];
    simbolos: SimboloInterface[];
    erros: any[];

    eDigito(caractere: string): boolean {
        return caractere >= '0' && caractere <= '9';
    }

    eAlfabeto(caractere: string): boolean {
        const acentuacoes = [
            'á',
            'Á',
            'ã',
            'Ã',
            'â',
            'Â',
            'à',
            'À',
            'é',
            'É',
            'ê',
            'Ê',
            'í',
            'Í',
            'ó',
            'Ó',
            'õ',
            'Õ',
            'ô',
            'Ô',
            'ú',
            'Ú',
            'ç',
            'Ç',
            '_'
        ];

        return (
            (caractere >= 'a' && caractere <= 'z') ||
            (caractere >= 'A' && caractere <= 'Z') ||
            acentuacoes.includes(caractere)
        );
    }

    eAlfabetoOuDigito(caractere: string): boolean {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    }

    eFinalDoCodigo(): boolean {
        return (
            this.eUltimaLinha() &&
            this.codigo[this.codigo.length - 1].length <= this.atual
        );
    }

    eUltimaLinha() {
        return this.linha >= this.codigo.length - 1;
    }

    eFinalDaLinha(): boolean {
        if (this.codigo.length === this.linha) {
            return true;
        }
        return this.atual >= this.codigo[this.linha].length;
    }

    simboloAtual(): string {
        if (this.eFinalDaLinha()) return '\0';
        return this.codigo[this.linha].charAt(this.atual);
    }

    avancar(): void {
        this.atual += 1;

        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    }

    proximoSimbolo(): string {
        return this.codigo[this.linha].charAt(this.atual + 1);
    }

    simboloAnterior(): string {
        return this.codigo[this.linha].charAt(this.atual - 1);
    }

    analisarNumero(): void {
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }

        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();

            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }

        const numeroCompleto = this.codigo[this.linha].substring(
            this.inicioSimbolo,
            this.atual
        );
        this.adicionarSimbolo(
            tiposDeSimbolos.NUMERO,
            parseFloat(numeroCompleto)
        );
    }

    analisarTexto(delimitador = '"'): void {
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }

        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Texto não finalizado.'
            });
            return;
        }

        const valor = this.codigo[this.linha].substring(
            this.inicioSimbolo + 1,
            this.atual
        );
        this.adicionarSimbolo(tiposDeSimbolos.TEXTO, valor);
    }

    adicionarSimbolo(tipo: string, literal: any = null): void {
        const texto: string = this.codigo[this.linha].substring(
            this.inicioSimbolo,
            this.atual
        );
        this.simbolos.push(
            new Simbolo(tipo, literal || texto, literal, this.linha + 1)
        );
    }

    identificarPalavraChave(): void {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }

        const codigo: string = this.codigo[this.linha].substring(
            this.inicioSimbolo,
            this.atual
        ).toLowerCase();
        
        const tipo: string =
            codigo in palavrasReservadas
                ? palavrasReservadas[codigo]
                : tiposDeSimbolos.IDENTIFICADOR;

        this.adicionarSimbolo(tipo);
    }

    analisarToken() {
        const caractere = this.simboloAtual();

        switch (caractere) {
            // Esta sessão ignora espaços em branco na tokenização.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
                this.avancar();
                break;
            case ';':
                this.adicionarSimbolo(tiposDeSimbolos.PONTO_VIRGULA, ';');
                this.linha++;
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            case "'":
                this.avancar();
                this.analisarTexto("'");
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(tiposDeSimbolos.PARENTESE_ESQUERDO, '(');
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(tiposDeSimbolos.PARENTESE_DIREITO, ')');
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(tiposDeSimbolos.VIRGULA, ',');
                this.avancar();
                break;
            case '=':
                this.adicionarSimbolo(tiposDeSimbolos.IGUAL, '=');
                this.avancar();
                break;
            case '*':
                this.adicionarSimbolo(tiposDeSimbolos.TUDO, '*');
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tiposDeSimbolos.MENOR_IGUAL);
                    this.avancar();
                } else {
                    this.adicionarSimbolo(tiposDeSimbolos.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tiposDeSimbolos.MAIOR_IGUAL);
                    this.avancar();
                } else {
                    this.adicionarSimbolo(tiposDeSimbolos.MAIOR);
                }
                break;
            default:
                if (this.eDigito(caractere)) this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: this.linha + 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.'
                    });
                    this.avancar();
                }
        }
    }

    mapear(codigo: string[]): RetornoLexador {
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.simbolos = [];
        this.erros = [];

        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }

        return {
            simbolos: this.simbolos,
            erros: this.erros
        } as RetornoLexador;
    }
}
