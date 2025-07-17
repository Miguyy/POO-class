import Publicacao from "./publicacaoModel.js";

export default class Seguidor {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
        this.dataCriacao = new Date();
        this.publicacoes = [];
    }

    adicionarPublicacao(publicacao) {
        this.publicacoes.push(publicacao);
    }

    obterNumeroPublicacoes() {
        return this.publicacoes.length;
    }
}
