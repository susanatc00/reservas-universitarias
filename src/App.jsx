import { useEffect, useMemo, useState } from "react";
import espaciosData from "./data/espacios.json";
import { cargarReservas, guardarReservas } from "./utils/storage";
import FormReserva from "./components/FormReserva";
import ListaEspacios from "./components/ListaEspacios";
import Confirmacion from "./components/Confirmacion";

export default function App(){
  const [espacios] = useState(espaciosData);
  const [reservas, setReservas] = useState(cargarReservas());
  const [seleccion, setSeleccion] = useState(null);
  const [ultimaReserva, setUltimaReserva] = useState(null);

  useEffect(()=>guardarReservas(reservas), [reservas]);
  const espacioSeleccionado = useMemo(() => espacios.find(e=>e.id===seleccion), [seleccion, espacios]);

  function esDuplicada(lista, nueva){
    return lista.some(r => r.fecha===nueva.fecha && r.hora===nueva.hora && r.espacioId===nueva.espacioId);
  }

  function crearReserva(data){
    const hoy = new Date().toISOString().slice(0,10);
    if(data.fecha < hoy){ alert("No puedes reservar en fechas pasadas."); return; }
    if(esDuplicada(reservas, data)){ alert("Reserva duplicada."); return; }
    const nueva = { id: crypto.randomUUID(), ...data };
    setReservas([...reservas, nueva]);
    setUltimaReserva(nueva);
    setSeleccion(data.espacioId);
  }

  function cancelarReserva(id){ setReservas(reservas.filter(r=>r.id!==id)); }

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, padding:24 }}>
      <div>
        <ListaEspacios espacios={espacios} onSeleccionar={setSeleccion} />
        <hr/><h3>Mis reservas</h3>
        {reservas.length===0 && <p>No tienes reservas.</p>}
        {reservas.map(r=>{
          const esp = espacios.find(e=>e.id===r.espacioId);
          return (
            <div key={r.id} style={{ border:"1px solid #ddd", padding:8, borderRadius:8, marginBottom:8 }}>
              {r.fecha} {r.hora} — <b>{esp?.nombre}</b> — {r.nombre}
              <button style={{ marginLeft:12 }} onClick={()=>cancelarReserva(r.id)}>Cancelar</button>
            </div>
          );
        })}
      </div>
      <div>
        <FormReserva espacios={espacios} onCrear={crearReserva} />
        <div style={{ height:16 }} />
        <Confirmacion espacio={espacioSeleccionado} reserva={ultimaReserva} />
      </div>
    </div>
  );
}
