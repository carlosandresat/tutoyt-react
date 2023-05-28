import axios from "axios";
import { SERVER_URL } from "../config";

export const requestSession = async (session) =>
    await axios.post(`${SERVER_URL}/session`, session)

export const getSessionsByStudent = async (user) =>
    await axios.get(`${SERVER_URL}/session/${user}`)

export const getSessionsByTutor = async (user) =>
    await axios.get(`${SERVER_URL}/session/tutor/${user}`)

export const acceptTutoring = async (id) =>
    await axios.put(`${SERVER_URL}/session/accept/${id}`)

export const cancelTutoring = async (id) =>
    await axios.put(`${SERVER_URL}/session/cancel/${id}`)

export const updateDate = async (id, date) =>
    await axios.put(`${SERVER_URL}/session/update/date/${id}`, date)

export const updatePlace = async (id, place) =>
    await axios.put(`${SERVER_URL}/session/update/place/${id}`, place)

export const updateTopic = async (id, topic) =>
    await axios.put(`${SERVER_URL}/session/update/topic/${id}`, topic)

export const updateDatePlace = async (id, dateplace) =>
    await axios.put(`${SERVER_URL}/session/update/date-place/${id}`, dateplace)

export const updateDateTopic = async (id, datetopic) =>
    await axios.put(`${SERVER_URL}/session/update/date-topic/${id}`, datetopic)

export const updatePlaceTopic = async (id, placetopic) =>
    await axios.put(`${SERVER_URL}/session/update/place-topic/${id}`, placetopic)

export const updateAll = async (id, all) =>
    await axios.put(`${SERVER_URL}/session/update/all/${id}`, all)
