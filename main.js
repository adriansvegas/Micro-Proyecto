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
    document.getElementById('rules').classList.remove('hidden'); 
    score = 0;
    sequence = [];
    nextRound(); 
}

function nextRound() {
    playerSequence = [];
    score++;
    currentScoreDisplay.textContent = `Puntuación: ${score}`;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    console.log("Secuencia actual:", sequence); 
    playSequence();
}

function playSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            enablePlayerInput();
            return;
        }
        const color = sequence[index];
        flashButton(color);
        index++;
    }, 1000);
}

function flashButton(color) {
    const button = document.querySelector(`.button.${color}`);
    if (button) {
        button.style.opacity = '1';
        setTimeout(() => {
            button.style.opacity = '0.7';
        }, 500);
    }
}

function enablePlayerInput() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', handlePlayerClick);
    });
}

function handlePlayerClick(event) {
    const color = event.target.dataset.color; // Obtener el color del botón
    playerSequence.push(color);
    flashButton(color);
    checkPlayerSequence();
}

function checkPlayerSequence() {
    const currentIndex = playerSequence.length - 1;
    // Verificar si la última entrada del jugador es incorrecta
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        alert('¡Juego terminado! Tu puntuación fue: ' + score);
        saveHighScore();
        resetGame();
    } else if (playerSequence.length === sequence.length) {
        console.log('Secuencia completada correctamente!');
        // Si el jugador ha completado la secuencia correctamente
        setTimeout(nextRound, 1000); // Esperar un segundo antes de la siguiente ronda
    }
}

function saveHighScore() {
    if (!highScores[playerName] || highScores[playerName] < score) {
        highScores[playerName] = score;
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores();
    }
}

function displayHighScores() {
    highScoresDisplay.innerHTML = '';
    for (const player in highScores) {
        highScoresDisplay.innerHTML += `<p>${player}: ${highScores[player]}</p>`;
    }
}

function resetGame() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.removeEventListener('click', handlePlayerClick);
    });
    gameDiv.classList.add('hidden');
    menuDiv.classList.remove('hidden');
    document.getElementById('playerName').value = '';
}

function restartGame() {
    resetGame();
    highScores = {};
    localStorage.removeItem('highScores');
    highScoresDisplay.innerHTML = '';
    alert('El juego ha sido reiniciado.');
}