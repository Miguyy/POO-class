texto=prompt("Introduza um texto:");

function showInverse(texto){
    inversoTexto= texto.split(" ").reverse().join(" ")
    return inversoTexto
}

alert(showInverse(texto));