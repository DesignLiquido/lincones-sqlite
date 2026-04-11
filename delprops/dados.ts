import { DefinicaoPropriedade } from '@designliquido/delprops';

/**
 * Propriedades de configuração para uma fonte de dados SQLite
 * (`liquido.dados.<nome>.*`).
 */
const dados: DefinicaoPropriedade[] = [
    {
        nome: 'tecnologia',
        tipo: 'texto',
        detalhe: 'Tecnologia de banco de dados.',
        valoresPermitidos: ['sqlite'],
    },
    {
        nome: 'caminho',
        tipo: 'texto',
        detalhe: "Caminho do arquivo de banco de dados. Use ':memory:' para um banco em memória.",
    },
];

export default dados;
