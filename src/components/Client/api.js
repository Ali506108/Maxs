import axios from 'axios';

const API_URL = 'http://185.4.180.127:3000/clients'; // Проверьте, что этот URL корректен

const getAuthToken = () => {
  return localStorage.getItem('token'); // Замените на ваш метод получения токена
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавьте токен в заголовки для каждого запроса
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllClients = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке клиентов');
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке клиента');
  }
};

export const createClient = async (client) => {
  try {
    const response = await axiosInstance.post('/', client);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при создании клиента');
  }
};

export const editClient = async (id, client) => {
  console.log('ascblhjvlwvcwvglcvucvcycxifcit');
  try {
    const response = await axiosInstance.put(`/${id}`, client);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении клиента');
  }
};

export const deleteClient = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении клиента');
  }
};

export const ExcelFetch = async (file) => {
  const formData = new FormData();
  formData.append('excel', file); // Убедитесь, что имя поля соответствует тому, что ожидается на сервере.

  try {
    const response = await axios.post('http://185.4.180.127:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Возвращаем ответ от сервера
  } catch (error) {
    throw new Error('Ошибка при загрузке Excel файла: ' + error.message);
  }
};
