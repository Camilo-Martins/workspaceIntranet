const {Representante} = require('../models');


const emailExiste = async( correo = '') =>{
    const existeEmail = await Representante.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo}, ya se encuentra registrado`)
    }
    console.log(correo)
}

module.exports ={
    emailExiste
}