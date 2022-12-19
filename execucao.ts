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
            if (resultado.linhasRetornadas.length > 0) {
                console.table(resultado.linhasRetornadas);
            }
            
            if (resultado.linhasAfetadas) {
                console.log(`Linhas afetadas: ${resultado.linhasAfetadas}`);
            }

            if (resultado.ultimoId) {
                console.log(`ID retornado pela operação: ${resultado.ultimoId}`);
            }

            return Promise.resolve();
        }).then(() => {
            interfaceLeitura.prompt();
        }).catch((erro) => {
            console.error(erro);
        });
    });
});
