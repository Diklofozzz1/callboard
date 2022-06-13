import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const ActiveAuctions = async () => {
    const res = await axios({
        method: 'GET',
        url: `${API_URL}/adds/active_auct`,
    })
    return {data: res.data.data}
}

export const Search = async (props) => {
    const res = await axios.get(
        `${API_URL}/adds/search_by`,
        {
            params: {
                search: props?.search,
                category: props?.category,
                price: props?.price,
                date: props?.date,
                user_id: props?.user_id,
                type: props?.type,
                count: props?.count,
                padding: props?.padding
                }
            }
        )
    return res
}