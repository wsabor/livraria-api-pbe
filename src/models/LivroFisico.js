const Livro = require("./Livro");

const TAXA_FRETE_POR_KG = 2.5;
class LivroFisico extends Livro {
    #peso;

    constructor(titulo,autor, preco, estoque, peso, categoria) {
        super(titulo, autor, preco, estoque, categoria); //Chamando o construtor da classe Mãe
        this.#peso = peso;
    }

    get peso() {
        return this.#peso;
    }

    calcularFrete(){
        return this.#peso * TAXA_FRETE_POR_KG;
    }

    descrever() {
        super.descrever();
        console.log("Tipo: Físico");
        console.log("Peso " + this.#peso + "kg");
    }
}

module.exports = LivroFisico;