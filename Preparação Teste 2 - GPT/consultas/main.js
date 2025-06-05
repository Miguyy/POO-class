import { Consulta } from "./consulta.js"
import { Paciente } from "./Paciente.js"

const pacientes = []

function salvarDados() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes))
}

function carregarDados() {
  const dados = localStorage.getItem("pacientes")
  if (dados) {
    const dadosParse = JSON.parse(dados)
    dadosParse.forEach(d => {
      const p = new Paciente(d.nome, d.id)
      p.consultas = d.consultas || []
      pacientes.push(p)
    })
  } else {
    pacientes.push(
      new Paciente("João Silva", "1"),
      new Paciente("Maria Santos", "2"),
      new Paciente("Pedro Oliveira", "3")
    )
  }
}

carregarDados()

// Preencher o <select>
const pacienteSelect = document.getElementById("paciente-select")
pacientes.forEach(paciente => {
  const option = document.createElement("option")
  option.value = paciente.id
  option.textContent = paciente.nome
  pacienteSelect.appendChild(option)
})

// Submeter formulário
const form = document.getElementById("consulta-form")
form.addEventListener("submit", event => {
  event.preventDefault()

  const idPaciente = pacienteSelect.value
  const paciente = pacientes.find(p => p.id === idPaciente)

  const especialidade = document.getElementById("especialidade").value
  const data = document.getElementById("data-consulta").value

  const novaConsulta = new Consulta(especialidade, data)
  paciente.adicionarConsulta(novaConsulta)

  salvarDados()
  atualizarDashboard()
  form.reset()
})

// Atualizar dashboard
function atualizarDashboard() {
  const tbody = document.querySelector("#dashboard tbody")
  tbody.innerHTML = ""

  pacientes.forEach(paciente => {
    paciente.consultas
      .sort((a, b) => new Date(a.data) - new Date(b.data))
      .forEach(consulta => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
          <td>${paciente.nome}</td>
          <td>${consulta.especialidade}</td>
          <td>${consulta.data}</td>
          <td><button class="realizada-btn" data-id="${paciente.id}" data-data="${consulta.data}">REALIZADA</button></td>
        `
        tbody.appendChild(tr)
      })
  })

  // Ação do botão REALIZADA
  document.querySelectorAll(".realizada-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id
      const data = btn.dataset.data
      const paciente = pacientes.find(p => p.id === id)
      paciente.marcarConsultaComoRealizada(data)
      salvarDados()
      atualizarDashboard()
    })
  })
}

atualizarDashboard()
