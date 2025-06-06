import { Actor } from '../models/AtorModel.js'
import { Serie } from '../models/SerieModel.js'

document.getElementById("buscarBtn").addEventListener("click", event => { //evento do botão de pesquisa
    event.preventDefault()
    const atorInput = document.getElementById("atorInput").value
    adicionarNovaSerie(atorInput)
    renderizaTimeline()
    anoLancamentoDescrescente(a, b)
    existenciaActor(atorInput)
    event.reset()
})

function renderizaTimeline() { //função que renderiza a timeline
    const timeline = document.getElementById('resultado');
    timeline.innerHTML = '';

    series.forEach(serie => { //parte dos cards
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${nomeSerie}</h3>
            <p>Ano: ${anoSerie}</p>
            <img src="${capaSerie}" alt="${nomeSerie}">
        `
        timeline.appendChild(card);
    })
} 

function anoLancamentoDescrescente(a, b) { //função de ordenação dos cards por ano de forma decrescente
    if (a.ano === b.ano) {
        return 0;
    }
    else{
        return b.ano - a.ano;
    }
}   

function existenciaActor(atorInput) { //função que verifica se o ator já existe
    if (!atorInput || atorInput.trim() === "") { //se não houver input ou se o nome for inválido
        alert("O nome do ator está inválido.");
        return false; 
    }
    else{
        alert("O nome do ator é válido.");
    }
    return atores.some(ator => ator.nome.toLowerCase() === nome.toLowerCase());
}


