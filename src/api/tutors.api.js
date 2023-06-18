import axios from "axios";
import { SERVER_URL } from "../config";

export const getTutorsByClass = async (classId) =>
    await axios.get(`${SERVER_URL}/tutor/${classId}`)

export const insertTutorClass = async (tutor_class) =>
    await axios.post(`${SERVER_URL}/tutor/classes`, tutor_class)

export const deleteTutorClass = async (tutorId) =>
    await axios.delete(`${SERVER_URL}/tutor/classes/${tutorId}`)