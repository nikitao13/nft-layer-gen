const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const outputFolder = "./output/merged.png";
const layersFolder = "./layers";

async function mergeLayers(layersFolder, outputFolder) {
    const startTime = Date.now();
    try {
        const subdirectories = await fs.readdir(layersFolder);
        const sortedSubdirectories = subdirectories
            .sort((a, b) => parseInt(a) - parseInt(b));

        const metadata = {};

        await Promise.all(sortedSubdirectories.map(async (layerSubdir) => {
            const layerFiles = await fs.readdir(path.join(layersFolder, layerSubdir));
            const imageFiles = layerFiles.filter(file => path.extname(file).toLowerCase() === '.png');
            const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

            if (randomImage) {
                metadata[layerSubdir] = path.join(layersFolder, layerSubdir, randomImage);
            }
        }));

        const compositeArray = sortedSubdirectories
            .filter(layerName => metadata[layerName])
            .map((layerName) => ({ input: metadata[layerName], top: 0, left: 0 }));

        compositeArray.map((inputLayer) => console.log(inputLayer.input.slice(7, -4)));

        const background = await sharp(compositeArray.shift().input);

        const mergedImage = background
            .composite(compositeArray)
            .toFile(outputFolder);

    } catch(error) {
        console.error("error: ", error);
    }
    const endTime = Date.now();
    return endTime - startTime + "ms";
}

mergeLayers(layersFolder, outputFolder).then((completionTime) => console.log(`merged.png was created in ${completionTime}!`));
