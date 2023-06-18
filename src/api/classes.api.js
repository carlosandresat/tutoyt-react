import axios from "axios"
import { SERVER_URL } from "../config"

export const getClassesByTutor = async (tutorId) => 
    await axios.get(`${SERVER_URL}/classes/tutor/${tutorId}`)