import { useEffect, useState } from "react";
import axios from "axios";
import FormularioNota from "./FormularioNota";

function Notas() {
  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/notas")
      .then((res) => {
        setNotas(res.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener notas:", error);
        setCargando(false);
      });
  }, []);

  const agregarNota = (nuevaNota) => {
    setNotas([...notas, nuevaNota]);
  };



  return (
 <div>
            <FormularioNota onNotaAgregada={agregarNota} />

            <h2>Notas</h2>
            {cargando ? (
                <p>Cargando notas...</p>
            ) : notas.length === 0 ? (
                <p>No hay notas disponibles.</p>
            ) : (
                <ul>
                    {notas.map((nota) => (
                        <li key={nota.id}>
                            <strong>{nota.titulo}</strong>
                            <p>{nota.contenido}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
  );
}

export default Notas;
