// Inicialización de variables
let sequence = [];
let playerSequence = [];
let score = 0;
let playerName = '';
let highScores = JSON.parse(localStorage.getItem('highScores')) || {};

// Colores disponibles para el juego
const colors = ['red', 'green', 'blue', 'yellow'];
// Referencias a elementos del DOM
const startButton = document.getElementById('startButton');
const gameDiv = document.getElementById('game');
const menuDiv = document.getElementById('Menu'); 
const currentScoreDisplay = document.getElementById('currentScore');
const restartButton = document.getElementById('restartButton');
const highScoresDisplay = document.getElementById('highScores');

// Referencias a elementos del DOM
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Función para iniciar el juego
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
// Función para iniciar la siguiente ronda
function nextRound() {
    playerSequence = [];
    score++;
    currentScoreDisplay.textContent = `Puntuación: ${score}`;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    console.log("Secuencia actual:", sequence); 
    playSequence();
}

// Función para reproducir la secuencia de colores
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

// Función para hacer parpadear un botón
function flashButton(color) {
    const button = document.querySelector(`.button.${color}`);
    if (button) {
        button.style.opacity = '5';
        setTimeout(() => {
            button.style.opacity = '0.6';
        }, 500);
    }
}

// Función para habilitar la entrada del jugador
function enablePlayerInput() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', handlePlayerClick);
    });
}

// Función para manejar el clic del jugador
function handlePlayerClick(event) {
    const color = event.target.dataset.color; // Obtener el color del botón
    playerSequence.push(color);
    flashButton(color);
    checkPlayerSequence();
}

// Función para verificar la secuencia ingresada por el jugador
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

// Función para guardar la puntuación más alta
function saveHighScore() {
    if (!highScores[playerName] || highScores[playerName] < score) {
        highScores[playerName] = score;
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores();
    }
}

// Función para mostrar las puntuaciones más altas en la interfaz
function displayHighScores() {
    highScoresDisplay.innerHTML = '';
    for (const player in highScores) {
        highScoresDisplay.innerHTML += `<p>${player}: ${highScores[player]}</p>`;
    }
}

// Función para mostrar las puntuaciones más altas en la interfaz
function resetGame() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.removeEventListener('click', handlePlayerClick);
    });
    gameDiv.classList.add('hidden');
    menuDiv.classList.remove('hidden');
    document.getElementById('playerName').value = '';
}

// Función para reiniciar el juego y las puntuaciones
function restartGame() {
    resetGame();
    highScores = {};
    localStorage.removeItem('highScores');
    highScoresDisplay.innerHTML = '';
    alert('El juego ha sido reiniciado.');
}