const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const Nota = require('./models/Nota');

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares

app.use(cors());
app.use(express.json());
const notasRoutes = require('./routes/notas.routes');
app.use('/api/notas', notasRoutes);

//Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

//Conectar a la base de datos y sincronizar modelos
sequelize.sync()
.then(() => {
    console.log('Conexion a la base de datos exitosa y modelo sincronizado');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});