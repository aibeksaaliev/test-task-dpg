import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "https://dpg.gg/test/",
});