import axios from 'axios';

// Pakai path relatif karena proxy akan meneruskannya ke backend
axios.defaults.withCredentials = true;

export const getAspirations = async () => {
    try {
        const response = await axios.get('/api/aspirations', {
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error.response;
    }
}

export const createAspiration = async (data) => {
    try {
        const response = await axios.post('/api/aspirations', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            withCredentials: true   // ⚠️ tetap pakai supaya cookie dikirim
        });
        return response;
    } catch (error) {
        throw error.response;
    }
}
