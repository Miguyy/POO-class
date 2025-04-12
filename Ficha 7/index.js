let tasks = []

const form = document.getElementById("idForm")
const grid = document.getElementById("grid")
const statusSelect = document.getElementById("idStatus")

function addGrid(nameValue, descriptionValue, dateValue, categoryValue) {

    const card = document.createElement('div')
    card.className = "card mt-2 p-2 border shadow-sm"
    
    let statusColor;
    switch (categoryValue) {
        case "ToDoList":
            statusColor = "yellow";
            break;
        case "InProgress":
            statusColor = "blue";
            break;
        case "InReview":
            statusColor = "orange";
            break;
        case "Done":
            statusColor = "green";
            break;
        default:
            statusColor = "gray";
    }

    const dateObj = new Date(dateValue)
    const now = new Date()
    if (dateObj < now && categoryValue !== "Done") {
        statusColor = "red"
    }

    card.style.backgroundColor = statusColor

    card.innerHTML = `
        <h3>${nameValue}</h3>
        <button class="remove-btn" onclick="removeLine(this)">X</button>
        <p>${descriptionValue}</p>
        <p>${new Date(dateValue).toLocaleString()}</p>
        <p>${categoryValue}</p>
    `;

    grid.appendChild(card);
}

function removeLine(button) {
    const card = button.parentElement
    const date = card.querySelector('p:nth-of-type(2)').innerText

    tasks = tasks.filter(task => new Date(task.date).toLocaleString() !== new Date(date).toLocaleString())

    localStorage.setItem("tasks", JSON.stringify(tasks))

    card.remove()

    renderTasks()
    filterTasks()
    ordernarData()
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const name = document.getElementById('txtActivity').value.trim()
    const description = document.getElementById('txtDescription').value.trim()
    const date = document.getElementById('txtData').value
    const category = statusSelect.value

    //DATA
    const dateObj = new Date(date)
    const now = new Date()
    if (dateObj.getTime() < now.getTime()) {
        alert("A data deve ser igual ou posterior à data atual.")
        return
    }

    const duplicate = tasks.some(task =>
        task.name === name &&
        task.description === description &&
        task.date === date &&
        task.category === category
    )

    if (duplicate) {
        alert("Essa tarefa já existe!")
        return
    }

    const newTask = { name, description, date, category }
    tasks.push(newTask)
    console.log("Tarefas:", tasks)

    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks()
    filterTasks()
})

statusSelect.addEventListener("change", () => {
    filterTasks()
    ordernarData()
})

function filterTasks() {
    const categoryFilter = statusSelect.value
    const cards = document.querySelectorAll("#grid .card")

    cards.forEach(card => {
        const cardCategory = card.children[3].innerText

        if (categoryFilter === "Select an option" || categoryFilter === cardCategory) {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
}

function renderTasks(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = savedTasks

    grid.innerHTML = ""

    tasks.forEach(task => {
        addGrid(task.name, task.description, task.date, task.category)
    })
}

window.addEventListener('DOMContentLoaded', () => {
    renderTasks()
    filterTasks()
    ordernarData()
})

function ordernarData(){ //1º Percorrer todos os cards, 2º Inserção de variáveis a e b para averiguar qual apresenta a maior data, 3º Renderizar cards
    const cards = Array.from(grid.querySelectorAll(".card"))

    const sortedCards = cards.sort((a, b) => {
        const dateA = new Date(a.children[2].innerText)
        const dateB = new Date(b.children[2].innerText)
        return dateA - dateB 
    })

    grid.innerHTML = ""

    sortedCards.forEach(card => grid.appendChild(card))
}
