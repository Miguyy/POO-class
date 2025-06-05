import { Paciente } from "./Paciente.js"
import { Medicamento } from "./Medicamento.js"

// 2.6 – Persistência com LocalStorage
const pacientes = []

function salvarDados() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes))
}

function carregarDados() {
  const dados = localStorage.getItem("pacientes")
  if (dados) {
    const dadosParse = JSON.parse(dados)
    dadosParse.forEach(d => {
      const p = new Paciente(d.nomePaciente, d.idade, d.id)
      p.medicamentos = d.medicamentos || []
      pacientes.push(p)
    })
  } else {
    pacientes.push(
      new Paciente("João Silva", 70, "1"),
      new Paciente("Maria Santos", 65, "2"),
      new Paciente("Pedro Oliveira", 80, "3")
    )
  }
}

carregarDados()

// Preencher o <select>
const pacienteSelect = document.getElementById("paciente-select")
pacientes.forEach(paciente => {
  const option = document.createElement("option")
  option.value = paciente.id
  option.textContent = paciente.nomePaciente
  pacienteSelect.appendChild(option)
})

// 2.3 e 2.4 – Adicionar medicamento
const form = document.getElementById("medicamento-form")
form.addEventListener("submit", event => {
  event.preventDefault()

  const idPaciente = pacienteSelect.value
  const paciente = pacientes.find(p => p.id === idPaciente)

  const nome = document.getElementById("nome-medicamento").value
  const total = parseInt(document.getElementById("total-comprimidos").value)
  const dose = parseInt(document.getElementById("dose-medicamento").value)
  const freq = document.getElementById("frequencia-medicamento").value
  const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const novoMed = new Medicamento(nome, total, dose, freq, hora)
  paciente.adicionarMedicamento(novoMed)

  salvarDados()
  atualizarDashboard()
  form.reset()
})

// 2.4 – Atualizar dashboard
function atualizarDashboard() {
  const tbody = document.querySelector("#dashboard-table tbody")
  tbody.innerHTML = ""

  pacientes.forEach(paciente => {
    paciente.medicamentos.forEach(med => {
      const totalTomas = Math.ceil(med.totalComprimidos / med.dosagem)
      const tomasRestantes = totalTomas - (med.tomasFeitas || 0)

      for (let i = 0; i < tomasRestantes; i++) {
        const tr = document.createElement("tr")
        tr.innerHTML = `
          <td>${paciente.nomePaciente}</td>
          <td>${med.nome}</td>
          <td>${med.dosagem}</td>
          <td>${med.horaToma}</td>
          <td><button class="btn-toma" data-paciente="${paciente.id}" data-med="${med.nome}">TOMA</button></td>
        `
        tbody.appendChild(tr)
      }
    })
  })
}

// 2.5 – Lógica do botão TOMA
document.querySelector("#dashboard-table").addEventListener("click", e => {
  if (e.target.classList.contains("btn-toma")) {
    const idPaciente = e.target.dataset.paciente
    const nomeMed = e.target.dataset.med

    const paciente = pacientes.find(p => p.id === idPaciente)
    paciente.tomarMedicamento(nomeMed)

    salvarDados()
    atualizarDashboard()
  }
})

// Iniciar dashboard
atualizarDashboard()
