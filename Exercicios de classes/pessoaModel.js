class Pessoa {
    nome = ''
    idade = 0
    constructor(nome, idade){
        this.nome = nome
        this.idade = idade
        
    }
    
}

const pessoa = new Pessoa ('João', 25)
console.log("Olá, o meu nome é " + pessoa.nome + " e tenho " + pessoa.idade + " anos.")

function fazerAniversario(pessoa){
    pessoa.idade =+ 1
}

pessoa.fazerAniversario(pessoa)
pessoa.setNome ("João Magalhães")

console.log(pessoa.nome + pessoa.idade)


