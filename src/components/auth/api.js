import axios from 'axios';

const API_URL = 'https://api.maximus.com.kz/api/login/';  

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}admin`, { email, password });
    const token = response.data.token; // Предполагается, что токен возвращается в поле `token`
    localStorage.setItem('token', token); // Сохраняем токен в локальном хранилище
    return response.data; // Возвращаем данные ответа (например, токен)
  } catch (error) {
    throw new Error('Ошибка авторизации: ' + (error.response?.data?.message || error.message));
  }
};

export const loginEmployee = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}employee`, { email, password });
    const token = response.data.token; // Предполагается, что токен возвращается в поле `token`
    localStorage.setItem('token', token); // Сохраняем токен в локальном хранилище
    return response.data; // Возвращаем данные ответа (например, токен)
  } catch (error) {
    throw new Error('Ошибка авторизации: ' + (error.response?.data?.message || error.message));
  }
};
