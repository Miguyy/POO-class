export default class Publicacao {
    constructor(titulo, genero) {
        this.titulo = titulo;
        this.genero = genero;
        this.gostos = 0;
    }

    gostarPublicacao() {
        this.gostos++;
    }
}
