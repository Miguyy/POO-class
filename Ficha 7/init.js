

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


/* function renderTasks(filteredStatus=null){
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
} */



