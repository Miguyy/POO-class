import { library } from './library.js' // adapta o path conforme necessário

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById("book-title")
    const yearInput = document.getElementById("book-year")
    const idInput = document.getElementById("book-id")
    const bookList = document.getElementById("book-list")

    // Função para renderizar a lista de livros
    function renderBooks() {
        bookList.innerHTML = ""
        const books = library.getAllBooks() // assumindo que este método existe
        books.forEach(book => {
            const li = document.createElement("li")
            li.textContent = `${book.id}: ${book.title} (${book.releaseDate}) - ${book.reserved ? "Reservado" : "Disponível"}`
            bookList.appendChild(li)
        })
    }

    // Adicionar livro
    document.getElementById("add-button").addEventListener("click", () => {
        const title = titleInput.value.trim()
        const year = yearInput.value.trim()

        try {
            const book = library.addBook(title, year)
            alert(`Livro adicionado: ${book.title} (${book.releaseDate})`)
            renderBooks()
        } catch (error) {
            alert(error.message)
        }

        titleInput.value = ""
        yearInput.value = ""
    })

    // Reservar livro
    document.getElementById("reserve-button").addEventListener("click", () => {
        const id = idInput.value.trim()
        const book = library.getBookById(id)

        if (!book) {
            alert("Nenhum livro encontrado com este ID.")
            return
        }

        if (book.reserved) {
            alert("Este livro já está reservado.")
            return
        }

        book.reserve()
        renderBooks()
    })

    // Entregar livro
    document.getElementById("deliver-button").addEventListener("click", () => {
        const id = idInput.value.trim()
        const book = library.getBookById(id)

        if (!book) {
            alert("Nenhum livro encontrado com este ID.")
            return
        }

        if (!book.reserved) {
            alert("Este livro não está reservado.")
            return
        }

        book.deliver()
        renderBooks()
    })
})
