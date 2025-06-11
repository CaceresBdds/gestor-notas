const express = require('express');
const router = express.Router();
const Nota = require('../models/Nota');

//Obtener todas las notas
router.get('/', async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
});

// Crear una nueva nota
router.post('/', async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const nuevaNota = await Nota.create({ titulo, contenido });
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la nota' });
    }
});

// Actualizar una nota por ID
router.put('/:id', async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const nota = await Nota.findByPk(req.params.id);
        if (!nota) return res.status(404).json({ error: 'Nota no encontrada' });

        nota.titulo = titulo;
        nota.contenido = contenido;
        await nota.save();

        res.json(nota);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
});

// Eliminar una nota por ID
router.delete('/:id', async (req, res) => {
    try {
        const nota = await Nota.findByPk(req.params.id);
        if (!nota) return res.status(404).json({ error: 'Nota no encotrada' })

        await nota.destroy();
        res.json({ mensaje: 'Nota eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la nota' });
    }
});

module.exports = router;