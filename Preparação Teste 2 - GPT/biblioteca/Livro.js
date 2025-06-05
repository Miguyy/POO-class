export class Livro {
  constructor(titulo, autor, ano, totalExemplares) {
    this.titulo = titulo
    this.autor = autor
    this.ano = ano
    this.totalExemplares = totalExemplares
    this.exemplaresDisponiveis = totalExemplares
  }

  emprestar() {
    // Diminuir exemplaresDisponiveis se possível
    if (this.exemplaresDisponiveis > 0){
        this.exemplaresDisponiveis--
        return true
    }
  }

  devolver() {
    // Aumentar exemplaresDisponiveis se possível
    if (this.exemplaresDisponiveis < this.totalExemplares){
        this.exemplaresDisponiveis++
        return true
    }
    
  }
}
