//Array para guardar todos os registos feitos
let registo = []

//Selecciona o form
const form = document.getElementById("form-registo")
const grid = document.getElementById("grid")

//Função para adicionar os inputs do utilizador à tabela
function addTable(valorTitulo, valorCategoria, valorPrioridade, valorData){
    let table = document.querySelector("#tabela-registos")
    //Adiciona uma nova linha com os valores recebidos pelo utilizador
    table.innerHTML += `
    <tr class="dados">
        <td>${valorTitulo}</td>
        <td>${valorCategoria}</td>
        <td>${valorPrioridade}</td>
        <td>${new Date (valorData).toLocaleString()}</td>
        <td><button onclick="detalhesLinhas(this)">Detalhes</button></td>
        <td><button onclick="editarLinha(this)">Editar</button></td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    </tr>`
}

//Função para adicionar os inputs do utilizador ao card
function addGrid(valorTitulo, valorCategoria, valorPrioridade, valorData) {

    const card = document.createElement('div')
    card.className = "card"
    
    let statusColor;
    switch (valorPrioridade) {
        case "Alta":
            statusColor = "yellow";
            break;
        case "Média":
            statusColor = "blue";
            break;
        case "Baixa":
            statusColor = "green";
            break;
        default:
            statusColor = "gray";
    }

    const objData = new Date(valorData)
    const agora = new Date()
    if (objData < agora && valorCategoria !== "Baixa") {
        statusColor = "red"
    }

    card.style.backgroundColor = statusColor

    card.innerHTML = `
        <div class="card-header">
            <h3>${valorTitulo}</h3>
            <button onclick="removerCard(this)">X</button>
        </div>
        <p>${valorCategoria}</p>
        <p>${valorPrioridade}</p>
        <p>${new Date(valorData).toLocaleString()}</p>`

    grid.appendChild(card);
}


//Evento submeter do form
form.addEventListener('submit', event => {

    event.preventDefault()

    const titulo = document.getElementById('titulo').value.trim()
    const categoria = document.getElementById('categoria').value.trim()
    const prioridade = document.getElementById('prioridade').value.trim()

    //DATA
    const data = document.getElementById('data').value
    const objData = new Date(data)
    const agora = new Date()
    if (objData.getTime() < agora.getTime()) {
        alert("A data deve ser igual ou posterior à data atual.")
        return
    }

    const novoForm = {titulo, categoria, prioridade, data}

    registo.push(novoForm)
    console.log(registo)

    addTable(titulo, categoria, prioridade, data)
    addGrid(titulo, categoria, prioridade, data)


    form.reset()

    localStorage.setItem("registos", JSON.stringify(registo))
})

//Função de obter detalhes
function detalhesLinhas(botao){ //1º - selecionar a linha; 2º - selecionar os campos ; 3º mostrar os campos

    const linha = botao.parentElement.parentElement
    const titulo = linha.children[0].innerText
    const categoria = linha.children[1].innerText
    const prioridade = linha.children[2].innerText
    const data = linha.children[3].innerText

    alert(`\n Titulo: ${titulo}\n Categoria: ${categoria}\n Prioridade: ${prioridade}\n Data: ${data}`)
}

//Função de editar linha 
function editarLinha(botao){ //1º refresh ao form; 2º - selecionar a linha; 3º - selecionar os campos ; 4º editar campos; 5º enviar novamente

    form.reset()

    const linha = botao.parentElement.parentElement
    const titulo = linha.children[0].innerText
    const categoria = linha.children[1].innerText
    const prioridade = linha.children[2].innerText
    const data = linha.children[3].innerText

    document.getElementById('titulo').value = titulo
    document.getElementById('categoria').value = categoria
    document.getElementById('prioridade').value = prioridade
    document.getElementById('data').value = data
    removerLinha(botao)
}

//Função de remover linha e local storage
function removerLinha(botao) {
    const linha = botao.closest('tr') 
    const index = Array.from(linha.parentElement.children).indexOf(linha)

    linha.remove()

    registo.splice(index, 1)

    localStorage.setItem("registos", JSON.stringify(registo))
}

//Função de remover card e local storage
function removerCard(botao) {
    const card = botao.closest('.card') 
    card.remove()

    localStorage.setItem("tasks", JSON.stringify(registo))
}
 
//Botão de filtrar
document.getElementById("botaoFiltrar").addEventListener("click", event => {
    event.preventDefault()
    filtrarPrioridade()
})

//Função de filtrar a prioridade
function filtrarPrioridade() {
    const filtro = document.getElementById('filtro-prioridade').value 
    const linhas = document.querySelectorAll("tr.dados") 

    linhas.forEach(linha => {

        const prioridadeTxt = linha.children[2].innerText

        switch (filtro) {
            case "Todas":
                linha.style.display = "table-row" 
                break

            case "Alta":
                if (prioridadeTxt === "Alta") {
                    linha.style.display = "table-row" 
                } else {
                    linha.style.display = "none"
                }
                break

            case "Média":
                if (prioridadeTxt === "Média")  {
                    linha.style.display = "table-row" 
                } else {
                    linha.style.display = "none"
                }
                break

            case "Baixa":
                if (prioridadeTxt === "Baixa")  {
                    linha.style.display = "table-row"
                } else {
                    linha.style.display = "none"
                }
                break
        }
    })

    const cards = document.querySelectorAll(".card")

    cards.forEach(card => {
        const prioridadeCard = card.querySelector("p:nth-of-type(2)").innerText 

        if (filtro === "Todas" || prioridadeCard === filtro) {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
}

//Evento de ordernação crescente
document.getElementById('ordenarCrescente').addEventListener('click', event => {
    event.preventDefault()
    ordernarCrescente()
})

//Evento de ordernação decrescente
document.getElementById('ordenarDecrescente').addEventListener('click', event => {
    event.preventDefault()
    ordernarDecrescente()
})

//Função ordenar crescente
function ordernarCrescente(){ //1º buscar a linha; 2º selecionar a linha a e b; 3º comparar as linhas; 4º ordernar; 5º adicionar a nova linha
    const tabela = document.querySelector("#tabela-registos")
    const linhas = [...tabela.querySelectorAll("tr.dados")]

    linhas.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText))

    linhas.forEach(linha => tabela.appendChild(linha))
}

//Função ordenar decrescente
function ordernarDecrescente(){  //1º buscar a linha; 2º selecionar a linha a e b; 3º comparar as linhas; 4º ordernar; 5º adicionar a nova linha
    const tabela = document.querySelector("#tabela-registos")
    const linhas = [...tabela.querySelectorAll("tr.dados")]

    linhas.sort((a, b) => b.cells[0].innerText.localeCompare(a.cells[0].innerText))

    linhas.forEach(linha => tabela.appendChild(linha))
}

//Local Storage - F5
window.addEventListener('DOMContentLoaded', () => {
    let registos = JSON.parse(localStorage.getItem("registos")|| "[]")

    if (registos.length > 0) {
        registo = registos 
        registos.forEach(registoAdd => {
            addTable(registoAdd.titulo, registoAdd.categoria, registoAdd.prioridade, registoAdd.data)
            addGrid(registoAdd.titulo, registoAdd.categoria, registoAdd.prioridade, registoAdd.data)
        })
    }
})

//Evento de keys
window.addEventListener('keydown', event =>{
    if (event.key === 'C' || event.key === 'c') {
        ordernarCrescente()
        console.log(`A tecla premida foi: ${event.key} `)
    }
    if (event.key === 'D' || event.key === 'd') {
        ordernarDecrescente()
        console.log(`A tecla premida foi: ${event.key} `)
    }
})


