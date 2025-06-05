export class Paciente {
  nomePaciente = ''
  id = ''
  medicamentos = []

  constructor(nomePaciente, id) {
    this.nomePaciente = nomePaciente
    this.id = id
    this.medicamentos = []
  }

  adicionarMedicamento(medicamento) {
    this.medicamentos.push({ ...medicamento, tomasFeitas: 0 })
  }

  tomarMedicamento(nomeMedicamento) {
    const med = this.medicamentos.find(m => m.nome === nomeMedicamento)
    if (!med) return

    med.tomasFeitas++

    const tomasPorDia = parseInt(med.frequencia.match(/\d+/)?.[0] || 1)
    const totalTomas = Math.ceil(med.totalComprimidos / med.dosagem)

    if (med.tomasFeitas >= totalTomas) {
      this.medicamentos = this.medicamentos.filter(m => m.nome !== nomeMedicamento)
      alert(`O medicamento "${med.nome}" foi concluído e removido.`)
    }
  }
}
