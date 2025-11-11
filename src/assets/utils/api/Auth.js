import axios from 'axios';

// Axios global config
axios.defaults.withCredentials = true;

export const login = async (data) => {
    try {
        const response = await axios.post('/api/auth/login', data, {
            headers: {
                'Accept': 'application/json'
            },
            withCredentials: true  // ⚠️ pastikan cookie dikirim
        });
        return response;
    } catch (error) {
        throw error.response;
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('/api/auth/logout', {}, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error.response;
    }
}

export const me = async () => {
    try {
        const response = await axios.get('/api/auth/me', {
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error.response;
    }
}
