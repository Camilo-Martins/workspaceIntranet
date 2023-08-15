const dbValidators = require('./db-validator');
const generarJWT   = require('./generar-jwt');

module.exports = {
    ...dbValidators,
    ...generarJWT,
}