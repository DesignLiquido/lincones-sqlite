import * as leituraLinhas from 'readline';

import { LinconesSQLite } from "./fontes/lincones-sqlite";

const lincones = new LinconesSQLite();
lincones.clienteSQLite.abrir().then(() => {
    const interfaceLeitura = leituraLinhas.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\nlincones> ',
    });
    
    interfaceLeitura.prompt();
    interfaceLeitura.on('line', (linha: string) => {
        lincones.executar(linha).then(resultado => {
            console.table(resultado);
            return Promise.resolve();
        }).then(() => {
            interfaceLeitura.prompt();
        }).catch((erro) => {
            console.error(erro);
        });
    });
});
