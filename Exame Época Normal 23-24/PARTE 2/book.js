// book.js
// Complete a classe Book aqui
class Book{
    constructor(bookIdentification, title, releaseDate, availability){
        this.bookIdentification = bookIdentification
        this.title = title
        this.releaseDate = releaseDate
        this.availability = availability
    }
}

function reserve(){
    this.availability = false
    alert("O livro foi guardado com sucesso.")
    
}

function deliver(){
    this.availability = true
    alert("O livro foi entregue com sucesso.")
        
}
