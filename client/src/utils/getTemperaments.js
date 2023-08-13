import axios from "axios"

const getTemperaments = async () => {
    try {
        const {data} = await axios("http://localhost:3001/temperaments") 
        return data
    } catch (error) {
        console.error("Error al traer los temperamentos: ", error.message)
    }
}

export default getTemperaments;