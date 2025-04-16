// 40230260 - Miguel Machado
//FORAM FEITAS PEQUENAS ALTERAÇÕES NO HTML, VISTO QUE, ACHAVA MAIS FÁCIL DE ACORDO COM O QUE FOI ESTUDADO.

//VARIÁVEIS
let nomeJogador = prompt("Qual o seu nome?")
let tempo = 0, timer
let respondidas = 0


//Função mostrar jogo do jogador ou tabela de admin
function mostrarPromptJogador() {

  switch (nomeJogador.toLocaleLowerCase()){ //para cada caso (jogador ou admin)
    case 'jogador':                         //se jogador, então mostra o jogo, se admmin mostra a tabela
      criarGrelha()
      break
    case 'admin':
      atualizarTabelaAdmin()
      break
  }
}

//Função criar jogo para o jogador
function criarGrelha() { 

  let grelha = document.getElementById("grelha") //identificação da grelha com o id do html
  let categorias = ["História", "Ciência", "Geografia", "Matemática", "Desporto", "Literatura", "Tecnologia", "Arte", "Música"] //variavel de categorias

  for (let i = 0; i < categorias.length; i++) { //para cada grelha, foi tentado colocar o nome de cada categoria de forma individual
    let celula = document.createElement("div")
    celula.className = "celula"
    celula.textContent = categorias[i]
    grelha.appendChild(celula)
  }

}

//Função para mostrar a pergunta
function mostrarPergunta(categoria, celula) {

  let perguntaSelecionada = perguntas.filter(pergunta => pergunta.categoria === categoria)
  let respostaCorreta = perguntaSelecionada.correta
  let respostas = perguntaSelecionada.respostas //mostra as respostas correctas e as possiveis
  //respostas
  celula.innerHTML = `
    <h3>${perguntaAleatoria.pergunta}</h3>
    <div class="respostas">
      ${respostas.map(resposta => `<button onclick="validarResposta('${resposta}', '${perguntaAleatoria.pergunta}', this)">${resposta}</button>`).join('')}
    </div>`

  celula.classList.add("pergunta")
 
}

function validarResposta(resposta, pergunta, celula) { //validação da resposta
 
  let respostaCorreta = perguntas.find(p => p.pergunta === pergunta).correta
  //vai procurr a pergunta
  if (resposta === respostaCorreta) {
    celula.classList.add("correta")
    respondidas++
  } else {
    celula.classList.add("incorreta")
  }

  setTimeout(() => { //tempo
    celula.innerHTML = ""
    celula.classList.remove("pergunta", "correta", "incorreta")
    celula.textContent = pergunta
  }, 2000)

  if (respondidas === perguntas.length) {
    clearInterval(timer)
    registarTempo()
  }

}

//Função iniciciar o contador
function iniciarContador() {
  timer = setInterval(() => {
    tempo++;
    document.getElementById("contador").textContent = `Tempo: ${tempo}s`;
  }, 1000);
}

//Função registar tempo
function registarTempo() {

  //
  let tempoFinal = tempo
  let jogador = {
    nome: nomeJogador,
    tempo: tempoFinal
  }

  //Embora não tenha concluida a função de leaderboard, isto só vai indicar o tempo mais baixo (em primeiro lugar) e por ai vai, juntamente com os nomes
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || []
  leaderboard.push(jogador)
  leaderboard.sort((a, b) => a.tempo - b.tempo)
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
 
}


//Função actualizar leaderboard
function atualizarLeaderboard() {
  let tabelaLeaderboard = document.getElementById("leaderboard")
  tabelaLeaderboard.innerHTML = ""

  leaderboard.forEach((jogador, index) => {
    tabelaLeaderboard.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${jogador.nome}</td>
        <td>${jogador.tempo}s</td>
      </tr>`
  })
  document.getElementById("tabela-registos").style.display = "block"
  document.getElementById("grelha").style.display = "none"
  document.getElementById("contador").style.display = "none"
}

function atualizarTabelaAdmin(valorCategoria, valorPerguntas, valorRespostas, valorCorreta) {
  let table = document.querySelectorAll("#tabela-registos, #tabelaPerguntas")
  //Adiciona uma nova linha com os valores recebidos pelo utilizador
  tabelas.forEach(tabela => {
    tabela.innerHTML += `
      <tr class="dados">
        <td>${valorCategoria}</td>
        <td>${valorPerguntas}</td>
        <td>${valorRespostas}</td>
        <td>${valorCorreta}</td>
        <td><button onclick="removerLinha(this)">Remover</button></td>
      </tr>`
  })
    table.innerHTML += `
        <h3>Nova Pergunta</h3>
        <input id="novaCategoria" placeholder="Categoria"><br>
        <input id="novaPergunta" placeholder="Pergunta"><br>
        <input id="resp1" placeholder="Resposta 1"><br>
        <input id="resp2" placeholder="Resposta 2"><br>
        <input id="resp3" placeholder="Resposta 3"><br>
        <input id="resp4" placeholder="Resposta 4"><br>
        <input id="respostaCerta" placeholder="Resposta Certa"><br>
        <button id="btnAdicionarPergunta">Adicionar Pergunta</button>`
}

//Função de remover linha e local storage
function removerLinha(botao) {
  const linha = botao.closest('tr') 
  const index = Array.from(linha.parentElement.children).indexOf(linha)

  linha.remove()

  pergunta.splice(index, 1)

  localStorage.setItem("perguntas", JSON.stringify(pergunta))

  atualizarTabelaAdmin()
}

document.getElementById("btnAdicionarPergunta").addEventListener("click", adicionarPergunta)

function adicionarPergunta() {

  let novaCategoria = document.getElementById("novaCategoria").value
  let novaPergunta = document.getElementById("novaPergunta").value
  let resp1 = document.getElementById("resp1").value
  let resp2 = document.getElementById("resp2").value
  let resp3 = document.getElementById("resp3").value
  let resp4 = document.getElementById("resp4").value
  let respostaCerta = document.getElementById("respostaCerta").value

  pergunta.push({
    categoria: novaCategoria,
    pergunta: novaPergunta,
    respostas: [resp1, resp2, resp3, resp4],
    correta: respostaCerta
  })

  localStorage.setItem("perguntas", JSON.stringify(pergunta))
  atualizarTabelaAdmin()
  
}

window.onload = mostrarPromptJogador