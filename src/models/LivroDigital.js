const Livro = require("./Livro");

class LivroDigital extends Livro {
    #tamanhoArquivo;

    constructor(titulo, autor, preco, estoque, tamanhoArquivo, categoria) {
        super(titulo, autor, preco, estoque, categoria);
        this.#tamanhoArquivo = tamanhoArquivo;
    }

    get tamanhoArquivo() {
        return this.#tamanhoArquivo;
    }

    calcularFrete() {
        return 0;
    }

    descrever() {
        super.descrever();
        console.log("Tipo: Digital");
        console.log("Tamanho do dowload: " + this.#tamanhoArquivo + "MB");
    }
}

module.exports = LivroDigital;