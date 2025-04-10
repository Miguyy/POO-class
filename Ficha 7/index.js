const form = document.getElementById("idForm")

function addGrid(nameValue, descriptionValue, yearValue, categoryValue) {

    let grid = document.querySelector(".grid")
    //Adiciona uma nova linha com os valores recebidos pelo utilizador
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

    const name = document.getElementById('txtActivity').value
    const description = document.getElementById('txtDescription').value
    const year = document.getElementById('txtData').value
    const category = document.getElementById('idStatus').value


    const newForm = {name, description, year, category}

    tasks.push(newForm)
    console.log(tasks)

    addGrid(name, description, year, category)

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



