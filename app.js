import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./db/db.js";
import cors from "cors";
import path from "path";
import routerUsuario from "./routes/usuarioRoutes.js";
import routerProducto from "./routes/productoRoutes.js";
import routerPublicidad from "./routes/publicidadRoutes.js";
const app = express();

app.use(express.json()); // Metodo para poder procesar informacion de tipo json
app.use("/", express.static("uploads"));
dotenv.config(); // Hacemos la configuracion para que se puedan leer variables de entorno
db();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			//Puede consultar la API
			callback(null, true);
		} else {
			callback(new Error("Error de cors"));
		}
	},
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000; // process.env.PORT se asgina de manera automatica al momento de hacer el deploy

app.use("/api/usuarios", routerUsuario);
app.use("/api/productos", routerProducto);
app.use("/api/publicidad", routerPublicidad);
app.listen(PORT, () => {
	console.log("servidor corriendo desde el puerto", PORT);
});
// ytQQwABGrTqm3yAq
