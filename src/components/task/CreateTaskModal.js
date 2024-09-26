import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createTask, editTask } from './api';

const CreateTaskModal = ({ show, handleClose, onTaskCreated, taskToEdit, onTaskUpdated }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', isCompleted: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setNewTask({ 
        title: taskToEdit.title, 
        description: taskToEdit.description,
        isCompleted: taskToEdit.isCompleted
      });
    } else {
      setNewTask({ title: '', description: '', isCompleted: false });
    }
  }, [taskToEdit]);

  const handleCreateOrEditTask = async () => {
    if (loading) return; // Предотвращение повторной отправки

    setLoading(true); // Установка флага загрузки

    try {
      if (taskToEdit) {
        const updatedTask = await editTask(taskToEdit.id, { ...newTask, id: taskToEdit.id });
        onTaskUpdated(updatedTask);
      } else {
        const createdTask = await createTask(newTask);
        onTaskCreated(createdTask);
      }
      handleClose();
    } catch (err) {
      console.error('Ошибка при создании/редактировании задачи', err);
    } finally {
      setLoading(false); // Сброс флага загрузки
    }
  };

  const toggleCompletion = () => {
    setNewTask((prev) => ({
      ...prev,
      isCompleted: !prev.isCompleted,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? 'Редактирование задачи' : 'Создание новой задачи'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Название задачи</Form.Label>
            <Form.Control
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Введите название задачи"
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Описание задачи</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Введите описание задачи"
            />
          </Form.Group>
          {/* Условное отображение чекбокса */}
          {taskToEdit && (
            <Form.Group controlId="formTaskCompletion">
              <Form.Check 
                type="checkbox" 
                label={newTask.isCompleted ? 'Завершено' : 'Не завершено'}
                checked={newTask.isCompleted}
                onChange={toggleCompletion}
                style={{ backgroundColor: newTask.isCompleted ? 'lightgreen' : 'lightcoral' }}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="success" onClick={handleCreateOrEditTask} disabled={loading}>
          {loading ? 'Обрабатывается...' : (taskToEdit ? 'Обновить' : 'Создать')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
