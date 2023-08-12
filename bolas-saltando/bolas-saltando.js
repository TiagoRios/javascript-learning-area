//utiliza a API canvas e animation.

// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const largura = canvas.width = window.innerWidth;
const altura = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Bola {

   constructor(coordenadaEixoX, coordenadaEixoY, velocidadeX, velocidadeY, color, size) {
      this.eixoX = coordenadaEixoX;
      this.eixoyY = coordenadaEixoY;
      this.velocidadeX = velocidadeX;
      this.velocidadeY = velocidadeY;
      this.color = color;
      this.size = size;
   }

   desenharBola() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.eixoX, this.eixoyY, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   atualizarBola() {
      if ((this.eixoX + this.size) >= largura) {
         this.velocidadeX = -(this.velocidadeX);
      }

      if ((this.eixoX - this.size) <= 0) {
         this.velocidadeX = -(this.velocidadeX);
      }

      if ((this.eixoyY + this.size) >= altura) {
         this.velocidadeY = -(this.velocidadeY);
      }

      if ((this.eixoyY - this.size) <= 0) {
         this.velocidadeY = -(this.velocidadeY);
      }

      this.eixoX += this.velocidadeX;
      this.eixoyY += this.velocidadeY;
   }

   detectarColisao() {
      for (const bola of bolas) {
         if (this !== bola) {
            const distanciaX = this.eixoX - bola.eixoX;
            const distanciaY = this.eixoY - bola.eixoY;
            const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

            if (distancia < this.size + bola.size) {
              bola.color = this.color = randomRGB();
            }
         }
      }
   }
}

const bolas = [];

while (bolas.length < 30) {
   const tamanho = random(10,30);
   const bola = new Bola(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + tamanho, largura - tamanho), //direcao eixo X
      random(0 + tamanho, altura - tamanho), //nao pode ser o mesmo que x - sobrepoe
      random(-3, 3), //velocidade eixo X
      random(-3, 3), 
      randomRGB(),
      tamanho 
   );

  bolas.push(bola);
}

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';//fundo preto
   //ctx.fillRect(0, 0, largura, altura);//preenche altura e largura
   ctx.fillRect(50, 50, largura, altura);//preenche altura e largura

   for (const bola of bolas) {
     bola.desenharBola();
     bola.atualizarBola();
     bola.detectarColisao();
   }

   requestAnimationFrame(loop);
}

loop()