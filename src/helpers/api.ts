import {API_URL} from "./constants";

export const getIngredientsData = async () => {
    return await fetch(API_URL)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
};