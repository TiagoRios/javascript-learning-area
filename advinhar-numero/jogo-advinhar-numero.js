const guesses = document.querySelector('.guesses');
const lowOrHi = document.querySelector('.lowOrHi');
const lastResult = document.querySelector('.lastResult');
const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');

let guessCount = 1;
let resetButton;
let randomNumber = Math.floor(Math.random() * 100) + 1;

window.onload = function () {
  guessSubmit.addEventListener('click', checkGuess);
}

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Palpites anteriores: ';
  }

  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Parabéns! Você está certo!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!FIM DE JOGO - OTÁRIO!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Errado!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Último palpite BAIXO!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Último palpite ALTO!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Iniciar novo jogo';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

function escreveTexto() {
  return "meu texto";
}

module.exports = {
  resetGame,
  checkGuess,
  setGameOver,
  guessSubmit,
  escreveTexto,
}