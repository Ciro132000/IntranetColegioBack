const express = require('express');
const fs = require('fs')
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (filName) => {
    // Convetimos un string a un array basado en un '.'
    // Ejemplo: tracks.js => [ tracks, js]
    return filName.split('.').shift() // shift() toma el primer valor del array
}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file);
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`) )
    }
})

module.exports = router;