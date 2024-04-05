import axios from "axios";


//Declarar a porta da API

const portaApi = '4466'

const ip = '192.168.19.141'

const apiUrlLocal =  `http://${ip}:${portaApi}/api`

const api = axios.create({
    baseURL : apiUrlLocal
})

export default api