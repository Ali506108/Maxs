import React, { useEffect, useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { getTasks, createTask, editTask, deleteTask } from './api'; 
import CreateTaskModal from './CreateTaskModal';
import './taskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(); // Получаем задачи
        
        // Убедимся, что задачи корректно объединяются (если response содержит два разных списка)
      // Задачи сотрудника (если нужны adminTasks, добавьте их также)
        setTasks(response);
      } catch (err) {
        console.error('Ошибка загрузки задач:', err); // Логируем ошибку
        setError(err.message || 'Ошибка загрузки задач'); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskData) => {
    try {
      const createdTask = await getTasks(); // Создаем новую задачу
      setTasks((prev) => [...prev, createdTask]);
      setShowModal(false);
    } catch (err) {
      console.error('Ошибка при создании задачи:', err); // Логируем ошибку
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id); // Удаляем задачу
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении задачи:', err); // Логируем ошибку
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    try {
      await editTask(task.id, updatedTask); // Обновляем задачу
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err); // Логируем ошибку
    }
  };

  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container">
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Создать новую задачу
      </Button>

      <CreateTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        onTaskCreated={handleTaskCreated}
        taskToEdit={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />

      <h2 className="mt-4 text-dark text-center">Все задачи</h2>
      {tasks.map((task) => (
        <div key={task.id} className={`task-card p-4 mb-3 rounded shadow ${task.isCompleted ? 'bg-light border border-success' : 'bg-white border'}`}>
          <h5 className="text-center text-muted">{task.title}</h5>
          <p className="text-center text-muted">{task.description}</p>
          <small className="text-center d-block text-muted">Создано: {new Date(task.createdAt).toLocaleString()}</small>
          <small className="text-center d-block text-muted">
            Ответственный: {task.author?.fullName || 'Админ'}
          </small>
          <div className="mt-2 text-center">
          <Button
  variant={task.isCompleted ? 'outline-success' : 'outline-secondary'}
  onClick={() => handleToggleComplete(task)}
  className="me-2" // Отступ справа
  style={{ marginTop: '5px', marginBottom: '5px' }} // Отступ сверху и снизу
>
  {task.isCompleted ? 'Завершено' : 'Не завершено'}
</Button>
<Button
  variant="outline-info"
  onClick={() => openEditTaskModal(task)}
  className="me-2" // Отступ справа
  style={{ marginTop: '5px', marginBottom: '5px' }} // Отступ сверху и снизу
>
  Редактировать
</Button>
<Button
  variant="outline-danger"
  onClick={() => handleDeleteTask(task.id)}
  style={{ marginTop: '5px', marginBottom: '5px' }} // Отступ сверху и снизу
>
  Удалить
</Button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
