import axios from "axios"
import { SERVER_URL } from "../config"

export const getLogrosByUser = async (user_id) =>
    await axios.get(`${SERVER_URL}/logros/${user_id}`)