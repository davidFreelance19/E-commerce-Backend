import sharp from "sharp";
export const helperImg = (filePath, fileName, size = 1200) => {
	return sharp(filePath)
		.resize(size, size, {
			fit: "fill",
		})
		.toFile(`./optimize/${fileName}`);
};
 