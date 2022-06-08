export default function authHeader(){
    const token = JSON.parse(localStorage.getItem('token'))
    return {
        Authorization: `Bearer ${token ? token : ''}`
    }
}