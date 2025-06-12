import { useEffect, useState } from "react";
import axios from "axios";
import FormularioNota from './FormularioNota';

function Notas() {
    const [notas, setNotas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [notaEnEdicion, setNotaEnEdicion] = useState(null); 

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

    const eliminarNota = (id) => {
        axios
            .delete(`http://localhost:3001/api/notas/${id}`)
            .then(() => {
                setNotas(notas.filter((nota) => nota.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar la nota:", error);
            });
    };

    const actualizarNota = (notaActualizada) => {
        axios
            .put(`http://localhost:3001/api/notas/${notaActualizada.id}`, {
                titulo: notaActualizada.titulo,
                contenido: notaActualizada.contenido
            })
            .then(() => {
                setNotas(
                    notas.map((nota) =>
                        nota.id === notaActualizada.id ? notaActualizada : nota
                    )
                );
                setNotaEnEdicion(null); // Salimos del modo edición
            })
            .catch((error) => {
                console.error("Error al actualizar la nota:", error);
            });
    };

    const manejarEdicion = (nota) => {
        setNotaEnEdicion(nota);
    };

    return (
        <div>
            <FormularioNota
                onNotaAgregada={agregarNota}
                notaEnEdicion={notaEnEdicion}
                onNotaEditada={actualizarNota}
            />

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
                            <button onClick={() => manejarEdicion(nota)}>
                                Editar
                            </button>
                            <button onClick={() => eliminarNota(nota.id)}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notas;
