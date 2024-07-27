import axios from "axios";

const client = axios.create({
    baseURL: 'https://himeko-manga-app.vercel.app/api/'
})

export default client