import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
	nuevoProducto,
	obtenerAllProductos,
	obtenerProducto,
	obtenerProductosUsuario,
} from "../controller/productoController.js";
import { upload } from "../multer.js";
const router = express.Router();
router.get("/", obtenerAllProductos);
router.get("/:id", obtenerProducto);
router.get("/", checkAuth, obtenerProductosUsuario);
router.post("/", upload.array("files"), checkAuth, nuevoProducto);
export default router;
