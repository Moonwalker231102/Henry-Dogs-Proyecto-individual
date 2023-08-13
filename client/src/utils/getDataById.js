import axios from "axios";

const getDataById = async (id) => {
    try {
        const response = await axios(`http://localhost:3001/dogs/${id}`);
        return response.data
    } catch (error) {
        console.error("Error al realizar la búsqueda, ", error.message)
    }
}

export default getDataById;