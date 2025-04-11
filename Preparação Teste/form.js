//Seleciona e guarda os valores
let info=[]

//Selecciona o form
const form = document.getElementById("form")

//Adiciona um evento ao form, após a inserção de dados fornecidos pelo utilizador
function addtable(valorNome, valorIdade, valorAltura, valorPeso, valorIMC, valorTotal) {

    let table = document.querySelector("#tabela")
    //Adiciona uma nova linha com os valores recebidos pelo utilizador
    table.innerHTML += `
    <tr class="data">
        <td>${valorNome}</td>
        <td>${valorIdade}</td>
        <td>${valorAltura}</td>
        <td>${valorPeso}</td>
        <td>${valorIMC}</td>
        <td>${valorTotal}</td>
        <td><button onclick="detalhesLinhas(this)">Detalhes</button></td>
        <td><button onclick="editarLinha(this)">Editar</button></td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
    </tr>`
}

//Evento calcular IMC
document.getElementById('botaoCalcIMC').addEventListener('click', event => {

    event.preventDefault()
    
    const altura = +document.getElementById('altura').value
    const peso = +document.getElementById('peso').value
    alturaMetros=altura/100

    const { imc, categoriaIMC } = calcIMC(peso, alturaMetros)
    valorIMC = imc.toFixed(2)
    valorCategoria = categoriaIMC

    // Mostrar no input de resultado
    document.getElementById("resultadoIMC").value = `${valorIMC} - ${valorCategoria}`
    
})

//Evento calcular total
document.getElementById('botaoCalcTotal').addEventListener('click', event => {

    event.preventDefault()
    
    const idade = +document.getElementById('idade').value
    const altura = +document.getElementById('altura').value
    const peso = +document.getElementById('peso').value


    const { total } = calcTotal(idade, altura, peso)
    valorTotal = total.toFixed(2)

    // Mostrar no input de resultado
    document.getElementById("resultadoTotal").value = `${total} `
})

document.getElementById("botaoFiltrar").addEventListener("click", event => {
    event.preventDefault()
    filtrarIMC()
})


//Evento crescente
document.getElementById('ordenarCrescente').addEventListener('click', event => {

    event.preventDefault()
    ordernarCrescente()
})

//Evento decrescente
document.getElementById('ordenarDecrescente').addEventListener('click', event => {

    event.preventDefault()
    ordernarDecrescente()
})

//Evento guardar dados
document.getElementById('guardarDados').addEventListener('click', event => {
    event.preventDefault()
    localStorage.setItem("infos", JSON.stringify(info))
    console.log("Dados guardados.")
})

//Evento obter dados
document.getElementById('obterDados').addEventListener('click', event => {
    event.preventDefault()
    let infos = JSON.parse(localStorage.getItem("infos"))
    document.querySelectorAll("tr.data").forEach(row => row.remove())
    infos.forEach(pessoa => {
        addtable(pessoa.nome, pessoa.idade, pessoa.altura, pessoa.peso, pessoa.imc, pessoa.total)
    })
})

//Evento submeter do form
form.addEventListener('submit', event => {

    event.preventDefault()

    const nome = document.getElementById('nome').value
    const idade = +document.getElementById('idade').value
    const altura = +document.getElementById('altura').value
    const peso = +document.getElementById('peso').value
    const imc = document.getElementById('resultadoIMC').value
    const total = document.getElementById('resultadoTotal').value

    const novoForm = {nome, idade, altura, peso, imc, total}

    info.push(novoForm)
    console.log(info)

    addtable(nome, idade, altura, peso, imc, total)

    form.reset()
})

//Função calcular IMC
function calcIMC(peso, altura){
    
    const imc= peso/(altura*altura)
    categoriaIMC=" "

    if (imc<18.5){
        categoriaIMC="Magro"
    }
    else if (imc >= 18.5 && imc <= 30){
        categoriaIMC="Normal"
    }
    else if (imc >= 30){
        categoriaIMC="Obesidade"
    }

    return {imc, categoriaIMC} 
}

//Função calculcar tudo
function calcTotal(idade, altura, peso){
    total=0
    total = idade + altura + peso
    return {total}
} 

function removerLinha(botao) {
    botao.parentElement.parentElement.remove()
} 

function detalhesLinhas(botao){ //1º - selecionar a linha; 2º - selecionar os campos ; 3º mostrar os campos

    const linha = botao.parentElement.parentElement
    const nome = linha.children[0].innerText
    const idade = linha.children[1].innerText
    const altura = linha.children[2].innerText
    const peso = linha.children[3].innerText
    const imc = linha.children[4].innerText
    const total = linha.children[5].innerText

    alert(`Nome: ${nome}\n Idade: ${idade}\n Altura: ${altura}\n Peso: ${peso}\n IMC: ${imc}\n Total: ${total}`)
}

function editarLinha(botao){ //1º refresh ao form; 2º - selecionar a linha; 3º - selecionar os campos ; 4º editar campos; 5º enviar novamente

    form.reset()

    const linha = botao.parentElement.parentElement
    const nome = linha.children[0].innerText
    const idade = linha.children[1].innerText
    const altura = linha.children[2].innerText
    const peso = linha.children[3].innerText
    const imc = linha.children[4].innerText
    const total = linha.children[5].innerText

    document.getElementById('nome').value = nome
    document.getElementById('idade').value = idade
    document.getElementById('altura').value = altura
    document.getElementById('peso').value = peso
    document.getElementById('resultadoIMC').value = imc
    document.getElementById('resultadoTotal').value = total
    document.getElementById('botaoCalcIMC').click()
    document.getElementById('botaoCalcTotal').click()
    
    removerLinha(botao)
}

function ordernarCrescente(){ //1º buscar a linha; 2º selecionar a linha a e b; 3º comparar as linhas; 4º ordernar; 5º adicionar a nova linha
    const tabela = document.querySelector("#tabela")
    const linhas = [...tabela.querySelectorAll("tr.data")]

    linhas.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText))

    linhas.forEach(linha => tabela.appendChild(linha))
}

function ordernarDecrescente(){  //1º buscar a linha; 2º selecionar a linha a e b; 3º comparar as linhas; 4º ordernar; 5º adicionar a nova linha
    const tabela = document.querySelector("#tabela")
    const linhas = [...tabela.querySelectorAll("tr.data")]

    linhas.sort((a, b) => b.cells[0].innerText.localeCompare(a.cells[0].innerText))

    linhas.forEach(linha => tabela.appendChild(linha))
}

function filtrarIMC() {
    const filtro = document.getElementById('seletorFiltro').value 
    const linhas = document.querySelectorAll("tr.data") 

    linhas.forEach(linha => {
        const imcTexto = linha.children[4].innerText

        const imcCategoria = imcTexto.split(" - ")[1]

        switch (filtro) {
            case "Todos os registos":
                linha.style.display = "table-row" 
                break

            case "Magro":
                if (imcCategoria === "Magro") {
                    linha.style.display = "table-row" 
                } else {
                    linha.style.display = "none"
                }
                break

            case "Normal":
                if (imcCategoria === "Normal")  {
                    linha.style.display = "table-row" 
                } else {
                    linha.style.display = "none"
                }
                break

            case "Obesidade":
                if (imcCategoria === "Obesidade")  {
                    linha.style.display = "table-row"
                } else {
                    linha.style.display = "none"
                }
                break
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    let infos = JSON.parse(localStorage.getItem("infos"))

    if (infos) {
        info = infos 
        infos.forEach(pessoa => {
            addtable(pessoa.nome, pessoa.idade, pessoa.altura, pessoa.peso, pessoa.imc, pessoa.total)
        })
    }
})

