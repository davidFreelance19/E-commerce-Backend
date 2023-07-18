import Publicidad from "../models/Publicidad.js";
const nuevaPublicidad = async (req, res) => {
	const publicidad = new Publicidad(req.body); // Generamos la instancia de la nueva publicidad
	const files = req.files;
	const imgHeroUrl = files.imgHero.map((file) => `${file.filename}`);
	const imgLogoUrl = files.imgLogo.map((file) => `${file.filename}`);
	publicidad.creador = req.usuario._id;
	publicidad.imgHero = imgHeroUrl;
	publicidad.imgLogo = imgLogoUrl;
	try {
		const publicidadDb = await publicidad.save(); // Lo guardamo en la db
		res.json(publicidadDb);
	} catch (error) {
		console.log(error);
	}
};
const obtenerAllPublicidad = async (req, res) => {
	// Traemos todos los publicidad de la base de datos
	const publicidad = await Publicidad.find();
	res.json(publicidad);
};
const obtenerPublicidadUsuario = async (req, res) => {
	// Traemos todos los proyectos donde el creador sea el que esta autenticado (por medio del token)
	const publicidad = await Publicidad.find()
		.where("creador")
		.equals(req.usuario);
	res.json(publicidad);
};
const obtenerPublicidad = async (req, res) => {
	// Traemos todos los productos de la base de datos
	const { id } = req.params;
	const publicidad = await Publicidad.find().where("_id").equals(id);
	res.json(publicidad);
};
const actualizarPublicidad = async (req, res) => {
	const { id } = req.params;
	const publicidad = await Publicidad.findById(id);
	if (!publicidad) {
		return res.status(404).json({ msj: "no encontrado" });
	}
	if (publicidad.creador._id.toString() !== req.usuario._id.toString()) {
		return res.json({ msj: "accion no valida" }); // Verificamos si el creador es el que esta haciendo el request y no otra persona
	}
	const files = req.files;
	let imagenesUrlHero = [];
	let imagenesUrlLogo = [];
	if (files.imgHero !== undefined) {
		imagenesUrlHero = files.imgHero.map((file) => `${file.filename}`);
	}
	if (files.imgLogo !== undefined) {
		imagenesUrlLogo = files.imgLogo.map((file) => `${file.filename}`);
	}
	publicidad.nombre = req.body.nombre || publicidad.nombre;
	publicidad.descripcion = req.body.descripcion || publicidad.descripcion;
	publicidad.imgLogo =
		imagenesUrlLogo.length === 0 ? publicidad.imgLogo : imagenesUrlLogo;
	publicidad.imgHero =
		imagenesUrlHero.length === 0 ? publicidad.imgHero : imagenesUrlHero;
	try {
		const publicidadActualizada = await publicidad.save();
		res.json(publicidadActualizada);
	} catch (error) {
		console.log(error);
	}
};
const eliminarPublicidad = async (req, res) => {
	const { id } = req.params;
	const publicidad = await Publicidad.findById(id);
	if (!publicidad) {
		return res.status(404).json({ msj: "no encontrado" });
	}
	if (publicidad.creador._id.toString() !== req.usuario._id.toString()) {
		return res.json({ msj: "accion no valida" }); // Verificamos si el veterinario es el que esta haciendo el request y no otra persona
	}

	try {
		await publicidad.deleteOne();
		res.json({ msj: "publicidad eliminada" });
	} catch (error) {
		console.log(error);
	}
};
export {
	nuevaPublicidad,
	obtenerAllPublicidad,
	obtenerPublicidad,
	obtenerPublicidadUsuario,
	actualizarPublicidad,
	eliminarPublicidad,
};
