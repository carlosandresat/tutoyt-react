import axios from "axios"
import { SERVER } from "../config"

axios.defaults.withCredentials = true

export const loginUser = async (credentials) =>
    await axios.post(`${SERVER}/login`, credentials)

export const authorizeUser = async () =>
    await axios.get(`${SERVER}`)

export const logout = async () =>
    await axios.get(`${SERVER}/logout`)