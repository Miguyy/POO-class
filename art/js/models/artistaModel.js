class Artista {
    constructor(nome) {
        this.nome = nome;
    }
}

if (!window.artistas) {
    window.artistas = [];
}

function adicionarArtista(nome) {
    if (!window.artistas.includes(nome)) {
        window.artistas.push(nome);
    }
}

function listarArtistas() {
    return window.artistas;
}

window.Artista = Artista;
window.adicionarArtista = adicionarArtista;
window.listarArtistas = listarArtistas;
