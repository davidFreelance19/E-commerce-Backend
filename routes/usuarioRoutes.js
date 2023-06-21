import express from "express";
import {
	registrarUsuario,
	autenticarUsuario,
	confirmarCuenta,
	olvidePassword,
	confirmarToken,
	nuevoPassword,
	obtenerPerfil,
} from "../controller/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
import { upload } from "../multer.js";
const router = express.Router();
router.post("/", upload.single("file"), registrarUsuario); 
router.post("/login", autenticarUsuario);
router.get("/confirmar-cuenta/:token", confirmarCuenta);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", confirmarToken);
router.post("/olvide-password/:token", nuevoPassword);
router.get("/perfil", checkAuth, obtenerPerfil);
export default router;
