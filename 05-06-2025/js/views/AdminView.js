import { Actor } from '../models/AtorModel.js'
import { Serie } from '../models/SerieModel.js'

document.getElementById("serieForm").addEventListener('submit', event => { //Evento do botão de submit
    event.preventDefault()
    const nomeSerie = document.getElementById("nomeSerie").value
    const anoLancamento = document.getElementById("anoSerie").value
    const capa = document.getElementById("capaSerie").value
    adicionarNovaSerie(nomeSerie, anoLancamento, capa)
    nomeSerieObrigatorio(nomeSerie)
    anoLancamentoValido(ano) 
    event.reset()
})

const actoresSelect = document.getElementById("atoresSelect") //selecção actores
actores.forEach(actor => {
  const option = document.createElement("option")
  option.value = actores
  option.textContent = actor.nomeActor //nome actor
  option.textContent = actor.other //outro actor
  actoresSelect.appendChild(option)
})

function nomeSerieObrigatorio(nomeSerie) { //função de obrigatoriedade de nome da serie
    if (!nomeSerie || nomeSerie.trim() === "") { //se não houver input ou se o nome for inválido
        alert("O nome da série é obrigatório.")
        return false
    }
    else{
        alert("O nome da série é válido.")
    }
}   

function anoLancamentoValido(ano) { //função que verifica se o ano é válido entre 1900 e ano actual
    const anoAtual = new Date().getFullYear()
    if(ano >= 1900 && ano <= anoAtual){
        return true
    }
    else{
        atert("Deve ser entre 1900 e ano actual.", anoAtual)
    }
}

  






