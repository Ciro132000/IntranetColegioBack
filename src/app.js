require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnectMySql } = require('./config/connection')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.use("../public",express.static('public'));

const port = process.env.PORT || 3000;

// Rutas
app.use("/api",require('./routes'));

// Levantando servidor
app.listen(port, () => {
    console.log('Servidor inciado en el puerto '+port)
})

dbConnectMySql();

module.exports = app