import { LinconesSQLite } from "./fontes/lincones-sqlite";

const lincones = new LinconesSQLite();

const sentencaSelecao = 'SELECIONAR NOME, EMAIL DE clientes ONDE IDADE = 18;';
let resultadoLexador = lincones.lexador.mapear([sentencaSelecao]);
let resultadoAvaliacaoSintatica = lincones.avaliadorSintatico.analisar(resultadoLexador);
let resultadoTraducao = lincones.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);
console.log(resultadoTraducao);

const sentencaCriacao = 'CRIAR TABELA clientes(ID INTEIRO NAO NULO CHAVE PRIMARIA AUTO INCREMENTO, NOME TEXTO(100) NAO NULO, IDADE INTEIRO NAO NULO, EMAIL TEXTO(255) NAO NULO, ATIVO LOGICO NAO NULO);';
resultadoLexador = lincones.lexador.mapear([sentencaCriacao]);
resultadoAvaliacaoSintatica = lincones.avaliadorSintatico.analisar(resultadoLexador);
resultadoTraducao = lincones.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);
console.log(resultadoTraducao);

const sentencaInsercao = 'INSERIR EM clientes (NOME) VALORES ("Pernalonga")';
resultadoLexador = lincones.lexador.mapear([sentencaInsercao]);
resultadoAvaliacaoSintatica = lincones.avaliadorSintatico.analisar(resultadoLexador);
resultadoTraducao = lincones.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);
console.log(resultadoTraducao);