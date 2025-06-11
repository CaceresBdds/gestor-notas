import { useeffect, useState } from "react";
import axios from "axios";

function Notas() {
    const [notas, setNotas] = useSate([]);
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

    if (cargando) return <p>Cargando notas...</p>;
    if (notas.length === 0) return <p>No hay notas disponibles.</p>;

    return(
        <div>
            <h2>Notas</h2>
            <ul>
                {notas.map((nota) => (
                    <li key={nota.id}>
                        <strong>{nota.titulo}</strong>
                        <p>{nota.contenido}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notas;