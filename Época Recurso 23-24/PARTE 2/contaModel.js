import Seguidor from "./seguidorModel.js";
import Publicacao from "./publicacaoModel.js";

export default class Conta {
    constructor(nome) {
        this.nome = nome;
        this.seguidores = [];
        this.publicacoes = [];
    }

    adicionarSeguidor(seguidor) {
        this.seguidores.push(seguidor);
    }

    obterMediaIdades() {
        const total = this.seguidores.reduce((sum, s) => sum + s.idade, 0);
        return this.seguidores.length > 0 ? total / this.seguidores.length : 0;
    }

    removerSeguidor(nome) {
        this.seguidores = this.seguidores.filter(s => s.nome !== nome);
    }

    obterNumeroSeguidoresUltimoAno() {
        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);
        return this.seguidores.filter(s => s.dataCriacao > umAnoAtras).length;
    }

    adicionarPublicacao(publicacao) {
        this.publicacoes.push(publicacao);
    }

    obterNomeSeguidorMaisPublicacoes() {
        let mais = null;
        let max = 0;
        this.seguidores.forEach(s => {
            const count = s.obterNumeroPublicacoes();
            if (count > max) {
                max = count;
                mais = s.nome;
            }
        });
        return mais;
    }

    listarPublicacoes(genero) {
        return this.publicacoes
            .filter(p => p.genero === genero)
            .map(p => p.titulo);
    }

    obterPublicacaoMaisGostada() {
        return this.publicacoes.reduce((maisGostada, atual) =>
            (maisGostada.gostos > atual.gostos) ? maisGostada : atual
        , this.publicacoes[0] || null);
    }

    obterGeneroMaisGostado() {
        const mapa = {};
        this.publicacoes.forEach(p => {
            mapa[p.genero] = (mapa[p.genero] || 0) + p.gostos;
        });

        let generoMais = null;
        let max = 0;
        for (const genero in mapa) {
            if (mapa[genero] > max) {
                max = mapa[genero];
                generoMais = genero;
            }
        }

        return generoMais;
    }
}


