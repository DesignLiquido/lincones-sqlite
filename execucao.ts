import * as leituraLinhas from 'readline';

import { LinconesSQLite } from "./fontes/lincones-sqlite";

const lincones = new LinconesSQLite();

const interfaceLeitura = leituraLinhas.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\nlincones> ',
});

interfaceLeitura.prompt();
interfaceLeitura.on('line', (linha: string) => {
    const resultado = lincones.executar(linha);
    console.log(resultado)

    interfaceLeitura.prompt();
});
