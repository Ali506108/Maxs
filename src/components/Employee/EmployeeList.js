import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getAllEmployees, editEmployee, deleteEmployee, createEmployee } from './api';
import EmployeeForm from './EmployeeForm';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // Состояние для ширины окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingEmployee(null);
    setIsCreating(true);
  };

  const closeForm = () => {
    setEditingEmployee(null);
    setIsCreating(false);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      if (editingEmployee) {
        await editEmployee(editingEmployee.id, updatedEmployee);
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === editingEmployee.id ? updatedEmployee : emp
          )
        );
      } else if (isCreating) {
        const newEmployee = await createEmployee(updatedEmployee);
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      }
      closeForm(); // Закрываем форму после успешного обновления или создания
    } catch (err) {
      console.error('Ошибка при обновлении:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (err) {
      console.error('Ошибка при удалении:', err);
    }
  };

  const handleDetailPage = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <>
      {(editingEmployee || isCreating) && (
        <EmployeeForm
          initialValues={editingEmployee || {}}
          onAddEmployee={handleUpdateEmployee}
          closeForm={closeForm}
        />
      )}

      <h1 className="text-center mb-4">Управление сотрудниками</h1>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Button
            variant="primary"
            className="mb-3"
            onClick={handleCreate}
          >
            Добавить сотрудника
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                {<th>Полное имя</th>}
                {windowWidth >= 817 && <th>Email</th>}
                {windowWidth >= 817 && <th>Телефон</th>}
                {windowWidth >= 817 && <th>Адрес</th>}
                {windowWidth >= 817 && <th>Прописка</th>}
                {windowWidth >= 817 && <th>Дата рождения</th>}
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  { <td>{employee.fullName}</td>}
                  {windowWidth >= 817 && <td>{employee.email}</td>}
                  {windowWidth >= 817 && <td>{employee.phone}</td>}
                  {windowWidth >= 817 && <td>{employee.address}</td>}
                  {windowWidth >= 817 && <td>{employee.registration}</td>}
                  {windowWidth >= 817 && <td>{employee.birthday}</td>}
                  <td>
              <Button
                variant="warning"
                size="xs" // Измените на 'xs' для меньшего размера
                onClick={() => handleDetailPage(employee.id)}
                className="me-2"
              >
                Детали
              </Button>
              <Button
                variant="danger"
                size="xs" // Измените на 'xs' для меньшего размера
                onClick={() => handleDelete(employee.id)}
              >
                Удалить
              </Button>
            </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default EmployeeList;
