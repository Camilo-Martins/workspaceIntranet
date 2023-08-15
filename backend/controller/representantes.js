const {response, request} = require('express');
const bcryptjs = require('bcrypt')

const Representante = require('../models/representante')

const {generarJWT} = require('../helpers')


const representantesGet = async(req = request, res = response) =>{
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, representantes] = await Promise.all([
        Representante.countDocuments(query),
        Representante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        representantes
    })
}

const representantesPost = async(req, res = response) =>{
    const {nombre, correo, password, tokenSolicitud} = req.body
    const representante = new Representante({nombre , correo, password, tokenSolicitud});

    const salt = bcryptjs.genSaltSync();
    representante.password = bcryptjs.hashSync(password, salt);
    representante.tokenSolicitud = await generarJWT(representante.id)

    const token = await generarJWT(representante.id)
  

    await representante.save();

    
    res.json({
        representante,
        token
    })

}

const representanteValida = async (req, res = response) =>{
    const {id} = req.params;

    const representante = await Representante.findById(id)

    if(!representante.tokenSolicitud) return res.json("El usuario ya fue validado.")

    try {
        representante.validado = true
        representante.tokenSolicitud = ''
        representante.save()
    } catch (error) {
       res(error) 
    }


    res.json(representante)




}


module.exports = {
    representantesGet,
    representantesPost,
    representanteValida
}