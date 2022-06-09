import axios from "axios";

import authHeader from "./auth.header";
const API_URL = process.env.REACT_APP_API_URL

export const Login = async (props) => {
    const res = await axios({
        method: 'POST',
        url: `${API_URL}/users/login`,
        data:{
            email: props.email,
            password: props.password
        }
    })
    return {token: res.data.data.token}
}

export const Logout = () => {
    localStorage.removeItem('token')
}

export const ShowMe = async () => {
    const res = await axios({
        method: 'GET',
        url: `${API_URL}/users/me`,
        header: authHeader()
    })
    return res.data
}