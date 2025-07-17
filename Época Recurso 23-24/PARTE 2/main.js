import Conta from "./contaModel.js";
import Seguidor from "./seguidorModel.js";
import Publicacao from "./publicacaoModel.js";

const conta = new Conta("Influencer123");

const s1 = new Seguidor("Joana", 25);
const s2 = new Seguidor("Miguel", 30);
conta.adicionarSeguidor(s1);
conta.adicionarSeguidor(s2);

const p1 = new Publicacao("Dança maluca", "dança");
const p2 = new Publicacao("Piada do dia", "comédia");

conta.adicionarPublicacao(p1);
conta.adicionarPublicacao(p2);

p1.gostarPublicacao();
p1.gostarPublicacao();
p2.gostarPublicacao();

s1.adicionarPublicacao(p1);
s2.adicionarPublicacao(p2);

console.log("Média de idades:", conta.obterMediaIdades());
console.log("Mais gostada:", conta.obterPublicacaoMaisGostada().titulo);
console.log("Género mais gostado:", conta.obterGeneroMaisGostado());
