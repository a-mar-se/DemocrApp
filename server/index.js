import express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// midlewares
import httpLoggerMiddleware from './middleware/logger-middleware.js';
import jsonResponseMiddleware from './middleware/json-response.js';

import dbRouter from './routes/db.js';
dotenv.config();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;
// export const databaseURI =
//   process.env.DATABASE_URL || 'mongodb://localhost/mongoose-intro';
export const databaseURI = 'mongodb://localhost/mongoose-intro';

// Creacion del servidor
const server = express();
mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
server.use(cors());

// El servidor utilizará como deserializador de data bodyparser y deserializara en JSON
server.use(bodyParser.json());
// Utiliza un middleware que permite tener descripciones mas especificas en la consola
server.use(httpLoggerMiddleware);
// Utiliza un middleware que permite crear headers de respuesta que indiquen que el contenido es JSON
server.use(jsonResponseMiddleware);

// server.use(secureRoute);
// Database router
server.use(dbRouter);

// Sino no hay rutas definidas envia error al cliente
// server.use(errorHandlerMiddleware);

// Inicializa el servidor
server.listen(PORT, () =>
  // utilizando el logger de la libreria winston imprimo en consola que el servidor se ha iniciado
  logger.info(`server listening ${JSON.stringify({ HOST, PORT })}`),
);
