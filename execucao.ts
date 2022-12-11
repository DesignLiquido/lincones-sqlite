// import { Lincones } from './fontes/lincones';
import { AvaliadorSintatico } from "./fontes/avaliador-sintatico";
import { Lexador } from "./fontes/lexador";

// const lincones = new Lincones();
const lexador = new Lexador();
const avaliadorSintatico = new AvaliadorSintatico();
const sentencaSelecao = 'SELECIONAR NOME, EMAIL DE clientes ONDE IDADE = 18;';
const resultadoLexador = lexador.mapear([sentencaSelecao]);
const teste = avaliadorSintatico.analisar(resultadoLexador);
console.log(teste);
