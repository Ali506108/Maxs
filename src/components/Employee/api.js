import axios from 'axios';

const API_URL = 'https://185.4.180.127:3000/employee'; // Проверьте, что этот URL корректен

// Получение токена из хранилища (например, localStorage)
const getAuthToken = () => {
  return localStorage.getItem('token'); // Замените на ваш метод получения токена
};

// Создание клиента
export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(API_URL, 
      employee,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}` // Добавляем токен в заголовки
        }
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Ошибка создания клиента:', error.response?.data?.message || error.message);
    throw new Error('Ошибка создания клиента: ' + (error.response?.data?.message || error.message));
  }
};


// Получение всех клиентов
export const getAllEmployees = async () => {
  try {
    console.log('Запрос всех клиентов...');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}` // Добавляем токен в заголовки
      }
    });

    if (response.status !== 200) {
      throw new Error(`Ошибка загрузки: статус ${response.status}`);
    }

    console.log('Успешно загружены данные:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка загрузки клиентов:', error.response?.data?.message || error.message);
    throw new Error('Ошибка загрузки клиентов: ' + (error.response?.data?.message || error.message));
  }
};


export const editEmployee = async (id, updatedData) => {
  console.log('gasfgkhksdhgkcsgld;bjhbjblvfckgf');
  try {
    console.log('Отправка запроса на обновление сотрудника...');

    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Добавляем токен в заголовки
        'Content-Type': 'application/json' // Указываем тип контента
      }
    });

    if (response.status !== 200) {
      throw new Error(`Ошибка обновления: статус ${response.status}`);
    }

    console.log('Сотрудник успешно обновлен:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка обновления сотрудника:', error.response?.data?.message || error.message);
    throw new Error('Ошибка обновления сотрудника: ' + (error.response?.data?.message || error.message));
  }
};

export const deleteEmployee = async (id) => {
  try {
    console.log('Отправка запроса на обновление сотрудника...');

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Добавляем токен в заголовки
        'Content-Type': 'application/json' // Указываем тип контента
      }
    });

    if (response.status !== 200) {
      throw new Error(`Ошибка обновления: статус ${response.status}`);
    }

    console.log('Сотрудник успешно обновлен:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка обновления сотрудника:', error.response?.data?.message || error.message);
    throw new Error('Ошибка обновления сотрудника: ' + (error.response?.data?.message || error.message));
  }
};


export const getEmployeeById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}` // Добавляем токен в заголовок
      }
    });
    return response.data; // Возвращаем данные сотрудника
  } catch (error) {
    console.error('Ошибка при получении сотрудника:', error.response?.data?.message || error.message);
    throw new Error('Ошибка при получении сотрудника: ' + (error.response?.data?.message || error.message));
  }
};
