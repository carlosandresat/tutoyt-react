import axios from "axios";
import { SERVER } from "../config";

export const getTutorsByClass = async (classId) =>
    await axios.get(`${SERVER}/tutor/${classId}`)
