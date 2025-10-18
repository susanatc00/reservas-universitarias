
const KEY = "reservas_v1";
export function cargarReservas(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
export function guardarReservas(r){ localStorage.setItem(KEY, JSON.stringify(r)); }

