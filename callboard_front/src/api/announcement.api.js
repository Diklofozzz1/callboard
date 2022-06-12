import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const ActiveAuctions = async () => {
    const res = await axios({
        method: 'GET',
        url: `${API_URL}/adds/active_auct`,
    })
    return {data: res.data.data}
}