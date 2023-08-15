const { Router } = require("express");
const { check } = require("express-validator");

const {
  representantesGet,
  representantesPost,
  representanteValida,
} = require("../controller/representantes");

const { validarCampos } = require("../middlewares");

const { emailExiste } = require("../helpers/db-validator");

const router = Router();

router.get("/", representantesGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6").isLength({ min: 6 }),
    check("correo", "debe ingresar un correo").isEmail(),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  representantesPost
);

router.post("/validar-representante/:id", [

], representanteValida);

module.exports = router;
