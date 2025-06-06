//Class de actores
export class Actor{
    nomeActor = []
    constructor(nomeActor){
        this.nomeActor = nomeActor
    }

    //Função add novo actor
    adicionarNovoActor(nomeActor){
        this.nomeActor.push(nomeActor); //adiciona o novo nome do actor ao array
        
    }

    //Função listar actores
    listarActores(){
        let lista = [];
        for(let i = 0; i < this.nomeActor.length; i++){
            lista.push({
                nome: this.nomeActor[i]
            });
        }
        return lista;
    }
}

