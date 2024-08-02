import axios from 'axios';

let BASE_URL = "http://localhost:3001/cards";

export const getCard = async () => {
    try {
        const response = await axios.get(BASE_URL);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const addCard = async (card) => {
    try {
        await axios.post(BASE_URL, card);
    } catch (error) {
        throw new Error(error);
    }
};



export const deleteCard = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(error);
    }
};