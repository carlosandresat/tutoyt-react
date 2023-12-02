import axios from "axios";
import { SERVER_URL } from "../config";


export const requestSessionNotification = async (tutor) =>
    await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/sendMessage?chat_id=-4010995760&text=Session%20solicitada%20para%20${tutor}`)
