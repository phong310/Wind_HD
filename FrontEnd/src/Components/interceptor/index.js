import axios from "axios";
import jwt_decode from 'jwt-decode'

const baseURL = import.meta.env.VITE_API_PRODUCTS;


const refreshToken = async () => {
    try {
        const res = await axios.post(`${baseURL}auth/refresh-token`, {}, {
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true
    })
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
