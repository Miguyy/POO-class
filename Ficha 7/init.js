

let tasks = []

export function init() {

tasks = [{
    title: 'Escolha Tema',
    description: 'Escolher o tema da App',
    date: '2025-04-02T10:00:00',
    status: 'Done'
}, {
    title: 'Pesquisa',
    description: 'Pesquisar inspirações sobre o tema escolhido',
    date: '2025-04-03T19:00:00',
    status: 'Done'
}, {
    title: 'R. Funcionais',
    description: 'Definir os requisitos funcionais',
    date: '2025-04-03T08:00:00',
    status: 'InProgress'
}, {
    title: 'Mockups',
    description: 'Iniciar o desenho dos Mockups',
    date: '2025-04-12T15:00:00',
    status: 'InProgress'
}, {
    title: 'Prototipagem',
    description: 'Prototipagem da App em Figma',
    date: '2025-04-15T14:00:00',
    status: 'ToDoList'
}];

return tasks;

}

const form = document.getElementById("idForm")

function addGrid(nameValue, descriptionValue, yearValue, categoryValue) {

    let grid = document.querySelector(".grid")

    grid.innerHTML += `
    <div class="card">
        <h3>${nameValue}</h3>
        <p>${descriptionValue}</p>
        <p>${yearValue}</p>
        <p>${categoryValue}</p>
    </tr>`
}

form.addEventListener('submit', event => {

    event.preventDefault()

    const name = document.getElementById('txtActivity').value.trim()
    const description = document.getElementById('txtDescription').value.value.trim()
    const year = document.getElementById('txtData').value.trim()
    const category = document.getElementById('idStatus').value.value.trim()

    /* const dateInput = document.getElementById('txtData').value.value.trim()
    const date = new Date(dateInput)
    const now = new Date()

    if(date.getTime() < now.getTime() - 60000){
        alert("A data deve ser igual ou posterior à data actual")
        return
    }

    const duplicate = tasks.some(task =>
        task.name === name &&
        task.date.getTime() === date.getTime() &&
        tasks.category === category
    ) */

    /* if(duplicate){
        alert("Já existe uma tarefa com isso tudo")
        return
    } */

    const newForm = {name, description, year, category}

    tasks.push(newForm)
    console.log(tasks)

    addGrid(name, description, year, category)
   /*  renderTasks() */
    form.reset()

    filterTasks()
})



function filterTasks() {
    const category = document.getElementById('idStatus').value 
    const rows = document.querySelectorAll("grid.card") 

    rows.forEach(row => {
        const categoryText = row.children[3].innerText

        switch (category) {
            case "ToDoList":
                if (categoryText === "ToDoList") {
                    row.style.display = "grid-row" 
                } else {
                    row.style.display = "none"
                }
                break

            case "InProgress":
                if (categoryText === "InProgress") {
                    row.style.display = "grid-row" 
                } else {
                    row.style.display = "none"
                }
                break

            case "InReview":
                if (categoryText === "InReview") {
                    row.style.display = "grid-row" 
                } else {
                    row.style.display = "none"
                }
                break

            case "Done":
                if (categoryText === "Done") {
                    row.style.display = "grid-row" 
                } else {
                    row.style.display = "none"
                }
                break
        }
    })
}

function renderTasks(filteredStatus=null){
    grid.InnerHTML = ""
    filteredStatus.forEach(task => 
    {
        const card =document.createElement("div")
        card.className = "card"
    }
    )

    const isLate = task.date<new Date() && task.status !== "Done"

    switch (task.status){
        
    }
}



