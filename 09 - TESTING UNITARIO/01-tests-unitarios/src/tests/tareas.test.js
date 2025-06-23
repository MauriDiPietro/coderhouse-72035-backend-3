import { assert, expect } from "chai";
import { Tareas } from "../utils/tareas.js";

describe("tests unitarios de tareas", () => {
  it("Debería crear el contenedor de tareas vacio", () => {
    //etapa de preparación
    const tareas = new Tareas();

    //etapa de ejecución
    const listadoTareas = tareas.list();

    //etapa de verificación o afirmacion
    expect(listadoTareas).to.have.length(0);

    assert.lengthOf(
      listadoTareas,
      0,
      "El listado de tareas debería estar vacío al inicio"
    );
  });

  it("Debería agregar tareas correctamente", () => {
    const tareas = new Tareas();

    tareas.add("Tarea 1");

    assert.strictEqual(tareas.list().length, 1);
    // console.log(tareas.list());

    tareas.add("Tarea 2");

    assert.equal(tareas.list().length, 2);
  });

  it("Debería marcar como complete una tarea", () => {
    const tareas = new Tareas();

    tareas.add("Tarea 1");
    tareas.add("Tarea 2");

    tareas.complete("Tarea 1");

    assert.deepStrictEqual(tareas.list(), [
      { title: "Tarea 1", complete: true },
      { title: "Tarea 2", complete: false },
    ]);
  });

  it('Deberia dar un error al intentar completar una tarea inexistente', ()=>{
    const tareas = new Tareas();

    tareas.add("Tarea 1");
    tareas.add("Tarea 2");

    assert.throws(() => {
      tareas.complete("Tarea 3");
    }, Error, "Tarea no encontrada");

    assert.throws(() => {
      tareas.complete("Tarea 4");
    }, Error, "Tarea no encontrada");
  })    
});
