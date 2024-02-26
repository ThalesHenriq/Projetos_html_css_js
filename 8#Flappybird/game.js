const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
// vamos precisar do gamecontainer para torná-lo embaçado
//quando exibimos o menu final

const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'assets/spaceboy.png';

//Game constants
const FLAP_SPEED = -3; //Melhora a fluidez e precisão da ave ao se mover pela tela
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// spaceboy variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// Pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200;

// score and highscore variables
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

// adicionamos uma variável bool, para que possamos verificar quando flappy passa nós aumentamos
//o valor
let scored = false;

// nos permite controlar o spaceboy com a chave de espaço
document.body.onkeyup = function(e) {
    if (e.code == 'Space') {
        birdVelocity = FLAP_SPEED;
    }
}

// nos permite reiniciar o jogo se acertarmos o game-over
document.getElementById('restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
    loop();
})



function increaseScore() {
    // aumentar agora o nosso contador quando o nosso flappy passa os canos
    if(birdX > pipeX + PIPE_WIDTH && 
        (birdY < pipeY + PIPE_GAP || 
          birdY + BIRD_HEIGHT > pipeY + PIPE_GAP) && 
          !scored) {
        score++;
        scoreDiv.innerHTML = score;
        scored = true;
    }

    // redefinir a bandeira, se passar os tubos
    if (birdX < pipeX + PIPE_WIDTH) {
        scored = false;
    }
}

function collisionCheck() {
    // Criar caixas delimitadoras e os tubos

    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY
    }

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP
    }

    // Verifique se há colisão com a caixa de tubulação de cima
    if (birdBox.x + birdBox.width > topPipeBox.x &&
        birdBox.x < topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y) {
            return true;
    }

    // Verifique se há colisão com a caixa de tubulação de baixo
    if (birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y) {
            return true;
    }

    // verifica de atingimos o limite
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }


    return false;
}

function hideEndMenu () {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

function showEndMenu () {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    //Desta forma, atualizamos sempre o nosso highscore no final do nosso jogo
    //se tivermos uma pontuação alta maior do que a anterior
    if (highScore < score) {
        highScore = score;
    }
    document.getElementById('best-score').innerHTML = highScore;
}

//redefinimos os valores para o início novamente 

function resetGame() {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;

    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
}

function endGame() {
    showEndMenu();
}

function loop() {
    // Redefinir o CTX após cada iteração de loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(flappyImg, birdX, birdY);

 
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -50, PIPE_WIDTH, pipeY); // melhora a precisão da coluna superior contra colisão
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    //agora precisaríamos adicionar uma verificação de colisão para exibir nosso menu final
    //e terminar o jogo
    //a colisãoCheck nos retornará verdadeiro se tivermos uma colisão
    //caso contrário, falso
    if (collisionCheck()) {
        endGame();
        return;
    }


    // movimento dos canos
    pipeX -= 1.5;
    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }

    // gravidade 
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

   
    increaseScore()//Sempre verifique se você chama a função
    requestAnimationFrame(loop);
}

loop();