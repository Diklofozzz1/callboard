import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const Registration = async (props) => {
    const res = await axios({
        method: 'POST',
        url: `${API_URL}/users/create`,
        data: {
            first_name: props.first_name,
            last_name: props.last_name,
            phone_number: props.phone_number,
            email: props.email,
            password: props.password,
            photo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/HONDA_ASIMO.jpg/640px-HONDA_ASIMO.jpg",
            rating: 0
        }
    })
    return {Status: res.data.status}
}