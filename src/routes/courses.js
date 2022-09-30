// Importaciones necesarias
const express = require('express');
const router = express.Router();

const controllerCourses = require('../controllers/courses')

// Definicio de rutas

router.get('', controllerCourses.allCourses)

router.get('/search', controllerCourses.searchCourses)

router.post('/create', controllerCourses.createCourses)

router.post('/createModule', controllerCourses.createModule)

router.post('/createLesson', controllerCourses.addLesson)

router.get('/content', controllerCourses.getContent)

router.get('/leccion', controllerCourses.getLesson)

// Exportamos todas las rutas
module.exports = router; 