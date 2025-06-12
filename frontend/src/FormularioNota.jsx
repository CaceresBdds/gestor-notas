import { useState, useEffect } from "react";
import axios from "axios";

function FormularioNota({ onNotaAgregada, notaEnEdicion, onNotaEditada }) {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    // Si entra una nota para editar, cargamos sus datos
    useEffect(() => {
        if (notaEnEdicion) {
            setTitulo(notaEnEdicion.titulo);
            setContenido(notaEnEdicion.contenido);
        } else {
            setTitulo("");
            setContenido("");
        }
    }, [notaEnEdicion]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        if (notaEnEdicion) {
            // Editar nota existente (PUT)
            axios
                .put(`http://localhost:3001/api/notas/${notaEnEdicion.id}`, {
                    titulo,
                    contenido,
                })
                .then(() => {
                    onNotaEditada({
                        id: notaEnEdicion.id,
                        titulo,
                        contenido,
                    });
                    setTitulo("");
                    setContenido("");
                })
                .catch((err) => {
                    console.error("Error al editar nota:", err);
                });
        } else {
            // Crear nueva nota (POST)
            axios
                .post("http://localhost:3001/api/notas", {
                    titulo,
                    contenido,
                })
                .then((res) => {
                    onNotaAgregada(res.data);
                    setTitulo("");
                    setContenido("");
                })
                .catch((err) => {
                    console.error("Error al crear nota:", err);
                });
        }
    };

    return (
        <form onSubmit={manejarSubmit} style={{ marginBottom: "2rem" }}>
            <h3>{notaEnEdicion ? "Editar Nota" : "Nueva Nota"}</h3>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <br />
            <textarea
                placeholder="Contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
            />
            <br />
            <button type="submit">
                {notaEnEdicion ? "Guardar Cambios" : "Agregar Nota"}
            </button>
        </form>
    );
}

export default FormularioNota;
