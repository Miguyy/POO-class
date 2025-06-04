import { initPaises } from './init.js';

let paisesLista = [];
let paisAdivinhar = '';
let tentativas = 0;

function carregarPaises() {
    const dados = localStorage.getItem('paises');
    if (dados) {
        paisesLista = JSON.parse(dados);
    } else {
        paisesLista = initPaises();
        localStorage.setItem('paises', JSON.stringify(paisesLista));
    }
}

function sortearPais() {
    const indice = Math.floor(Math.random() * paisesLista.length);
    paisAdivinhar = paisesLista[indice].toUpperCase();
    tentativas = 0;
}

function atualizarCelulas() {
    const celulas = document.querySelectorAll('td');
    celulas.forEach((celula, i) => {
        if (i < paisAdivinhar.length) {
            celula.textContent = (i + 1).toString();
            celula.style.visibility = "visible";
        } else {
            celula.textContent = '';
            celula.style.visibility = "hidden"; // esconder as que não fazem parte do nome
        }
    });
}

function renderModal(mensagem) {
    const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
    document.getElementById('mensagemTexto').innerText = mensagem;
    modal.show();
}

function inicializarJogo() {
    carregarPaises();
    sortearPais();
    atualizarCelulas();
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarJogo();

    const celulas = document.querySelectorAll('td');
    celulas.forEach((celula, index) => {
        celula.addEventListener('click', () => {
            const conteudo = celula.textContent;
            if (!isNaN(conteudo)) {
                if (index < paisAdivinhar.length) {
                    celula.textContent = paisAdivinhar[index];
                    tentativas++;
                }
            } else {
                renderModal('Já revelaste esta letra!');
            }
        });
    });

    document.getElementById('btnAdivinhar').addEventListener('click', () => {
        const palpite = prompt('Qual é o seu palpite para o país?');
        if (palpite && palpite.toUpperCase() === paisAdivinhar) {
            renderModal(`Parabéns! Acertaste com ${tentativas} letra(s) reveladas.`);
        } else {
            renderModal('Errado! Tenta novamente.');
        }
    });

    document.getElementById('btnInicio').addEventListener('click', () => {
        inicializarJogo();
    });
});
