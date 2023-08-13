
import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const SEARCH_DOG = "SEARCH_DOG";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";

export const getDogs = () => {
    return async function (dispatch) {
        const {data} = await axios("http://localhost:3001/dogs")
        dispatch({type: GET_DOGS, payload: data})
    }   
}

export const searchDog = (searchTerm) => {
    return async function (dispatch) {
        const {data} = await axios(`http://localhost:3001/dogs/search?breed=${searchTerm}`)
        dispatch({type: SEARCH_DOG, payload: data})
    }
}

export const filterByCreated = (filterOption) => {
    return async function (dispatch) {
        const {data} = await axios("http://localhost:3001/dogs")
        const filteredBreeds = data.filter((breed => breed.created === filterOption))
        dispatch ({type: FILTER_BY_CREATED, payload: filteredBreeds})
    }
}

export const filterByTemperament = (temperament) => {
    return {type: FILTER_BY_TEMPERAMENT, payload: temperament}
}

// actions.js

export const sortByName = (ascending) => {
    return {
        type: SORT_BY_NAME,
        payload: ascending,
    };
};

export const sortByWeight = (ascending) => {
    return {
        type: SORT_BY_WEIGHT,
        payload: ascending,
    };
};

