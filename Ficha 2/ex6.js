texto= prompt("Insira um texto:")
palavra=prompt("Insira uma palavra do texto: ")

function findWord(texto,palavra){
    let contagem=0
    let pesquisa=texto.split(" ")
    for (i=0; i<pesquisa.length; i++){
        if(pesquisa[i]==palavra){
            contagem++
        }
    }
    console.log("A palavra " +palavra+ " aparece " +contagem+ " vezes no texto.")
}

findWord(texto,palavra)