let num = +prompt("Indique um numero inteiro para a tabuada: ")
let tabuada

function showTabuada(){
    for (let i = 1; i<=10;i++){
        tabuada = num * i
        console.log(tabuada)
        if (num = " "){
            tabuada = 10 * i
            console.log(tabuada)
        }
    }
}

showTabuada()