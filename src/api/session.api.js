import axios from "axios";
import { SERVER } from "../config";

export const requestSession = async (session) =>
    await axios.post(`${SERVER}/session`, session)
