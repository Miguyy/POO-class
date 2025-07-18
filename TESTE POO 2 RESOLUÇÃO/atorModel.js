export class Ator {
  constructor(nome) {
    this.nome = nome;
  }

  static adicionarAtor(nome) {
    if (!window.atores.some(a => a.nome.toLowerCase() === nome.toLowerCase())) {
      window.atores.push({ nome });
    }
  }

  static listarAtores() {
    return (window.atores || []).map(a => a.nome);
  }
}
