const score = JSON.parse (localStorage.getItem ('score')) || {wins: 0, losses: 0, ties: 0};
document.querySelector ('.js-score').innerHTML = `Wins : ${score.wins},  Losses : ${score.losses},  Ties : ${score.ties}`;

function pickComputerMove () {

  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber < 1/3) {
    computerMove = 'ROCK';
  } else if (randomNumber < 2/3) {
    computerMove = 'PAPER';
  } else {
    computerMove = 'SCISSOR';
  }

  return computerMove;
}

function playGame (playerMove) {

  let result = '';
  const computerMove = pickComputerMove();

  if (playerMove === 'ROCK') {

    if (computerMove === 'ROCK') {
      result = 'TIE';
      document.querySelector ('.js-moves').innerHTML = `YOU <img src="/Images/ROCK-emoji.png" class="move-icon"> <img src="/Ismages/ROCK-emoji.png" class="move-icon">Computer`;
    } else if (computerMove === 'PAPER') {
      result = 'YOU LOSE';
    } else {
      result = 'YOU WIN';
    }

  } else if (playerMove === 'PAPER') {

    if (computerMove === 'ROCK') {
      result = 'YOU WIN';
    } else if (computerMove === 'PAPER') {
      result = 'TIE';
    } else {
      result = 'YOU LOSE';
    }

  } else {

    if (computerMove === 'ROCK') {
      result = 'YOU LOSE';
    } else if (computerMove === 'PAPER') {
      result = 'YOU WIN';
    } else {
      result = 'TIE';
    }

  }

  if (result === 'YOU WIN') {
    score.wins += 1;
  } else if (result === 'YOU LOSE') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem ('score', JSON.stringify(score));
  document.querySelector ('.js-score').innerHTML = `Wins : ${score.wins},  Losses : ${score.losses},  Ties : ${score.ties}`;
  document.querySelector ('.js-result').innerHTML = result;
  document.querySelector ('.js-moves').innerHTML = `YOU <img src="/Images/${playerMove}-emoji.png" class="move-icon"> <img src="/Ismages/${computerMove}-emoji.png" class="move-icon">Computer`;

  return;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay () {

  if (!isAutoPlaying) {
    intervalId = setInterval (function () {
      const playerMove = pickComputerMove ();
      playGame (playerMove);
    }, 1000);

    document.querySelector('.autoplay-button').innerHTML = 'STOP';
    isAutoPlaying = true;

  } else {
    clearInterval (intervalId);
    document.querySelector('.autoplay-button').innerHTML = 'AUTO PLAY';
    isAutoPlaying = false;
  }
  
}

//onClick events
document.querySelector('.rock-button').addEventListener('click', () => playGame('ROCK'));
document.querySelector('.paper-button').addEventListener('click', () => playGame('PAPER'));
document.querySelector('.scissor-button').addEventListener('click', () => playGame('SCISSOR'));

document.querySelector('.reset-button').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem ('score');
  document.querySelector ('.js-score').innerHTML = 'Wins : 0,  Losses : 0,  Ties : 0';
});

document.querySelector('.autoplay-button').addEventListener('click', () => autoPlay());

//keydown event
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'R' || event.key === 'r') {
    playGame ('ROCK');
  } else if (event.key === 'P' || event.key === 'p') {
    playGame ('PAPER');
  } else if (event.key === 'S' || event.key === 's') {
    playGame ('SCISSOR');
  }
})
