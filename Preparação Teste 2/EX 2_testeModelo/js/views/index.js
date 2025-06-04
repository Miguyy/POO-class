// Importa modulo dados.js
import * as data from "./init.js"
import pais from "./models/modelPaises"


// declara array de paises, que vai conter todos os objetos da classe pais
let paises = []

// invocar função data (módulo init.js) para preencher array paises com os objetos criados no init.js
paises = data.init()
//selecionar elementos do DOM
const form = document.querySelector('#frmFilm')
const txtID = document.querySelector('#txtID')
const txtnomePais = document.querySelector('#txtnomePais')

form.addEventListener('submit', event => {
    event.preventDefault()

    const id = txtID.value.trim()
    const nomePais = txtnomePais.value.trim()
    const existe = paises.some(p => p.nomePais.toLowerCase() === nomePais.toLowerCase())

    if (existe) {
        alert('Erro: Este país já existe!')
        return
    }

    // Cria novo país e adiciona ao array
    const novoPais = new pais(id, nomePais)
    paises.push(novoPais)

    // 2.5 Guardar/atualizar a localStorage com o array de países
    localStorage.setItem('paises', JSON.stringify(paises))

    // Limpar formulário
    form.reset()
})







// Código asosciado ao Submit do formulário







