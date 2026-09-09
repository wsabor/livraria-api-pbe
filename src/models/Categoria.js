const TAMANHO_MINIMO_NOME_CATEGORIA = 3; // É uma constante para validação do nome da categoria
class Categoria { // Nome claro, evidencia
    #nome;
    #descricao; // Encapsulamento correto

    constructor(nome, descricao) {
        this.#nome = nome;
        this.#descricao = descricao;
    }

    // ----- LEITURA (getters) -----

    get nome() {
        return this.#nome;
    }

    get descricao() {
        return this.#descricao;
    }

    // ----- ESCRITA COM VALIDAÇÃO (setter) -----

    set nome(novoNome) {
        if (novoNome.length < TAMANHO_MINIMO_NOME_CATEGORIA) {
            console.log("ERRO: o nome da categoria precisa de pelo menos " + TAMANHO_MINIMO_NOME_CATEGORIA + " letras.");
            return;
        }
        this.#nome = novoNome;
    }

    // ----- MÉTODO -----

    descrever(){ //Método curto já está bem definido
        console.log("Categoria: " + this.#nome);
        console.log("Descricao: " + this.#descricao);
    }
}

module.exports = Categoria;