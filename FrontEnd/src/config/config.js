import axios from "axios";

const client = axios.create({
    baseURL: 'https://himeko-manga-app.vercel.app/api/',
    timeout: 60000
})

export default client