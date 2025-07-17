// modelPaises.js

export default class Pais {
  constructor(id, nomePais, continente) {
    this.id = id;
    this.nomePais = nomePais;
    this.continente = continente;
  }

  // Devolve países filtrados por continente
  listaPaises(paisesArray, continente) {
    return paisesArray.filter(p => p.continente === continente);
  }

  // Adiciona país, validando duplicados
  adicionarPais(paisesArray, novoPais) {
    const paisExistente = paisesArray.find(p =>
      p.nomePais.toLowerCase() === novoPais.nomePais.toLowerCase()
    );

    if (paisExistente) {
      throw new Error("País já existe!");
    } else {
      paisesArray.push(novoPais);
    }
  }
}
