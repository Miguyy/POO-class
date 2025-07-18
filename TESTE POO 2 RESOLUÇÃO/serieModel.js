export class Serie {
  constructor(nome, ano, capa, atores) {
    this.nome = nome;
    this.ano = parseInt(ano);
    this.capa = capa || "";
    this.atores = atores;
  }

  static adicionarSerie(serie) {
    window.series.push({
      nome: serie.nome,
      ano: serie.ano,
      capa: serie.capa,
      atores: serie.atores
    });
  }

  static listarSeries() {
    return window.series || [];
  }
}
