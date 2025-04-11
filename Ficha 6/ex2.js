let clickCount = 0;
let firstEgg = null;
let secondEgg = null;
let eggsFound = 0;
let gameOver = false; // Variável para controlar o fim do jogo

// Função para sortear os ovos
function sortearOvos() {
    const totalCells = 12;
    const randomIndex1 = Math.floor(Math.random() * totalCells);
    let randomIndex2 = Math.floor(Math.random() * totalCells);
    
    // Garantir que os dois índices sejam diferentes
    while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * totalCells);
    }

    return [randomIndex1, randomIndex2];
}

// Função para exibir os ovos
function mostrarOvo(index) {
    const tableCells = document.querySelectorAll('#tabelaOvos td');
    tableCells[index].innerHTML = `<img src="./Images/Ovo.png" alt="Ovo de Páscoa">`;

    setTimeout(() => {
        tableCells[index].innerHTML = `<img src="./Images/DiscoverEggs.png" alt="DiscoverEggs">`;
    }, 2000);
}

// Adicionar o evento mouseover e mouseout
function addHighlightEvent(cell) {
    cell.addEventListener('mouseover', () => {
        cell.classList.add('highlight');
    });

    cell.addEventListener('mouseout', () => {
        cell.classList.remove('highlight');
    });
}

// Função principal de jogo
function iniciarJogo() {
    const [egg1, egg2] = sortearOvos();
    const tableCells = document.querySelectorAll('#tabelaOvos td');

    // Exibir a imagem do ovo ao clicar
    tableCells.forEach((cell, index) => {
        addHighlightEvent(cell);

        cell.addEventListener('click', () => {
            if (gameOver) return; // Se o jogo já acabou, não fazer mais nada

            clickCount++;
            document.getElementById('clickCount').textContent = `Número de cliques: ${clickCount}`;

            if (index === egg1 || index === egg2) {
                mostrarOvo(index);

                if (!firstEgg) {
                    firstEgg = index;
                } else if (!secondEgg && firstEgg !== index) {
                    secondEgg = index;

                    // Verificar se os ovos foram encontrados corretamente
                    if ((firstEgg === egg1 && secondEgg === egg2) || (firstEgg === egg2 && secondEgg === egg1)) {
                        eggsFound++;
                        document.getElementById('message').textContent = 'Parabéns, encontraste os Ovos de Páscoa!';
                        gameOver = true; // Finaliza o jogo
                    }
                }
            }
        });
    });
}

// Inicializa o jogo
iniciarJogo();
