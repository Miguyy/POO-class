
// Importa modulo data.js
import * as data from "./data.js";


let listUsers = []
listUsers=  data.init();

let nivel = prompt("Introduza o nível que pretende visualizar (1-3): ")
let colecionavel = prompt("Introduza o colecionavel que pretende pesquisar (avatar ou badges (Ex: badge 1)):")
let recompensa = prompt("Agora, introduza um nivel para dar uma recompensa de 100 pontos:  ")

function listarNivel(nivel){
    switch (nivel){
        case '1': 
            alert("Nivel 1")
            listUsers.forEach(user => {
                if (user.nivel == 1){
                    alert(user.nome)
                }
            })
            break
        case '2': 
            alert("Nivel 2")
            listUsers.forEach(user => {
                if (user.nivel == 2){
                    alert(user.nome)
                }
            })
            break
        case '3': 
            alert("Nivel 3")
            listUsers.forEach(user => {
                if (user.nivel == 3){
                    alert(user.nome)
                }
            })
            break
    }
}

function somarPontos(nivel){
    let pontos=0
    listUsers.forEach(user =>{
        if (user.nivel ==nivel){
            pontos+=user.pontos
        }
    })
    console.log("Pontos totais do nivel seleccionados: " + pontos)
}

function verificarNivel(nivel){

    let bool=true

    if (nivel==1 || nivel==2 || nivel==3){
        console.log(`Nivel ${nivel}: ` + bool)
    }
    else{
        console.log(`Nivel ${nivel}: ` +!bool)
    }
}

function pesquisarColecionaveis(colecionavel){

    let bool=true

    switch (colecionavel){

        case 'avatar': 
            listUsers.forEach(user => {
                if (user.colecionaveis.includes(colecionavel)){
                    console.log(user.colecionaveis + bool)
                }
                else{
                    console.log(user.colecionaveis + !bool)
                }
            })
        break

        case 'badge 1': 
        listUsers.forEach(user => {
            if (user.colecionaveis.includes(colecionavel)){
                console.log(user.colecionaveis + bool)
            }
            else{
                console.log(user.colecionaveis + !bool)
            }
        })
        break

        case 'badge 2': 
        listUsers.forEach(user => {
            if (user.colecionaveis.includes(colecionavel)){
                console.log(user.colecionaveis + bool)
            }
            else{
                console.log(user.colecionaveis + !bool)
            }
        })
        break
        
        case 'badge 3': 
        listUsers.forEach(user => {
            if (user.colecionaveis.includes(colecionavel)){
                console.log(user.colecionaveis + bool)
            }
            else{
                console.log(user.colecionaveis + !bool)
            }
        })
        break
    }
}

function mostrarJogadores(colecionavel){
    listUsers.forEach(user => {
        alert("Avatar ou Badges")
        if (user.colecionaveis.includes(colecionavel)){
            alert(user.nome)
        }
    })
}

function listaTabClass() {
    listUsers.sort((a, b) => b.pontos - a.pontos);

    for (let user of listUsers) {
        alert(user.nome + " - " + user.pontos + " pontos")
    }
}

function giveReward(nivel){
    listUsers.forEach(user => {
        if (user.nivel == recompensa){
            user.pontos+=100
            console.log(user.nome + "recebeu 100 pontos")
        }
        else{
            console.log(user.nome + "não recebeu 100 pontos")
        }
    })
}

function sumPontos(){
    let sum=0
    listUsers.forEach(user => {
        sum+=user.pontos
        console.log(sum)
    })
}


listarNivel(nivel)
somarPontos(nivel)
verificarNivel(nivel)
pesquisarColecionaveis(colecionavel)
mostrarJogadores(colecionavel)
listaTabClass()
giveReward(recompensa)
sumPontos()
console.log(listUsers)



