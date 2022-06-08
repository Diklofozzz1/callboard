import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const Registration = async (props) => {
    const res = await axios({
        method: 'POST',
        url: `${API_URL}/users/create`,
        data:{
            first_name: props.first_name,
            last_name: props.first_name,
            phone_number: props.first_name,
            email: props.first_name,
            password: props.first_name,
        }
    })
    return {Status: res.data.status}
}