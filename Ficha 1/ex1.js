function sum(limInf,limSup){
    let sum = 0
    for(let i = limInf; i <= limSup; i++){
        sum += i
    }
    return sum;
}

let num1 = parseInt(prompt("Introduz um numero: "))
let num2 = parseInt(prompt("Introduz um numero: "))

console.log(sum(num1,num2))



