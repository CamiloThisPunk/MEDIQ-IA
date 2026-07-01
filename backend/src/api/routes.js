const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// Pacientes
router.post('/pacientes', controllers.createPaciente);
router.get('/pacientes/:id', controllers.getPaciente);

// Evaluaciones
router.post('/evaluaciones', controllers.createEvaluacion);
router.get('/evaluaciones/:id', controllers.getEvaluacion);
router.get('/evaluaciones/:id/explicacion/stream', controllers.streamExplicacion);
router.get('/evaluaciones/:id/referencia', controllers.getPDF);

// Traducción
router.post('/traducir/stream', controllers.streamTraduccion);

module.exports = router;
