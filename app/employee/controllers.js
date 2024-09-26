const bcrypt = require('bcrypt');
const Employee = require('./Employee');



const createEmployee = async (req, res) => {
    try {
        console.log(req.body);
        const { fullName, phone, address, registration, birthday, email, password } = req.body;

        const existingEmployee = await Employee.findOne({where:{email}})
          
          
          if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email is  exist ' });
          }
          

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await Employee.create({ 
            fullName,
            phone, 
            address, 
            registration, 
            birthday, 
            email, 
            password: hashedPassword
        });

        return res.status(201).json({ message: 'Employee created successfully' });


    } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllEmployee = async (req, res) => {
    try {
      const employeeAll = await Employee.findAll();
      return res.status(200).json(employeeAll);
    } catch (error) {
      console.error('Error fetching employees:', error);
      return res.status(500).json({ message: 'Failed to fetch employees' });
    }
  };

  const updateEmployee = async (req, res) => {
    const { id } = req.params; // Предполагаем, что id сотрудника передается в параметрах запроса
    const { fullName, phone, address, registration, birthday, password } = req.body; // Данные для обновления
  
    try {
      const employee = await Employee.findByPk(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      
      await Employee.update(
        {
          fullName,
          phone,
          address,
          registration,
          birthday,
          email : employee.email ,
          password
        },
        {
          where: { id }
        }
      );
  
      return res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error updating employee:', error);
      return res.status(500).json({ message: 'Failed to update employee' });
    }
  };
  

  const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.destroy();

        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id); // Извлекаем id из параметров
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' }); // Возвращаем сообщение об ошибке
    }
    res.status(200).json(employee); // Возвращаем найденного сотрудника
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error' }); // Возвращаем сообщение об ошибке сервера
  }
};
  

module.exports = {
    createEmployee , 
    getAllEmployee , 
    updateEmployee , 
    deleteEmployee ,
    getEmployeeById
};
