import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'

export const getAspirationCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}aspiration-categories`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error.response
    }
}