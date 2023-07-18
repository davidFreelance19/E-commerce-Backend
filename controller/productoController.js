import Producto from "../models/Productos.js";
import { helperImg } from "../helper.js";
const obtenerAllProductos = async (req, res) => {
	// Traemos todos los productos de la base de datos
	const productos = await Producto.find();
	res.json(productos);
};
const obtenerProducto = async (req, res) => {
	// Traemos todos los productos de la base de datos
	const { id } = req.params;
	const producto = await Producto.find().where("_id").equals(id);
	res.json(producto);
};
const obtenerProductosCategoria = async(req, res) => {
	const { categoria } = req.params;
	const productos = await Producto.find().where("categoria").equals(categoria);
	res.json(productos);
}
const obtenerProductosUsuario = async (req, res) => {
	// Traemos todos los proyectos donde el creador sea el que esta autenticado (por medio del token)
	const productos = await Producto.find().where("creador").equals(req.usuario);
	res.json(productos);
};
const nuevoProducto = async (req, res) => {
	const producto = new Producto(req.body); // Generamos la instancia del nuevo producto
	const files = req.files;
	const imageUrls = files.map((file) => `${file.filename}`);
	for (let i = 0; i < imageUrls.length; i++) {
		helperImg(files[i].path, `resize-${files[i].filename}`, 400);
	}
	producto.creador = req.usuario._id;
	producto.images = imageUrls;

	try {
		const productoDb = await producto.save(); // Lo guardamo en la db
		res.json(productoDb);
	} catch (error) {
		console.log(error);
	}
};
const actualizarProducto = async (req, res) => {
	const { id } = req.params;
	const producto = await Producto.findById(id);
	if (!producto) {
		return res.status(404).json({ msj: "no encontrado" });
	}
	if (producto.creador._id.toString() !== req.usuario._id.toString()) {
		return res.json({ msj: "accion no valida" }); // Verificamos si el creador es el que esta haciendo el request y no otra persona
	}
	const files = req.files;
	const imageUrls = files.map((file) => `${file.filename}`);
	const imagenesFinal = imageUrls.map(
		(urlState) => urlState !== producto.images && urlState,
	);

	for (let i = 0; i < imageUrls.length; i++) {
		helperImg(files[i].path, `resize-${files[i].filename}`, 400);
	}
	//Actualizamos el producto
	producto.nombre = req.body.nombre || producto.nombre;
	producto.description = req.body.description || producto.description;
	producto.categoria = req.body.categoria || producto.categoria;
	producto.precioOriginal = req.body.precioOriginal || producto.precioOriginal;
	producto.precioDescuento =
		req.body.precioDescuento || producto.precioDescuento;
	producto.restantes = req.body.restantes || producto.restantes;
	producto.images =
		imagenesFinal.length === 0
			? req.body.files
			: req.body.files ? [req.body.files, imagenesFinal].flat() : [imagenesFinal].flat();
	try {
		const productoActualizado = await producto.save();
		res.json(productoActualizado);
	} catch (error) {
		console.log(error);
	}
};
const eliminarProducto = async (req, res) => {
	const { id } = req.params;
	const producto = await Producto.findById(id);
	if (!producto) {
		return res.status(404).json({ msj: "no encontrado" });
	}
	if (producto.creador._id.toString() !== req.usuario._id.toString()) {
		return res.json({ msj: "accion no valida" }); // Verificamos si el veterinario es el que esta haciendo el request y no otra persona
	}

	try {
		await producto.deleteOne();
		res.json({ msj: "producto eliminado" });
	} catch (error) {
		console.log(error);
	}
};
export {
	nuevoProducto,
	obtenerAllProductos,
	obtenerProducto,
	obtenerProductosCategoria,
	obtenerProductosUsuario,
	actualizarProducto,
	eliminarProducto,
};
