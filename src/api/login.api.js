import axios from "axios"
import { SERVER_URL } from "../config"

axios.defaults.withCredentials = true

export const loginUser = async (credentials) =>
    await axios.post(`${SERVER_URL}/login`, credentials)

export const authorizeUser = async () =>
    await axios.get(`${SERVER_URL}`)

export const logout = async () =>
    await axios.get(`${SERVER_URL}/logout`)