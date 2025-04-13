let item = []

const form = document.getElementById("formulario-calculo")

function calcTotal(quantidade, precoUnitario) {
    return quantidade * precoUnitario
}

function addtable(produtoValue, quantidadeValue, precoUnitarioValue, totalValue){
    let table = document.querySelector("#tabela-historico")
    table.innerHTML += `
        <tr class="data">
            <td>${produtoValue}</td>
            <td>${quantidadeValue}</td>
            <td>${precoUnitarioValue}</td>
            <td>${totalValue}</td>
            <td><button onclick="removerHistorico(this)">Remover Historico</button></td>
        </tr>`
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const produto = document.getElementById('produto').value
    const quantidade = parseFloat(document.getElementById('quantidade').value)
    const precoUnitario = parseFloat(document.getElementById('preco').value)
    const total = calcTotal(quantidade, precoUnitario)

    const novoForm = {produto, quantidade, precoUnitario, total }

    item.push(novoForm)
    console.log(item)

    addtable(produto, quantidade, precoUnitario, total )

    form.reset()
    document.getElementById("total").value = total.toFixed(2) + " €"
    setTimeout(() => {
        form.reset()
        document.getElementById("total").value = ""
    }, 0)
    localStorage.setItem("items", JSON.stringify(item))

})

function removerHistorico(botao) {
    botao.parentElement.parentElement.remove()
    localStorage.clear("items", JSON.stringify(item))
} 


window.addEventListener('DOMContentLoaded', () => {
    let items = JSON.parse(localStorage.getItem("items")|| "[]")

    if (items.length > 0) {
        item = items 
        items.forEach(produtos => {
            addtable(produtos.produto, produtos.quantidade, produtos.precoUnitario, produtos.total)
        })
    }
})


