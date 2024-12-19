import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const loginTeacher = (email, password) => axios.post(`${API_BASE_URL}/login`, { email, password });
export const getQuestions = () => axios.get(`${API_BASE_URL}/questions`);
export const addQuestion = (data) => axios.post(`${API_BASE_URL}/questions`, data);
