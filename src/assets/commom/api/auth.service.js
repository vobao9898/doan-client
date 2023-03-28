import axios from 'axios';

const API_URL = 'https://apidoan.herokuapp.com/auth/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'singin', {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, password) {
        return axios.post(API_URL + 'singin', {
            username,
            password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();