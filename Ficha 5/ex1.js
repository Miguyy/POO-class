let jogos = []

const form = document.getElementById("form")

function addtable(gameName,launchDate,gameType){
    let table=document.querySelector(".tabela")
    table.innerHTML+=
    `<tr class = "data">
        <td>${gameName}</td>
        <td>${launchDate}</td>
        <td>${gameType}</td>
    </tr>`
    
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const nome = document.getElementById('nome').value
    const ano = +document.getElementById('ano').value
    const genero = document.getElementById('genero').value
    const avaliacao = +document.getElementById('avaliacao').value

    const plataformas  = [...document.getElementById('plataforma').selectedOptions].map(option => option.value)

    const anoAtual = new Date().getFullYear()

    if (ano < 0 || ano > AnoAtual){
        alert("Por favor, preencha o ano corretamente!")
        return
    }

    const novoJogo = {nome, ano, genero, plataformas, avaliacao}
    jogos.push(novoJogo)
    console.log(jogos)

    addTable(nome,ano,genero)

    form.reset()
})