// PaisesView.js

import * as data from "../init.js";
import Pais from "../models/modelPaises.js";

// Dados iniciais
let continentes = data.initContinentes();
let paises = data.initPaises();

document.addEventListener("DOMContentLoaded", () => {
  preencherSeletor();
  renderCards(paises);
});

// Preenche o seletor do formulário
function preencherSeletor() {
  const selector = document.getElementById("txtContinente");
  selector.innerHTML = "<option value=''>Selecione um continente</option>";
  continentes.forEach(continente => {
    const option = document.createElement("option");
    option.value = continente;
    option.textContent = continente;
    selector.appendChild(option);
  });
}

// Submissão do formulário
document.getElementById("frmPaises").addEventListener("submit", event => {
  event.preventDefault();

  const nomePais = document.getElementById("txtNomePais").value;
  const continente = document.getElementById("txtContinente").value;

  if (nomePais && continente) {
    try {
      const novoPais = new Pais(calcIdPais(), nomePais, continente);
      Pais.adicionarPais(paises, novoPais);
      renderCards(paises);
      alert("País adicionado com sucesso!");
      document.getElementById("frmPaises").reset();
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// Calcula próximo ID
function calcIdPais() {
  if (paises.length === 0) return 1;
  return Math.max(...paises.map(p => p.id)) + 1;
}

// Renderiza os cards
function renderCards(paisesArray) {
  let container = document.getElementById("cardsContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "cardsContainer";
    container.className = "d-flex flex-wrap";
    document.body.appendChild(container);
  }

  container.innerHTML = "";

  paisesArray.forEach(pais => {
    const card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "18rem";
    card.style.backgroundColor = getColorByContinente(pais.continente);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = pais.nomePais;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent = `Continente: ${pais.continente}`;

    body.appendChild(title);
    body.appendChild(text);
    card.appendChild(body);
    container.appendChild(card);
  });
}

// Cores por continente
function getColorByContinente(continente) {
  switch (continente) {
    case "Europa": return "#cce5ff";
    case "Asia": return "#fff3cd";
    case "Africa": return "#d4edda";
    case "America": return "#f8d7da";
    case "Oceania": return "#e2e3e5";
    default: return "#ffffff";
  }
}

// Botão: Filtrar
document.getElementById("btnFiltrar").addEventListener("click", () => {
  const continenteSelecionado = document.getElementById("sltFilter").value;
  if (!continenteSelecionado || continenteSelecionado === "Continente") {
    renderCards(paises);
  } else {
    const filtrados = Pais.listaPaises(paises, continenteSelecionado);
    renderCards(filtrados);
  }
});

// Botão: Ordenar
document.getElementById("btnOrdenar").addEventListener("click", () => {
  const ordenados = [...paises].sort((a, b) =>
    a.nomePais.localeCompare(b.nomePais)
  );
  renderCards(ordenados);
});

// Botão: Guardar localStorage
document.getElementById("btnStorage").addEventListener("click", () => {
  localStorage.setItem("listaPaises", JSON.stringify(paises));
  alert("Lista de países guardada com sucesso!");
});
