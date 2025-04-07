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

ordenarBtn.addEventListener('click', () => {
    ordenarBtn.textContent = ordemAscendente = 'Ordenar Z-A' 
    renderizarTabela();
})

