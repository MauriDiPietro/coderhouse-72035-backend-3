class Calculadora {
  checkearValores(num1, num2) {
    const verificacion1 = isNaN(num1);
    const verificacion2 = isNaN(num2);
    if (verificacion1 || verificacion2) return true;
    return false;
  }

  suma(num1, num2) {
    if (this.checkearValores(num1, num2))
      throw new Error("Los valores no son números");
    return num1 + num2;
  }

  resta(num1, num2) {
    if (this.checkearValores(num1, num2))
      throw new Error("Los valores no son números");
    return num1 - num2;
  }
}

export const calculadora = new Calculadora();

