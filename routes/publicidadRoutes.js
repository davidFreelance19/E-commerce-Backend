import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
	nuevaPublicidad,
	obtenerAllPublicidad,
	obtenerPublicidadUsuario,
	actualizarPublicidad,
	obtenerPublicidad,
	eliminarPublicidad,
} from "../controller/publicidadController.js";
import { upload } from "../multer.js";
const router = express.Router();
router.post(
	"/",
	upload.fields([{ name: "imgLogo" }, { name: "imgHero" }]),
	checkAuth,
	nuevaPublicidad,
);

router.get("/", obtenerAllPublicidad);
router.get("/", checkAuth, obtenerPublicidadUsuario);
router.get("/:id", obtenerPublicidad);
router.delete("/:id", checkAuth, eliminarPublicidad);
router.put(
	"/:id",
	upload.fields([{ name: "imgLogo" }, { name: "imgHero" }]),
	checkAuth,
	actualizarPublicidad,
);
export default router;
