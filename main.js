let sequence = [];
let playerSequence = [];
let score = 0;
let playerName = '';
let highScores = JSON.parse(localStorage.getItem('highScores')) || {};

const colors = ['red', 'green', 'blue', 'yellow'];
const startButton = document.getElementById('startButton');
const gameDiv = document.getElementById('game');
const menuDiv = document.getElementById('Menu'); 
const currentScoreDisplay = document.getElementById('currentScore');
const restartButton = document.getElementById('restartButton');
const highScoresDisplay = document.getElementById('highScores');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    playerName = document.getElementById('playerName').value; 
    if (!playerName) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }
    menuDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    score = 0;
    sequence = [];
    nextRound();
}

