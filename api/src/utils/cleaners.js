require("dotenv").config();
const img = "../assets/huella de perro.png";

const cleanData = (data, source) => {
    const cleanedData = data.map((bred) => {
        const weightParts = source === "DB" ? bred.weight.split(" - ") : bred.weight.metric.split(" - ");
        const heightParts = source === "DB"? bred.height.split(" - "): bred.height.metric.split(" - ");

        const cleanedItem = {
            id: bred.id,
            name: bred.name,
            image: source === "DB" ? bred.image : bred.image.url,
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
