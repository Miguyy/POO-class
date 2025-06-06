//Class série
export class Serie{
    nomeSerie = ''
    anoLancamento = ''
    capa = []
    constructor(nomeSerie, anoLancamento, capa){
        this.nomeSerie = nomeSerie
        this.anoLancamento = anoLancamento
        this.capa = capa
    }
    //Função de add série
    adicionarNovaSerie(nomeSerie, anoLancamento, capa){
        this.nomeSerie.push(nomeSerie) 
        this.anoLancamento.push(anoLancamento)
        this.capa.push(capa) 
    }

    //Função de listar séries
    listarSeries(){
        let lista = []
        for(let i = 0; i < this.nomeSerie.length; i++){
            lista.push({
                nome: this.nomeSerie[i],
                ano: this.anoLancamento[i],
                imagem: this.capa[i]
            })
        }
        return lista
    }
}