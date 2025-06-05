export class Paciente{
    nome = ''
    id = ''
    consultas = []
    constructor(nome, id , consultas){
        this.nome = nome
        this.id = id
        this.consultas = []
    }
    adicionarConsulta(consulta){
        this.consultas.push(consulta)
    }
    marcarConsultaComoRealizada(dataConsulta) {
        this.consultas = this.consultas.filter(c => c.data !== dataConsulta);
    }
}