import { randomRGB } from './util.js';

/**
 * Classe que representa uma bola.
 */
export default class Bola {

    constructor(eixoX, eixoY, velocidadeX, velocidadeY, cor, tamanho) {
        this.eixoX = eixoX;
        this.eixoY = eixoY;

        this.velocidadeX = velocidadeX;
        this.velocidadeY = velocidadeY;

        this.cor = cor;
        this.tamanho = tamanho;
    }

    /**
     * Desenha um circulo preenchido com a cor definida na criação da bola.
     * 
     * @param {*} contexto O contexto onde será criado o desenho da bola
     * 
     * @returns void 
     */
    desenharBola(contexto) {
        contexto.beginPath();
        contexto.fillStyle = this.cor; // define cor da bola
        // Cria um circulo.
        contexto.arc(this.eixoX, this.eixoY, this.tamanho, 0, 2 * Math.PI);
        contexto.fill(); // Preenche o canvas com o circulo.
    }

    /**
     * Atualiza a direção da bola quando ela chega na borda do canvas.
     * 
     * Direção direita, enconsta na borda, muda a direção para esquerda.
     * O mesmo para as demais direções.
     * 
     * @param {number} altura altura da tela.
     * @param {number} largura largura da tela.
     * 
     * @returns void
     */
    atualizarBola(altura, largura) {
        // A bola chegou em alguma borda/limite do canvas?

        // Inverte a direção da bola. Para a esquerda. 
        if ((this.eixoX + this.tamanho) >= largura) {
            this.velocidadeX = -(this.velocidadeX);
        }

        // Inverte a direção da bola. Para a direita. 
        if ((this.eixoX - this.tamanho) <= 0) {
            this.velocidadeX = -(this.velocidadeX);
        }

        // Inverte a direção da bola. Para a baixo. 
        if ((this.eixoY + this.tamanho) >= altura) {
            this.velocidadeY = -(this.velocidadeY);
        }

        // Inverte a direção da bola. Para a cima. 
        if ((this.eixoY - this.tamanho) <= 0) {
            this.velocidadeY = -(this.velocidadeY);
        }

        // localização da bola atualizada.
        this.eixoX += this.velocidadeX;
        this.eixoY += this.velocidadeY;
    }

    /**
     * Muda a cor da bola caso ela colida com outra bola.
     * 
     * @param {Bola[]} bolas A lista de bolas para verificar a colisão
     * 
     * @returns void 
     */
    detectarColisao(bolas) {
        for (const bola of bolas) {
            if (!(this === bola)) { // Muda a cor somente da bola que colidiu
                const distanciaX = this.eixoX - bola.eixoX;
                const distanciaY = this.eixoY - bola.eixoY;
                const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

                if (distancia < this.tamanho + bola.tamanho) {
                    bola.cor = this.cor = randomRGB();
                }
            }
        }
    }
}