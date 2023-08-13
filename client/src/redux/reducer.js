import { FILTER_BY_CREATED, FILTER_BY_TEMPERAMENT, GET_DOGS, SEARCH_DOG, SORT_BY_NAME, SORT_BY_WEIGHT } from "./actions";

const initialState = {
    dogs: [],
    originalDogs: [] // Agregamos una copia de la lista original de perros
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOGS:
            return { ...state, dogs: payload, originalDogs: payload };
        case SEARCH_DOG:
            return { ...state, dogs: payload };
        case FILTER_BY_CREATED:
            return {
                ...state,
                dogs: payload,
                originalDogs: payload // Actualizamos la lista original también
            };

        case FILTER_BY_TEMPERAMENT:
            // eslint-disable-next-line no-case-declarations
            const filterByTemp = state.originalDogs.filter(breed =>
                breed.temperament.includes(payload)
            );
            return {
                ...state,
                dogs: filterByTemp
            };
        case SORT_BY_NAME:
            // ... Ordenar por nombre ascendente si ascending es true, descendente si es false
            // eslint-disable-next-line no-case-declarations
            const sortedDogsByName = [...state.dogs].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return payload ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
            return {
                ...state,
                dogs: sortedDogsByName,
            };
        case "SORT_BY_WEIGHT":
            // ... Ordenar por peso máximo si ascending es true, mínimo si es false
            // eslint-disable-next-line no-case-declarations
            const sortedDogsByWeight = [...state.dogs].sort((a, b) => {
                const weightA = a.weight.max;
                const weightB = b.weight.max;
                return payload ? weightB - weightA : weightA - weightB;
            });
            return {
                ...state,
                dogs: sortedDogsByWeight,
            };
        default:
            return { ...state };
    }
}

export default rootReducer;
