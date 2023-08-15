const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    //  El puerto viene de las variables de entorno
    this.port = process.env.PORT;

    this.paths = {
      representantes: "/api/representantes",
    };

    // Conectar a base de datos
    this.conectarDB();
    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(
      this.paths.representantes,
      require("../routes/representantes")
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
