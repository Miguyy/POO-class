let numeros= +prompt("Vai introduzindo numeros.")
let num0=0

let numMenor=numeros
let numMaior=numeros

while(numeros !== num0){
    if (numeros>numMaior){
        numMaior=numeros
    }
    if (numeros<numMenor){
        numMenor=numeros
    }
    numeros= +prompt("Vai introduzindo numeros.")
}

console.log(`O maior numero é: ${numMaior} e o menor é: ${numMenor}`) 