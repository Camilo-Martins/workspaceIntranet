const {Schema, model} = require('mongoose');

const RepresentanteSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del Rpte es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },

    validado:{
        type : Boolean,
        default: false
    },
    tokenSolicitud:{
        type: String,
        default: ''
    }

})

RepresentanteSchema.methods.toJSON = function() {
    const {__v, password, _id, ...representante} = this.toObject();
    representante.uid = _id;
    return representante
}

module.exports = model('Representante', RepresentanteSchema);