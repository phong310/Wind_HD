import axios from "axios";
import jwt_decode from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_PRODUCTS;

const refreshToken = async () => {
    try {
        const res = await axios.post(`${baseURL}auth/refresh-token`, {}, {
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true
    });

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await refreshToken();
                    const refreshUser = {
                        ...user,
                        accessToken: data.accessToken,
                    };
                    dispatch(stateSuccess(refreshUser));
                    config.headers["Authorization"] = "Bearer " + data.accessToken;
                } catch (err) {
                    console.error('Error refreshing token:', err);
                    // Handle the error, e.g., redirect to login
                }
            } else {
                config.headers["Authorization"] = "Bearer " + user.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    return newInstance;
};
