class Pessoa {
  #email;

  constructor(nome, email) {
    this.nome = nome;
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  apresentar() {
    console.log("Nome: " + this.nome);
    console.log("Email: " + this.#email);
  }
}

module.exports = Pessoa;