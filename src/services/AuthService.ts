import axios from 'axios';
import { API_URL } from "@/services/Config";

class AuthService {
    async login(username: string, password: string) {
        return axios
            .post(API_URL + '/authenticate', {
                "password": password,
                "rememberMe": true,
                "username": username
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(response => {
                return response.data ;
            }).catch(err => {
                console.log(err.response);
            });
    }

    register(username: string, lastName: string, firstName: string, email: string, password: string, address: string, phoneNumber: string) {
        return axios.post(API_URL + '/users', {
            username,
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNumber,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}

export default new AuthService();
