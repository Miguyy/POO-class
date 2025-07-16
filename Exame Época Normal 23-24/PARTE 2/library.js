// library.js
// Complete a classe Library aqui



class Library{
    constructor(){
        this.books = []
        this.nextId = 1
    }

}

function addBook (title, year){
    const book = new Book(this.nextId, title, year, true)
    this.books.pusk(book)
    this.nextId++
    if (this.books.some(b => b.title === title && b.releaseDate === year)) {
        throw new Error("Este livro já existe na biblioteca.")
    }
    alert("O livro foi adicionado com sucesso.")
    console.log(book)
    return book

}

function getBookById (id){
    const book = this.books.find(b => b.identification === id)
    if (!book){
        throw new Error ("Livro não encontrado")
    }
    return book
}

const library = new Library()
export { library }