import { calculadora } from "../calculadora.js";

describe('Conjunto de pruebas Calculadora', ()=>{
    it('Deberia poder sumar dos números', ()=>{
        //etapa de preparación
        const num1 = 5;
        const num2 = 10;
        const resultadoEsperado = 15;

        //etapa de ejecución
        const resultado = calculadora.suma(num1, num2);

        //etapa de verificación
        expect(resultado).toBe(resultadoEsperado);
        expect(resultado).not.toBeNull();
        expect(resultado).not.toBeUndefined();
        expect(resultado).not.toBeNaN();
        expect(resultado).toBeGreaterThan(14);
        expect(resultado).toBeLessThan(16);
    })

    it('Deberia responder con error al sumar valores no numéricos', ()=>{
        const arg1 = "HOLA";
        const arg2 = 2;
        const errorEsperado = "Los valores no son números";
        expect(()=>calculadora.suma(arg1, arg2)).toThrow();
        expect(()=>calculadora.suma(arg1, arg2)).toThrow(Error);
        expect(()=>calculadora.suma(arg1, arg2)).toThrow(errorEsperado);
    })

    it('Deberia retornar false al verificar valores no numéricos', ()=>{
        const arg1 = "HOLA";
        const arg2 = 2;
        const resultadoEsperado = true;
        const resultado = calculadora.checkearValores(arg1, arg2);
        expect(resultado).toBe(resultadoEsperado);
    })
})