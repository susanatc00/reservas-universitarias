import { useState } from "react";
export default function FormReserva({ espacios, onCrear }) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [espacioId, setEspacioId] = useState(espacios[0]?.id || "");
  function submit(e){
    e.preventDefault();
    if(!nombre||!fecha||!hora||!espacioId){ alert("Todos los campos son obligatorios."); return; }
    onCrear({ nombre, fecha, hora, espacioId }); setNombre("");
  }
  return (
    <form onSubmit={submit} style={{ display:"grid", gap:12, maxWidth:420 }}>
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
