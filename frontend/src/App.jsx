import { useEffect, useState } from 'react';

function App() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/notas')
    .then((res) => res.json())
    .then((data) => setNotas(data))
    .catch((err) => console.error('Error al obtener notas:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Notas</h1>
      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ):(
        <ul>
          {notas.map((nota) => (
            <li key={nota.id}>
              <strong>{nota.titulo}</strong><br />
              <span>{nota.contenido}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App;