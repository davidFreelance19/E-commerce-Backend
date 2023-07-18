import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
	nuevoProducto,
	obtenerAllProductos,
	obtenerProducto,
	obtenerProductosCategoria,
	obtenerProductosUsuario,
	actualizarProducto,
	eliminarProducto,
} from "../controller/productoController.js";
import { upload } from "../multer.js";
const router = express.Router();
router.get("/", obtenerAllProductos);
router.get('/categoria/:categoria', obtenerProductosCategoria)
router.get("/", checkAuth, obtenerProductosUsuario);
router.post("/", upload.array("files"), checkAuth, nuevoProducto);
router
	.route("/:id")
	.get(obtenerProducto)
	.put(checkAuth, upload.array("files"), actualizarProducto)
	.delete(checkAuth, eliminarProducto);
export default router;
