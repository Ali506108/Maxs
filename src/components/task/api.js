import axios from 'axios';

const API_URL = 'http://localhost:3000/task/'; // Проверьте правильность URL

const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Получение задач (для сотрудников)
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data; // Ожидается, что сервер возвращает список задач
  } catch (error) {
    throw new Error('Ошибка при загрузке задач сотрудников: ' + error.message);
  }
};
export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data; // Возвращаем созданную задачу
  } catch (error) {
    throw new Error('Ошибка при создании задачи: ' + error.message);
  }
};
export const editTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, task, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data; // Возвращаем обновленную задачу
  } catch (error) {
    throw new Error('Ошибка при обновлении задачи: ' + error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
  } catch (error) {
    throw new Error('Ошибка при удалении задачи: ' + error.message);
  }
};
