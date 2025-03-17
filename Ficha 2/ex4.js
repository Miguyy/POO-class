let num = +prompt("Indique um numero inteiro para a tabuada: ")
let tabuada

if (num = " "){
    num=10
}

function showTabuada(){
    for (let i = 1; i<=10;i++){
        tabuada = num * i
        console.log(tabuada)
    }
}

showTabuada()