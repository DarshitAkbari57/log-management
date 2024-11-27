import axios from "axios";

const API_URL = process.env.REACT_APP_SERVERURL;

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.common["ngrok-skip-browser-warning"] = `69420`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const apiPost = async (endpoint, data, token = null) => {
    setAuthToken(token);
    try {
        const response = await axios.post(`${API_URL}${endpoint}`, data);
        return response;
    } catch (error) {
        throw error?.response;
    }
};

export const apiGet = async (endpoint, token = null) => {
    setAuthToken(token);
    try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        return response;
    } catch (error) {
        throw error?.response;
    }
};

export const apiPut = async (endpoint, data, token = null) => {
    setAuthToken(token);
    try {
        const response = await axios.put(`${API_URL}${endpoint}`, data);
        return response;
    } catch (error) {
        throw error?.response;
    }
};

export const apiDelete = async (endpoint, token = null) => {
    setAuthToken(token);
    try {
        const response = await axios.delete(`${API_URL}${endpoint}`);
        return response;
    } catch (error) {
        throw error?.response;
    }
};
