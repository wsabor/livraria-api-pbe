const Pessoa = require("./Pessoa");

const BONUS_PERCENTUAL = 0.1;
class Funcionario extends Pessoa {
  #salario;

  constructor(nome, email, salario) {
    super(nome, email);
    this.#salario = salario;
  }

  get salario() {
    return this.#salario;
  }

  calcularBonus() {
    return this.#salario * BONUS_PERCENTUAL;
  }

  apresentar() {
    super.apresentar();
    console.log("Tipo: Funcionario");
    console.log("Bonus: R$ " + this.calcularBonus().toFixed(2));
  }
}

module.exports = Funcionario;