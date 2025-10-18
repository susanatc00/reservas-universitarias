import { describe, it, expect } from "vitest";
function esDuplicada(lista, nueva){
  return lista.some(r => r.fecha===nueva.fecha && r.hora===nueva.hora && r.espacioId===nueva.espacioId);
}
describe("Regla de duplicados", ()=>{
  it("detecta reservas duplicadas", ()=>{
    const reservas=[{fecha:"2025-10-21",hora:"10:00",espacioId:"aula-101"}];
    const nueva   ={fecha:"2025-10-21",hora:"10:00",espacioId:"aula-101"};
    expect(esDuplicada(reservas, nueva)).toBe(true);
  });
});
