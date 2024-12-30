// 1. Initialize Canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 2. Game Variables
const human = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 100,
    jump: false,
    velocityY: 0,
};
const gravity = 1;
const obstacles = [];

// 3. Functions

// Function to draw the human character
function drawHuman() {
    // Head
    ctx.beginPath();
    ctx.arc(human.x + 25, human.y - 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Body
    ctx.beginPath();
    ctx.moveTo(human.x + 25, human.y);
    ctx.lineTo(human.x + 25, human.y + 50);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Arms
    ctx.beginPath();
    ctx.moveTo(human.x + 25, human.y + 10);
    ctx.lineTo(human.x + 10, human.y + 20);
    ctx.moveTo(human.x + 25, human.y + 10);
    ctx.lineTo(human.x + 40, human.y + 20);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(human.x + 25, human.y + 50);
    ctx.lineTo(human.x + 15, human.y + 70);
    ctx.moveTo(human.x + 25, human.y + 50);
    ctx.lineTo(human.x + 35, human.y + 70);
    ctx.stroke();
}

// Function to update the human's position
function updateHuman() {
    if (human.jump) {
        human.velocityY = -15;
        human.jump = false;
    }
    human.velocityY += gravity;
    human.y += human.velocityY;

    if (human.y > canvas.height - 150) {
        human.y = canvas.height - 150;
        human.velocityY = 0;
    }
}

// Function to generate obstacles
function generateObstacle() {
    const width = 20;
    const height = 50;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - 150,
        width: width,
        height: height,
    });
}

// Function to draw obstacles
function drawObstacles() {
    ctx.fillStyle = 'brown';
    obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        obs.x -= 5; // Move left
    });
}

// Function to check collisions
function checkCollision() {
    obstacles.forEach((obs) => {
        if (
            human.x < obs.x + obs.width &&
            human.x + human.width > obs.x &&
            human.y < obs.y + obs.height &&
            human.y + human.height > obs.y
        ) {
            alert('Game Over!');
            location.reload();
        }
    });
}

// 4. Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHuman();
    updateHuman();
    drawObstacles();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

// 5. Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && human.y === canvas.height - 150) {
        human.jump = true;
    }
});

// 6. Start the Game
setInterval(generateObstacle, 2000);
gameLoop();