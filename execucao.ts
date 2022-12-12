// import { Lincones } from './fontes/lincones';
import { AvaliadorSintatico } from "./fontes/avaliador-sintatico";
import { Lexador } from "./fontes/lexador";

// const lincones = new Lincones();
const lexador = new Lexador();
const avaliadorSintatico = new AvaliadorSintatico();
const sentencaSelecao = 'SELECIONAR NOME, EMAIL DE clientes ONDE IDADE = 18;';
let resultadoLexador = lexador.mapear([sentencaSelecao]);
let teste = avaliadorSintatico.analisar(resultadoLexador);
console.log(teste);

const sentencaCriacao = 'CRIAR TABELA clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);';
resultadoLexador = lexador.mapear([sentencaCriacao]);
teste = avaliadorSintatico.analisar(resultadoLexador);
console.log(teste);

const sentencaInsercao = 'INSERIR EM clientes (NOME) VALORES ("Pernalonga")';
resultadoLexador = lexador.mapear([sentencaInsercao]);
teste = avaliadorSintatico.analisar(resultadoLexador);
console.log(teste);