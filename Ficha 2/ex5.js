function calcSoma(){
    soma=0

    for(i=0;i<arguments.length;i++){
        soma+=arguments[i]
    }
    return soma
}

console.log(calcSoma(1,2,3,4,5,6,7,8,9,10)) //exemplo

