import { Ator } from "./atorModel.js";
import { Serie } from "./serieModel.js";

const select = document.getElementById("atoresSelect");
const inputOutro = document.getElementById("novoAtorInput");
const mensagem = document.getElementById("mensagem");

// Preenche o select com os atores + opção "Outro"
function preencherSelect() {
  select.innerHTML = "";
  Ator.listarAtores().forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    select.appendChild(opt);
  });

  const outro = document.createElement("option");
  outro.value = "Outro";
  outro.textContent = "Outro";
  select.appendChild(outro);
}
preencherSelect();

// Mostrar ou esconder campo de novo ator
select.addEventListener("change", () => {
  const selecionouOutro = Array.from(select.selectedOptions).some(opt => opt.value === "Outro");
  inputOutro.style.display = selecionouOutro ? "block" : "none";
});

document.getElementById("serieForm").addEventListener("submit", (e) => {
  e.preventDefault();
  mensagem.textContent = "";

  const nome = document.getElementById("nomeSerie").value.trim();
  const ano = parseInt(document.getElementById("anoSerie").value);
  const capa = document.getElementById("capaSerie").value.trim();
  let atores = Array.from(select.selectedOptions).map(opt => opt.value);

  const anoAtual = new Date().getFullYear();

  if (!nome || isNaN(ano) || ano < 1900 || ano > anoAtual) {
    mensagem.style.color = "red";
    mensagem.textContent = "Por favor, preencha corretamente os campos obrigatórios.";
    return;
  }

  // Se "Outro" estiver selecionado, tratar novo nome
  if (atores.includes("Outro")) {
    const novoNome = inputOutro.value.trim();
    if (novoNome) {
      Ator.adicionarAtor(novoNome);
      atores = atores.filter(a => a !== "Outro").concat(novoNome);
      preencherSelect(); // Atualiza select
    } else {
      mensagem.style.color = "red";
      mensagem.textContent = "Introduza o nome do novo ator/atriz.";
      return;
    }
  }

  const novaSerie = new Serie(nome, ano, capa, atores);
  Serie.adicionarSerie(novaSerie);

  mensagem.style.color = "green";
  mensagem.textContent = "Série adicionada com sucesso!";
  document.getElementById("serieForm").reset();
  inputOutro.style.display = "none";
});
