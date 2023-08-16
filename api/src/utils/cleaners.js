

const cleanData = (data, source) => {
    const cleanedData = data.map((bred) => {
        const weightParts = source === "DB" ? bred.weight.split(" - ") : bred.weight.metric.split(" - ");
        const heightParts = source === "DB" ? bred.height.split(" - ") : bred.height.metric.split(" - ");
        let imageSrc;
        if (source === "DB") {
            imageSrc = bred.image; // Usa la ruta de la imagen almacenada en la base de datos
        } else {
            imageSrc = bred.image.url;
        }

        const cleanedItem = {
            id: bred.id,
            name: bred.name,
            image: imageSrc, // Usa directamente la ruta de la imagen
            weight: {
                min: parseFloat(weightParts[0]),
                max: parseFloat(weightParts[1]),
            },
            height: {
                min: parseFloat(heightParts[0]),
                max: parseFloat(heightParts[1]),
            },
            created: source === "API" ? false : true,
        };

        if (source === "DB") {
            cleanedItem.temperament = bred.Temperaments.map((temperament) => temperament.name);
        }

        if (source === "API") {
            cleanedItem.temperament = bred.temperament ? bred.temperament.split(", ") : [];
        }

        return cleanedItem;
    });

    return cleanedData;
};


const temperamentCleaner = (data) => {
    const cleanedDataRaw = data.map(breed => breed.temperament)
    const separateWords = cleanedDataRaw
    .filter(str => str)
    .flatMap(str => str.split(", "));
    const cleanedData = separateWords.filter((word, index, arr) => arr.indexOf(word) === index);
    cleanedData.sort();
    return cleanedData
}

module.exports = {
    cleanData,
    temperamentCleaner
};
