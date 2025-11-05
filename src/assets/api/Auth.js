import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}auth/login`, data, {
            headers: {
                'Accept': 'application/json'
            }
        })
        return response
    } catch (error) {
        throw error.response
    }
}