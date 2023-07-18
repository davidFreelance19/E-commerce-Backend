import mongoose from "mongoose"
const publicidadSchema = mongoose.Schema(
    {
		nombre: {
			type: String,
			trim: true,
			require: true,
		},
		descripcion: {
			type: String,
			trim: true,
			require: true,
		},
        theme: {
			type: String,
			trim: true,
			require: true,
		},
		imgLogo: [
			{
				type: String,
			},
		],
        imgHero: [
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
)
const Publicidad = mongoose.model("Publicidad", publicidadSchema);
export default Publicidad;