import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'

export const getDestinations = async () => {
    try {
        const response = await axios.get(`${API_URL}destinations`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error.response
    }
}