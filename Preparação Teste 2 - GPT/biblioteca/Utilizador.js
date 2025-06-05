export class Utilizador {
  constructor(nome, id) {
    this.nome = nome
    this.id = id
    this.emprestimos = []
  }

  adicionarEmprestimo(livro) {
    // Tenta emprestar o livro (reduz um exemplar disponível)
    if (livro.emprestar()) {
      this.emprestimos.push(livro)
      return true
    }
    return false
  }

  devolverEmprestimo(tituloLivro) {
    const index = this.emprestimos.findIndex(livro => livro.titulo === tituloLivro)
    if (index !== -1) {
      const livro = this.emprestimos[index]
      if (livro.devolver()) {
        this.emprestimos.splice(index, 1)
        return true
      }
    }
    return false
  }
}
