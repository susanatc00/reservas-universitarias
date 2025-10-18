import { useEffect, useMemo, useState } from "react";
import espaciosData from "./data/espacios.json";
import { cargarReservas, guardarReservas } from "./utils/storage";
import "./App.css";

function FormReserva({ espacios, onCrear }) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [espacioId, setEspacioId] = useState(espacios[0]?.id || "");

  function submit(e) {
    e.preventDefault();
    if (!nombre || !fecha || !hora || !espacioId) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    const hoy = new Date().toISOString().slice(0,10);
    if (fecha < hoy) {
      alert("No puedes reservar en fechas pasadas.");
      return;
    }
    onCrear({ nombre, fecha, hora, espacioId });
    setNombre("");
  }

  return (
    <form onSubmit={submit} style={{ display:"grid", gap:12, maxWidth:400 }}>
      <h3>Crear reserva</h3>
      <input placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
      <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} />
      <input type="time" value={hora} onChange={e=>setHora(e.target.value)} />
      <select value={espacioId} onChange={e=>setEspacioId(e.target.value)}>
        {espacios.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
      <button>Reservar</button>
    </form>
  );
}

export default function App() {
  const [espacios] = useState(espaciosData);
  const [reservas, setReservas] = useState(cargarReservas());
  const [seleccion, setSeleccion] = useState(null);
  const [ultimaReserva, setUltimaReserva] = useState(null);

  useEffect(() => guardarReservas(reservas), [reservas]);

  const espacioSeleccionado = useMemo(
    () => espacios.find(e => e.id === seleccion),
    [seleccion, espacios]
  );

  function esDuplicada(lista, nueva) {
    return lista.some(r => r.fecha === nueva.fecha && r.hora === nueva.hora && r.espacioId === nueva.espacioId);
  }

  function crearReserva(data) {
    if (esDuplicada(reservas, data)) {
      alert("Reserva duplicada (misma fecha, hora y espacio).");
      return;
    }
    const nueva = { id: crypto.randomUUID(), ...data };
    setReservas([...reservas, nueva]);
    setUltimaReserva(nueva);
    setSeleccion(data.espacioId);
  }

  function cancelarReserva(id) {
    setReservas(reservas.filter(r => r.id !== id));
  }

  return (
    <>
      <header className="app-header">
        {String.fromCodePoint(0x1F496)} Sistema de Reservas Universitarias
      </header>

      <main style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, padding:24, marginTop:"70px" }}>
        <div>
          <h2>Espacios Disponibles</h2>
          {espacios.map(e => (
            <div key={e.id} onClick={() => setSeleccion(e.id)}
                style={{ border:"1px solid #ddd", borderRadius:8, padding:10, marginBottom:8, cursor:"pointer", background:"white" }}>
              <strong>{e.nombre}</strong> - {e.tipo}
            </div>
          ))}
          <hr/>
          <h3>Mis reservas</h3>
          {reservas.length === 0 && <p>No tienes reservas.</p>}
          {reservas.map(r => {
            const esp = espacios.find(e => e.id === r.espacioId);
            return (
              <div key={r.id} className="reserva">
                {r.fecha} {r.hora} - <b>{esp?.nombre}</b> - {r.nombre}
                <button onClick={() => cancelarReserva(r.id)}>Cancelar</button>
              </div>
            );
          })}
        </div>

        <div>
          <FormReserva espacios={espacios} onCrear={crearReserva} />
          {ultimaReserva && espacioSeleccionado && (
            <div className="reserva-confirmada">
              <h3>Reserva confirmada</h3>
              <p><b>Nombre:</b> {ultimaReserva.nombre}</p>
              <p><b>Fecha:</b> {ultimaReserva.fecha} - <b>Hora:</b> {ultimaReserva.hora}</p>
              <p><b>Espacio:</b> {espacioSeleccionado.nombre}</p>
              <img src={espacioSeleccionado.imagen} alt={espacioSeleccionado.nombre}
                   style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"16px", display:"block", margin:"12px auto", marginTop:"8px" }} />
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        Hecho con React {String.fromCodePoint(0x1F4BB)} por Susana — 2025
      </footer>
    </>
  );
}
