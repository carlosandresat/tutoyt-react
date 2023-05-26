import axios from "axios";
import { SERVER_URL } from "../config";

export const requestSession = async (session) =>
    await axios.post(`${SERVER_URL}/session`, session)

export const getSessionsByStudent = async (user) =>
    await axios.get(`${SERVER_URL}/session/${user}`)

export const cancelTutoring = async (id) =>
    await axios.put(`${SERVER_URL}/session/cancel/${id}`)
