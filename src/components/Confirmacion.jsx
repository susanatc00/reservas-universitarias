export default function Confirmacion({ espacio, reserva }) {
  if(!espacio || !reserva) return null;
  return (
    <div style={{ border:"1px solid #4caf50", padding:12, borderRadius:8 }}>
      <h3>Reserva confirmada</h3>
      <p><b>Nombre:</b> {reserva.nombre}</p>
      <p><b>Fecha:</b> {reserva.fecha} — <b>Hora:</b> {reserva.hora}</p>
      <p><b>Espacio:</b> {espacio.nombre}</p>
      <img src={espacio.imagen} alt={espacio.nombre} style={{ width:"100%", maxWidth: "100%" }} />
    </div>
  );
}
