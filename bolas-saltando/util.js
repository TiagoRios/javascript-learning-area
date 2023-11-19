import Bola from './Bola.js';

/**
 * Função que cria um numero aleatório;
 * 
 * @param {number} min O limite inferior (incluído)
 * @param {number} max O limite superior NÂO incluso.
 * 
 * @returns {number} O número aleatório entre min e max. 
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gera um valor de cor RGB aleatória.
 * 
 * @returns Uma cor RGB aleatória.
 */
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

/**
 * Cria uma lista de bolas com uma quantidade fornecida.
 * 
 * @param {number} quantidadeBolas A quantidade de bolas na tela.
 * @param {number} alturaTela A altura da tela.
 * @param {number} larguraTela A largura da tela.
 * @param {number?} velocidadeBola A velocidade da bola. opcional 
 * @param {number?} menorTamanhoBola O tamanho da MENOR bola. opcional
 * @param {number?} maiorTamanhoBola O tamanho da MAIOR bola. opcional
 * 
 * @returns Bola[] um lista preenchida com a quantidade de bolas. 
 */
function criarListaBolas(quantidadeBolas, alturaTela, larguraTela, velocidadeBola, menorTamanhoBola, maiorTamanhoBola) {
    const bolas = [];

    while (bolas.length < quantidadeBolas) {
        const tamanhoBola = random(
            menorTamanhoBola || 10,
            maiorTamanhoBola || 30);

        let vel = velocidadeBola || 4;

        const bola = new Bola(
            // ball position always drawn at least one ball width
            // away from the edge of the canvas, to avoid drawing errors
            random(0 + tamanhoBola, larguraTela - tamanhoBola), // direção eixo X
            random(0 + tamanhoBola, alturaTela - tamanhoBola), // direção eixo Y, nao pode ser o mesmo que x - sobrepoe
            random(-(vel), vel), //velocidade eixo X
            random(-(vel), vel), //velocidade eixe Y
            randomRGB(), // cor aleatória.
            tamanhoBola
        );

        bolas.push(bola);
    }

    return bolas;
}

export {
    random,
    randomRGB,
    criarListaBolas,
}
