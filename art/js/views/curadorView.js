// js/views/curadorView.js

window.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("artistas");
    const outroDiv = document.getElementById("outroArtistaDiv");
    const adicionarBtn = document.getElementById("adicionarBtn");

    // Preenche a dropdown com artistas
    window.listarArtistas().forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    select.appendChild(opt);
    });


    // Adiciona opção "Outro"
    const optOutro = document.createElement("option");
    optOutro.value = "Outro";
    optOutro.textContent = "Outro";
    select.appendChild(optOutro);

    // Mostra/oculta campo "Outro"
    select.addEventListener("change", () => {
        if ([...select.selectedOptions].some(opt => opt.value === "Outro")) {
            outroDiv.style.display = "block";
        } else {
            outroDiv.style.display = "none";
        }
    });

    adicionarBtn.addEventListener("click", () => {
        const titulo = document.getElementById("titulo").value.trim();
        const ano = parseInt(document.getElementById("ano").value);
        const imagem = document.getElementById("imagem").value.trim();
        let artistasSelecionados = [...select.selectedOptions].map(opt => opt.value);

        if (!titulo || isNaN(ano) || ano < 1400 || ano > new Date().getFullYear()) {
            alert("Preencha corretamente os campos obrigatórios.");
            return;
        }

        // Trata novo artista se "Outro" foi escolhido
        if (artistasSelecionados.includes("Outro")) {
            const novoNome = document.getElementById("novoArtista").value.trim();
            if (novoNome) {
                adicionarArtista(novoNome);
                artistasSelecionados = artistasSelecionados.filter(n => n !== "Outro");
                artistasSelecionados.push(novoNome);
            }
        }

        const novaObra = new Obra(titulo, ano, imagem, artistasSelecionados);
        adicionarObra(novaObra);
        alert("Obra adicionada com sucesso!");
    });
});
