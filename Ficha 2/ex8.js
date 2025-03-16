numero=+prompt("Introduza um numero: ")
function factorial(){
    let factorial=1
    for(let i=1;i<=numero;i++){
        factorial = numero*i 
    }
    console.log(factorial)
}
factorial()