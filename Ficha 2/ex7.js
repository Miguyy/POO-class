let palindromoCalc=()=>{}

    let number
    
    while(true){
       number = +prompt("Introduz um numero entre 100 e 999:")
       if (number >= 100 && number <= 999) {
            break
    }
        else{
            console.log("Numero inválido")
    }
    }

    let strNum=number.toString()
    if (strNum[0]=== strNum[2]){
        console.log("O numero é um palindromo.")
        bool=true
    }
    else{
        console.log("O numero não é um palindromo.")
    }

palindromoCalc()
