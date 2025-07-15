// js/models/obraModel.js

class Obra {
    constructor(titulo, ano, imagem, artistas) {
        this.titulo = titulo;
        this.ano = ano;
        this.imagem = imagem;
        this.artistas = artistas;
    }
}

if (!window.obras) {
    window.obras = [];
}

function adicionarObra(obra) {
    window.obras.push(obra);
}

function listarObrasPorArtista(nome) {
    return obras.filter(o => o.artistas.includes(nome));
}

window.Obra = Obra;
window.adicionarObra = adicionarObra;
window.listarObrasPorArtista = listarObrasPorArtista;
