const compra = {
    nomeProducto: prompt("Introduza o nome do producto: ") ,
    catProducto: prompt("Introduza a categoria do producto: "),
    dadosEncomenda:{
        dataEncomenda: '2023-03-27',
        prazoEntrea: '(7) dias',
        localEntrega: 'Avenida do Mar, 74, 4460-810 Matosinhos'
    }
}

compra.precoBase=2.50
compra.txIva=0.23
compra.precoFinal=(compra.precoBase*(compra.txIva)).toFixed(2)

function showLength() {
    console.log(`Existem ${Object.keys(compra).length} propriedades`)
}

function showProperties(){
    for (const prop in compra){
        console.log(prop)
    }
}

function removeProp(dadosEncomenda){
    delete compra.dadosEncomenda
}

showLength()
console.log(" ")
showProperties()
console.log(" ")
removeProp(compra.dadosEncomenda)
console.log(" ")
console.log(" ")
console.log(compra)
console.log(compra.precoBase)
console.log(compra.txIva)
console.log(compra.precoFinal)
console.log(compra.dadosEncomenda)

