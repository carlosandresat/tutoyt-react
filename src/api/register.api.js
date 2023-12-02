import axios from "axios"
import { SERVER_URL } from "../config"

axios.defaults.withCredentials = true

export const newUser = async (data) =>
    await axios.post(`${SERVER_URL}/newUser`, data)

export const checkUser = async (user) =>
    await axios.get(`${SERVER_URL}/checkUser/${user}`)