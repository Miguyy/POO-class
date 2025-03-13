genero= prompt("Introduza o seu género (M/F): ")
altura=+prompt("Introduza a sua altura em cm: ")
peso=+prompt("Introduza o seu peso em kg: ")
idade=+prompt("Introduza a sua idade: ")

calcTMB=0

switch (genero){
    case 'M':
        calcTMB= 10 * peso + 6.25 * altura - 5 * idade + 5
        break
    case 'F':
        calcTMB= 10 * peso + 6.25 * altura - 5 * idade - 161
        break
}

alert(`O seu TMB é: ${calcTMB}`)
