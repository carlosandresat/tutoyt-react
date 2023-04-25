import axios from "axios";
import { SERVER_URL } from "../config";

export const getTutorsByClass = async (classId) =>
    await axios.get(`${SERVER_URL}/tutor/${classId}`)
