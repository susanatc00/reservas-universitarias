export default function ListaEspacios({ espacios, onSeleccionar }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h3>Espacios disponibles</h3>
      {espacios.map(e => (
        <div
          key={e.id}
          onClick={() => onSeleccionar(e.id)}
          style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, cursor: "pointer" }}
        >
          <strong>{e.nombre}</strong> - {e.tipo}
        </div>
      ))}
    </div>
  );
}
