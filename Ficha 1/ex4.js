num = +prompt("Indique um número positivo e inteiro: ")
numPerfeito=0

if (num < 0 || num % 1 !==0){
    console.log("Numero inserido inválido.")
}

for (let i = 1; i < num; i++){
    if (num % i === 0){
        numPerfeito += i
    }
}

if (numPerfeito !== num){
    console.log(`O número ${num} não é perfeito.`)
}
else{
    console.log(`O número ${num} é perfeito.`)
}


