// controllers/taskEmployee.js

const { jwtDecode } = require('jwt-decode');
const TaskEmployee = require('./TaskEmployee');
const Employee = require('../employee/Employee');

const createTaskEmployee = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Получаем токен из заголовков запроса
        const token = getAuthToken(req);
        let employeeId = null;

        // Проверяем токен и получаем роль
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if (role === 'employee') {
                employeeId = decodedToken.id;
            }
        }

        // Создаем задачу для сотрудника
        const task = await TaskEmployee.create({ title, description, employeeId });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const employeeTasks = await TaskEmployee.findAll({
            include: [
                {
                    model: Employee,
                    as: 'author'
                }
            ]
        });

        res.status(200).json(employeeTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTaskEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        const task = await TaskEmployee.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.isCompleted = isCompleted || task.isCompleted;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEmployeeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskEmployee.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Утилита для получения токена из заголовков
const getAuthToken = (req) => {
    const authHeader = req.headers.authorization;
    return authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
};

module.exports = {
    createTaskEmployee,
    getAllTasks,
    updateTaskEmployee,
    deleteEmployeeTask
};
