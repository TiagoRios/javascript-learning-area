import { criarListaBolas } from './util.js';

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

const alturaTela = canvas.height = window.innerHeight;
const larguraTela = canvas.width = window.innerWidth;

const bolas = criarListaBolas(30, alturaTela, larguraTela, null, 5, 20);

/**
 * Depois de iniciada, a função chama a si mesma com o método requestAnimationFrame
 * fazendo atualizações subsequentes.
 * 
 * desenha a bola na tela
 * atualiza a posição/trajetoria 
 * verifica se as bolas se colidiram.
 */
function loop() {
   canvasContext.fillStyle = 'rgba(0, 0, 0, 0.25)';//fundo preto
   canvasContext.fillRect(0, 0, larguraTela, alturaTela);//preenche altura e largura
   // canvasContext.fillRect(50, 50, larguraCanvas, alturaCanvas);//preenche altura e largura

   for (const bola of bolas) {
      bola.desenharBola(canvasContext);
      bola.atualizarBola(alturaTela, larguraTela);
      bola.detectarColisao(bolas);
   }

   // Responsável pela animação dos quadros.
   requestAnimationFrame(loop); // executa indefinidamente.
}

loop();