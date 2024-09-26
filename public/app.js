document.addEventListener('DOMContentLoaded', () => {
    const resultElement = document.getElementById('result');
  
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const email = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email , password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
        
          localStorage.setItem('token', data.token);
          resultElement.textContent = 'Login successful!';
        } else {
          resultElement.textContent = `Login failed: ${data.message}`;
        }
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  
    // Получение всех клиентов
    document.getElementById('fetch-clients').addEventListener('click', async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        resultElement.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  
    // Создание клиента
    document.getElementById('create-client').addEventListener('click', async () => {
      const clientData = {
        name: 'John Doe',
        phone: '123-456-7890'
      };
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clientData)
        });
        const data = await response.json();
        resultElement.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  
    // Получение клиента по ID
    document.getElementById('fetch-client-by-id').addEventListener('click', async () => {
      const clientId = prompt('Enter client ID:');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/clients/${clientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        resultElement.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  
    // Обновление клиента
    document.getElementById('update-client').addEventListener('click', async () => {
      const clientId = prompt('Enter client ID:');
      const clientData = {
        name: 'Jane Doe',
        phone: '987-654-3210'
      };
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/clients/${clientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clientData)
        });
        const data = await response.json();
        resultElement.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  
    // Удаление клиента
    document.getElementById('delete-client').addEventListener('click', async () => {
      const clientId = prompt('Enter client ID:');
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:3000/clients/${clientId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        resultElement.textContent = `Client with ID ${clientId} deleted`;
      } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
      }
    });
  });
  