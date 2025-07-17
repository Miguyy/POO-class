document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('gameTable');
    const rollDiceButton = document.getElementById('rollDice');
    const movesDisplay = document.getElementById('moves');
    const diceDisplay = document.getElementById('dice');

    const numRows = 5;
    const numCols = 5;
    const numBlackholes = 2;

    let playerPosition = { row: 0, col: 0 };
    let moves = 0;

    // Criar tabela
    for (let i = 0; i < numRows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < numCols; j++) {
            row.insertCell();
        }
    }

    // Posicionar buracos negros
    for (let b = 0; b < numBlackholes; b++) {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * numRows);
            const col = Math.floor(Math.random() * numCols);
            const cell = table.rows[row].cells[col];
            if (!cell.classList.contains('blackhole')) {
                cell.classList.add('blackhole');
                placed = true;
            }
        }
    }

    // Posicionar célula final
    let placedGoal = false;
    while (!placedGoal) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        const cell = table.rows[row].cells[col];
        if (!cell.classList.contains('blackhole')) {
            cell.classList.add('goal');
            placedGoal = true;
        }
    }

    // Posicionar jogador na célula inicial
    table.rows[playerPosition.row].cells[playerPosition.col].classList.add('player');

    rollDiceButton.addEventListener("click", () => {
        const diceThrow = Math.floor(Math.random() * 6) + 1;
        diceDisplay.textContent = "Dado: " + diceThrow;
        moves++;
        movesDisplay.textContent = moves;

        movePlayer(diceThrow);
        validateCell(playerPosition.row, playerPosition.col);
        renderLeaderboard();
    });

    function movePlayer(steps) {
        // Remover jogador da posição atual
        table.rows[playerPosition.row].cells[playerPosition.col].classList.remove('player');

        // Calcular nova posição linear
        let linearPos = playerPosition.row * numCols + playerPosition.col + steps;
        if (linearPos >= numRows * numCols) linearPos = numRows * numCols - 1;

        // Converter para coordenadas
        const newRow = Math.floor(linearPos / numCols);
        const newCol = linearPos % numCols;

        playerPosition.row = newRow;
        playerPosition.col = newCol;

        // Adicionar classe player à nova posição
        table.rows[newRow].cells[newCol].classList.add('player');
    }

    function validateCell(row, col) {
        const cell = table.rows[row].cells[col];

        if (cell.classList.contains('blackhole')) {
            alert("Caiste num buraco negro! Recomeças no início.");
            // Remover player da posição atual
            cell.classList.remove('player');
            // Voltar ao início
            playerPosition = { row: 0, col: 0 };
            table.rows[0].cells[0].classList.add('player');
        } else if (cell.classList.contains('goal')) {
            alert("Parabéns! Chegaste ao fim.");

            const name = prompt("Insere o teu nome:");
            if (name) {
                const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
                if (!leaderboard[name] || leaderboard[name] > moves) {
                    leaderboard[name] = moves;
                    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
                }
            }
        }
    }

    function renderLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
        const sorted = Object.entries(leaderboard).sort((a, b) => a[1] - b[1]).slice(0, 3);

        let leaderboardTable = document.getElementById('leaderboardTable');
        if (!leaderboardTable) {
            leaderboardTable = document.createElement('table');
            leaderboardTable.id = 'leaderboardTable';
            document.body.appendChild(leaderboardTable);
        }

        leaderboardTable.innerHTML = '<tr><th>Nome</th><th>Jogadas</th></tr>';
        for (const [name, score] of sorted) {
            const row = leaderboardTable.insertRow();
            row.innerHTML = `<td>${name}</td><td>${score}</td>`;
        }
    }
});
