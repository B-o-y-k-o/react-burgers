import {API_URL} from "./constants";

export const getIngredientsData = async () => {
    return await fetch(API_URL)
        .then(res => res.json())
        .catch(console.error);
};