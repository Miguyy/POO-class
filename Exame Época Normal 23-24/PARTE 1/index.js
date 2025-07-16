

document.addEventListener('DOMContentLoaded', () => {
    // Resolução alinea a)
    const cells = document.querySelectorAll("#table1 td")

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const randomNumber = Math.floor(Math.random() * 9) + 1
            cell.innerHTML = randomNumber
        })
    })

    // Resolução alinea b)
    const modal = document.getElementById("modal")
    const closeModalButton = document.getElementById("closeModal")
    const clickCountDisplay = document.getElementById("clickCount")
    let clickCount = 0

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            clickCount++
            const cellValue = parseInt(cell.innerHTML)
            if (!isNaN(cellValue)) {
                const totalSum = Array.from(cells).reduce((sum, c) => sum + (parseInt(c.innerHTML) || 0), 0)
                if (totalSum >= 35) {
                    cells.forEach(c => c.style.backgroundColor = "cyan")
                    clickCountDisplay.textContent = `Número de cliques: ${clickCount}`
                    modal.style.display = "block"
                }
            }
        })
    })

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"
    })

    // Resolução alinea c)
    const restartBtn = document.getElementById("btnInicio")

    restartBtn.addEventListener("click", () =>{

         cells.forEach(cell => {
        cell.innerHTML = "0"
        cell.style.backgroundColor = "" 
    })

    modal.style.display = "none"

    clickCount = 0
    })

})











