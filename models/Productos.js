import mongoose from "mongoose";
const productoSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			trim: true,
			require: true,
		},
		description: {
			type: String,
			trim: true,
			require: true,
		},
		categoria: {
			type: String,
			trim: true,
			require: true,
		},
		precioOriginal: {
			type: Number,
			require: true,
		},
		precioDescuento: {
			type: Number,
		},
		restantes: {
			type: Number,
			require: true,
		},
		images: [
			{
				type: String,
			},
		],
		creador: {
			type: mongoose.Schema.Types.ObjectId, // Referencia al usuario
			ref: "Usuario", // Ref para relacionar con la tabla en este caso la de Usuario
		},
	},
	{
		timestamps: true, // Para saber cuando fue creada y actualizada
	},
);
const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
