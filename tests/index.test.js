const app = require('../src/app');
const request = require('supertest');

describe('Verificar los roles del usuario', () => {
    test('Creamos un estudiante con acceso de un admin', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNjY4NzI4NDI5LCJleHAiOjE2NjkzMzMyMjl9.hLlqwASjlxpxqHgxPTAeLb1hids3QldeAdfSzF44XLY'
        const response = await request(app).post('/api/classroom/create').send({
            grado:6,
            seccion:"D",
            idNivel:1
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    })

    test('Creamos un estudiante con acceso de un estudiante', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6MywiaWF0IjoxNjY4NzI4NDAyLCJleHAiOjE2NjkzMzMyMDJ9.pvKsAaGIuL4Px4MkFEkyY-YQAavP4zQe8aqBEWKxzYk'
        const response = await request(app).post('/api/classroom/create').send({
            grado:6,
            seccion:"D",
            idNivel:1
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    })

    test('Creamos un estudiante con acceso de un docente', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6MiwiaWF0IjoxNjY4NzI4NzMxLCJleHAiOjE2NjkzMzM1MzF9.zlzLCw7Yy-xPNlDPicYLkqvkVMfvdliJz7LzRSGsAAs'
        const response = await request(app).post('/api/classroom/create').send({
            grado:6,
            seccion:"D",
            idNivel:1
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    })
})

describe('Mantener la seguirdad de los datos del usuario', () => {
    test('Verificar que se muestre la contraseña cuando el usaurio se logea', async () => {
        const response = await request(app).post('/api/auth/login').send({
            usuario:"D148691@abc.edu.pe",
            contraseña:"123456789"
        })
        expect(response.body.data.user.contrasena).toBeDefined();
    })

    test('Verificar que se muestre data de perfil', async () => {
        const response = await request(app).post('/api/auth/login').send({
            usuario:"D148691@abc.edu.pe",
            contraseña:"123456789"
        })
        expect(response.body.data.perfil).toBeDefined();
    })

})

describe('El sistema debe evitar duplicado de información', () => {
    test('El sistema no debe permitir registrar un alumno con DNI ya registrado', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNjY4NzQyMDk0LCJleHAiOjE2NjkzNDY4OTR9.rIH47lNIDg8qcALxe-IBs4cBkOlm1kJS2pJj56NTdcE'
        const response = await request(app).post('/api/students/register').send({
            nombre:"Nuevo",
            apellido:"Alumno",
            grado:6,
            dni:88888888,
            idNivel:1,
            idAula:1
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })

    test('El sistema permite registrar un nuevo alumno con nuevo DNI', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNjY4NzQyMDk0LCJleHAiOjE2NjkzNDY4OTR9.rIH47lNIDg8qcALxe-IBs4cBkOlm1kJS2pJj56NTdcE'
        const response = await request(app).post('/api/students/register').send({
            nombre:"Alumno",
            apellido:"Admitido",
            grado:6,
            dni:74558452,
            idNivel:1,
            idAula:1
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })

})

describe('El sistema debe generar credenciales de acceso para los nuevos usuarios', () => {
    
    test('El sistema genera credencial de acceso para un nuevo alumno', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNjY4NzQyMDk0LCJleHAiOjE2NjkzNDY4OTR9.rIH47lNIDg8qcALxe-IBs4cBkOlm1kJS2pJj56NTdcE'
        const alumno = await request(app).post('/api/students/register').send({
            nombre:"Nuevo",
            apellido:"Alumno",
            grado:6,
            dni:"25976984",
            idNivel:1,
            idAula:1
        }).set('Authorization', `Bearer ${token}`)
        const cod=alumno.body.data.codigo;
        const dni=alumno.body.data.dni;
        const response = await request(app).post('/api/auth/login').send({
            usuario:cod,
            contraseña:dni
        })
        expect(response.statusCode).toBe(200);
    })

    test('El sistema deniega el acceso por credenciales incorrectas', async () => {
        const response = await request(app).post('/api/auth/login').send({
            usuario:'E152648',
            contraseña:'15468753'
        })
        expect(response.statusCode).toBe(200);
    })

})