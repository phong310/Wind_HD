import axios from "axios";
import { toast } from 'react-toastify';
import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess, refreshAccessToken, registerFailed, registerStart, registerSuccess } from "../redux/authSlice"

const baseURL = import.meta.env.VITE_API_PRODUCTS;

// REGISTER
export const RegisterUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${baseURL}auth/register`, newUser);
        dispatch(registerSuccess(res.data));
        navigate("/login");
        toast.success("Account registration successful")

    } catch (e) {
        dispatch(registerFailed());
        toast.error("Account registration failed !")
    }
}

// LOGIN 
export const LoginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${baseURL}auth/login`, user,
            { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        console.log(res);
        navigate("/");
        toast.success("Logged in successfully")

    } catch (e) {
        dispatch(loginFailed());
        if (e.response && e.response.data && e.response.data.message) {
            toast.error(e.response.data.message);
        } else {
            toast.error("Login failed !");
        }
    }
}

// LOGOUT 
export const LogoutUser = async (id, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post(`${baseURL}auth/logout`, id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(logOutSuccess());
        navigate("/login")
        toast.success("Logout successfully")

    } catch (e) {
        dispatch(logOutFailed());
        toast.error("Logout failed !")
    }
}
