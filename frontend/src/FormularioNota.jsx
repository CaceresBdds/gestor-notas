import { useState } from 'react'
import axios from 'axios';

function FormularioNota() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();

        try {
            const nuevaNota = { titulo, contenido };
            const resuesta = await axios.put('http://localhost:3001/api/notas', nuevaNota);

            onNotaAgregada(respuesta.data);
            setTitulo('');
            setContenido('');
        } catch (error) {
            console.error('Error al agregar nota:', error);   
        }
    };

    return (
        <form onSubmit={manejarEnvio} style={{ marginBottom: '2rem' }}>
            <h2>Agregar nueva nota</h2>
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
            ></textarea>
            <br />
            <button type="submit">Guardar Nota</button>
        </form>
    );
};

export default FormularioNota;