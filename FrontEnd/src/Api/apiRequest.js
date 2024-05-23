import axios from "axios";
import { toast } from 'react-toastify';
import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../redux/authSlice"

const baseURL = import.meta.env.VITE_API_LOCAL;

// REGISTER
export const RegisterUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${baseURL}auth/register`, newUser);
        dispatch(registerSuccess(res.data));
        navigate("/login");
        toast.success("Đăng ký tài khoản thành công")

    } catch (e) {
        dispatch(registerFailed());
        toast.error("Đăng ký không thành công !")
    }
}

// LOGIN 
export const LoginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${baseURL}auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate("/");
        toast.success("Đăng nhập thành công !")

    } catch (e) {
        dispatch(loginFailed());
        toast.error("Đăng nhập không thành công")
    }
}

// LOGOUT 
export const LogoutUser = async (id, dispatch, navigate, accessToken) => {
    dispatch(logOutStart());
    try {
        await axios.post(`${baseURL}auth/logout`, id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logOutSuccess());
        navigate("/login")
        toast.success("Đăng xuất thành công")

    } catch (e) {
        dispatch(logOutFailed());
        toast.error("Đăng xuất không thành công")
    }
}
