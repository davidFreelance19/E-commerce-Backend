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
const obtenerProductosUsuario = async (req, res) => {
	// Traemos todos los proyectos donde el creador sea el que esta autenticado (por medio del token)
	const productos = await Producto.find().where("creador").equals(req.usuario);
	res.json(productos);
};
const nuevoProducto = async (req, res) => {
	const producto = new Producto(req.body); // Generamos la instancia del nuevo proyecto
	const files = req.files;
	const imageUrls = files.map((file) => `${file.filename}`);
	for (let i = 0; i < imageUrls.length; i++) {
		helperImg(
			files[i].path,
			`resize-${files[i].filename}`,
			400,
		);
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
export {
	nuevoProducto,
	obtenerAllProductos,
	obtenerProducto,
	obtenerProductosUsuario,
};
