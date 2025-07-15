document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("procurarBtn");

    btn.addEventListener("click", () => {
        const nome = document.getElementById("artista").value.trim();

        const obrasDoArtista = listarObrasPorArtista(nome);

        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = "";

        if (obrasDoArtista.length === 0) {
            alert("Artista não encontrado!");
        } else {
            // Ordena do mais recente para o mais antigo
            obrasDoArtista.sort((a, b) => b.ano - a.ano);

            obrasDoArtista.forEach(obra => {
                const div = document.createElement("div");
                div.innerHTML = `<h3>${obra.titulo} (${obra.ano})</h3>`;
                resultadoDiv.appendChild(div);
            });
        }
    });
});
