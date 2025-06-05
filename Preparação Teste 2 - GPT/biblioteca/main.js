import { Livro } from "./Livro.js"
import { Utilizador } from "./Utilizador.js"

const livros = []
const utilizadores = []

function salvarDados() {
  localStorage.setItem("livros", JSON.stringify(livros))
  localStorage.setItem("utilizadores", JSON.stringify(utilizadores))
}

function carregarDados() {
  const dadosLivros = JSON.parse(localStorage.getItem("livros")) || []
  const dadosUtilizadores = JSON.parse(localStorage.getItem("utilizadores")) || []

  dadosLivros.forEach(l => {
    const livro = new Livro(l.titulo, l.autor, l.ano, l.totalExemplares)
    livro.exemplaresDisponiveis = l.exemplaresDisponiveis
    livros.push(livro)
  })

  dadosUtilizadores.forEach(u => {
    const utilizador = new Utilizador(u.nome, u.id)
    utilizador.emprestimos = u.emprestimos || []
    utilizadores.push(utilizador)
  })
}

function atualizarSelects() {
  const selectUtilizador = document.getElementById("select-utilizador")
  const selectLivro = document.getElementById("select-livro")

  selectUtilizador.innerHTML = ""
  utilizadores.forEach(u => {
    const option = document.createElement("option")
    option.value = u.id
    option.textContent = u.nome
    selectUtilizador.appendChild(option)
  })

  selectLivro.innerHTML = ""
  livros.forEach(l => {
    if (l.exemplaresDisponiveis > 0) {
      const option = document.createElement("option")
      option.value = l.titulo
      option.textContent = l.titulo
      selectLivro.appendChild(option)
    }
  })
}

function atualizarDashboard() {
  const livrosBody = document.querySelector("#livros-tabela tbody")
  const emprestimosBody = document.querySelector("#emprestimos-tabela tbody")

  livrosBody.innerHTML = ""
  livros.forEach(l => {
    const row = document.createElement("tr")
    row.innerHTML = `<td>${l.titulo}</td><td>${l.autor}</td><td>${l.ano}</td><td>${l.exemplaresDisponiveis}</td>`
    livrosBody.appendChild(row)
  })

  emprestimosBody.innerHTML = ""
  utilizadores.forEach(u => {
    u.emprestimos.forEach(titulo => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${u.nome}</td>
        <td>${titulo}</td>
        <td><button data-id="${u.id}" data-livro="${titulo}">Devolver</button></td>
      `
      emprestimosBody.appendChild(row)
    })
  })
}

function adicionarLivro(titulo, autor, ano, totalExemplares) {
  const novo = new Livro(titulo, autor, ano, totalExemplares)
  livros.push(novo)
  salvarDados()
  atualizarSelects()
  atualizarDashboard()
}

function adicionarUtilizador(nome) {
  const id = Date.now().toString()
  const novo = new Utilizador(nome, id)
  utilizadores.push(novo)
  salvarDados()
  atualizarSelects()
}

function registarEmprestimo(idUtilizador, tituloLivro) {
  const utilizador = utilizadores.find(u => u.id === idUtilizador)
  const livro = livros.find(l => l.titulo === tituloLivro)
  if (utilizador && livro && livro.emprestar()) {
    utilizador.adicionarEmprestimo(livro)
    salvarDados()
    atualizarSelects()
    atualizarDashboard()
  }
}

function registarDevolucao(idUtilizador, tituloLivro) {
  const utilizador = utilizadores.find(u => u.id === idUtilizador)
  const livro = livros.find(l => l.titulo === tituloLivro)
  if (utilizador && livro) {
    livro.devolver()
    utilizador.devolverEmprestimo(tituloLivro)
    salvarDados()
    atualizarSelects()
    atualizarDashboard()
  }
}

// Aguarda que o DOM esteja carregado
document.addEventListener("DOMContentLoaded", () => {
  carregarDados()
  atualizarSelects()
  atualizarDashboard()

  // Formulário adicionar livro
  document.getElementById("form-livro").addEventListener("submit", e => {
    e.preventDefault()
    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById("autor").value
    const ano = parseInt(document.getElementById("ano").value)
    const total = parseInt(document.getElementById("total-exemplares").value)
    adicionarLivro(titulo, autor, ano, total)
    e.target.reset()
  })

  // Formulário adicionar utilizador
  document.getElementById("form-utilizador").addEventListener("submit", e => {
    e.preventDefault()
    const nome = document.getElementById("nome-utilizador").value
    adicionarUtilizador(nome)
    e.target.reset()
  })

  // Formulário registar empréstimo
  document.getElementById("form-emprestimo").addEventListener("submit", e => {
    e.preventDefault()
    const id = document.getElementById("select-utilizador").value
    const titulo = document.getElementById("select-livro").value
    registarEmprestimo(id, titulo)
  })

  // Devolução (event delegation)
  document.getElementById("emprestimos-tabela").addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id
      const titulo = e.target.dataset.livro
      registarDevolucao(id, titulo)
    }
  })
})
