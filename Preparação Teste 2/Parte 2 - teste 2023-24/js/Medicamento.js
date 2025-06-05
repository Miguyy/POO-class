export class Medicamento {
    nome = ''
    totalComprimidos = 0
    dosagem = 0
    frequencia = ''
    horaToma = ''
    constructor(nome, totalComprimidos, dosagem, frequencia, horaToma){
        this.nome = nome
        this.totalComprimidos = totalComprimidos
        this.dosagem = dosagem
        this.frequencia = frequencia
        this.horaToma = horaToma
    }
}


