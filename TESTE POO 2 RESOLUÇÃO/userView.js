import { Serie } from "./serieModel.js";

document.getElementById("buscarBtn").addEventListener("click", () => {
  const nome = document.getElementById("atorInput").value.trim();
  const atorExiste = window.atores.some(a => a.nome.toLowerCase() === nome.toLowerCase());

  if (!atorExiste) {
    alert("Nome inexistente!");
    return;
  }

  const seriesDoAtor = window.series
    .filter(s => s.atores.includes(nome))
    .sort((a, b) => b.ano - a.ano);

  const container = document.getElementById("resultado");
  container.innerHTML = "";

  seriesDoAtor.forEach(serie => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "20px";
    card.innerHTML = `
      <img src="${serie.capa}" alt="${serie.nome}" style="max-width: 200px;"><br/>
      <strong>${serie.nome}</strong> (${serie.ano})
    `;
    container.appendChild(card);
  });
});
