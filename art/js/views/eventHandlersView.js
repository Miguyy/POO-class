// js/views/eventHandlersView.js

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("entrarBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {
        const input = document.getElementById("codigo");
        const codigoSecreto = input.value.trim();

        // Garante que codigosValidos está definido
        if (typeof codigosValidos === "undefined") {
            alert("Erro interno: lista de códigos não está disponível.");
            return;
        }

        if (codigoSecreto === "curador") {
            window.location.href = "curador.html";
        } else if (codigosValidos.includes(codigoSecreto)) {
            window.location.href = "visitante.html";
        } else {
            alert("Código inválido!");
        }
    });
});
