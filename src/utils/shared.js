// Metodo para generar codigo aleatorio
const  generateRandomString = (num,prefix) => {
    const characters ='0123456789';
    let cod= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        cod += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix+cod;
}

module.exports = { generateRandomString }