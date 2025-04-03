let info=[]

const form = document.getElementById("form")

function addtable(valorColestrol, valorHdl, valorTrig, valorLdl, valorRisco) {
    let table = document.querySelector("#tabela")
    table.innerHTML += `
    <tr class="data">
        <td>${valorColestrol}</td>
        <td>${valorHdl}</td>
        <td>${valorTrig}</td>
        <td>${valorLdl}</td>
        <td>${valorRisco}</td>
    </tr>`
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const colestrolTotal = +document.getElementById('colestrolTotal').value
    const hdlTotal = +document.getElementById('hdl').value
    const tgTotal = +document.getElementById('tg').value
    const ldlTotal = +document.getElementById('ldl').value

    const risco = [...document.getElementById('seletorFiltro').selectedOptions].map(option => option.value)

    const novoTeste = { colestrolTotal, hdlTotal, tgTotal, ldlTotal, risco }
    info.push(novoTeste)
    console.log(info)

    addtable(colestrolTotal, hdlTotal, tgTotal, ldlTotal, risco)

    form.reset()
})

function calcResultados(){
    risco=" "
    ldlTotal=0
    ldlTotal=colestrolTotal-hdlTotal-0.2*tgTotal
    if (ldlTotal<115&&ldlTotal>100){
        risco.push("Risco Baixo")
    }
    if (ldlTotal<100&&ldlTotal>70){
        risco.push("Risco Médio")
    }
    if (ldlTotal<70&&ldlTotal>0){
        risco.push("Risco Alto")
    }

    return { ldlTotal, risco }
}


document.getElementById("botaoCalculadora").addEventListener("click", function() {
    const colestrolTotal = +document.getElementById("colestrolTotal").value
    const hdlTotal = +document.getElementById("hdl").value
    const tgTotal = +document.getElementById("tg").value

    const { ldlTotal } = calcResultados(colestrolTotal, hdlTotal, tgTotal)

    document.getElementById("ldl").value = ldlTotal.toFixed(2)
})



