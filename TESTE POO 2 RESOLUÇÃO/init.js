window.secrets = ["user123", "maria456", "joao789"];

window.atores = [
  { nome: "Alice Braga" },
  { nome: "Wagner Moura" },
  { nome: "Sophie Charlotte" }
];

window.series = [
  {
    nome: "3%",
    ano: 2016,
    capa: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/3percent.jpg/220px-3percent.jpg",
    atores: ["Alice Braga"]
  },
  {
    nome: "Narcos",
    ano: 2015,
    capa: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Narcos_season_1.png/220px-Narcos_season_1.png",
    atores: ["Wagner Moura"]
  },
  {
    nome: "Todas as Flores",
    ano: 2022,
    capa: "https://upload.wikimedia.org/wikipedia/pt/1/1d/Todas_as_Flores.jpg",
    atores: ["Sophie Charlotte", "Wagner Moura"]
  }
];

const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const val = document.getElementById("secretInput").value.trim();
    if (val === "admin") {
      window.location.href = "admin.html";
    } else if (window.secrets.includes(val)) {
      window.location.href = "user.html";
    } else {
      document.getElementById("error").innerText = "Secret inválido!";
    }
  });
}
