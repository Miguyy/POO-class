import pais from "../../EX 2_testeModelo/js/models/modelPaises.js"
// Importar a classe paises

let paises = []   // Arrays que vai conter objetos paises


export function init() {
    // CRIAR 3 instancias da classe pais e adicioná-las ao array paises
    paises.push(new pais('1', 'Portugal'))
    paises.push(new pais('2', 'Colombia'))
    paises.push(new pais('3', 'Vaticano'))

    return paises
}