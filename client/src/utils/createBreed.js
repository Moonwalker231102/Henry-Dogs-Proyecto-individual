import axios from "axios";

const createBreed = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3001/dogs", formData);
        return response.data
    } catch (error) {
        console.log(error)
        // Manejo de errores en la petición
        console.error({error: error.response})
    }
};

export default createBreed; 