import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById, editEmployee } from './api'; // Импортируем необходимые функции
import EmployeeForm from './EmployeeForm'; // Форма для редактирования
import { Card, Button, Spinner, Alert } from 'react-bootstrap'; // Импортируем компоненты Bootstrap

const EmployeeDetail = () => {
  const { id } = useParams(); // Получаем id из URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Управление режимом редактирования

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id); // Запрос на получение данных
        setEmployee(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, isEditing]);

  const handleEdit = async (updatedEmployee) => {
    await editEmployee(id, updatedEmployee);
    setIsEditing(false); // Закрываем режим редактирования после обновления
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!employee) return <Alert variant="warning">Сотрудник не найден</Alert>;

  return (
    <div className="container mt-4">
      {isEditing ? (
        <EmployeeForm
          initialValues={employee}
          onAddEmployee={handleEdit}
          closeForm={() => setIsEditing(false)} // Функция для закрытия формы
        />
      ) : (
        <Card className="mb-4 p-3">
          <Card.Header>
            <h2>Детали сотрудника</h2>
          </Card.Header>
          <Card.Body>
            <p><strong>Полное имя:</strong> {employee.fullName}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Телефон:</strong> {employee.phone}</p>
            <p><strong>Адрес:</strong> {employee.address}</p>
            <p><strong>Прописка:</strong> {employee.registration}</p>
            <p><strong>День рождения:</strong> {employee.birthday}</p>
            <Button variant="warning" onClick={() => setIsEditing(true)}>Изменить</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default EmployeeDetail;
