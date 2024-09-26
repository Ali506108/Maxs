import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editEmployee, createEmployee } from './api'; // Импортируем функцию обновления

const EmployeeForm = ({ initialValues = {}, onAddEmployee, closeForm }) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const formik = useFormik({
    initialValues: {
      fullName: initialValues.fullName || '',
      registration: initialValues.registration || '',
      phone: initialValues.phone || '',
      address: initialValues.address || '',
      birthday: initialValues.birthday || '',
      password: initialValues.password || '',
      email: initialValues.email || '', // Email все еще здесь, но можно его не показывать
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      phone: Yup.string()
        .matches(/^\+7\d{10}$/, 'Phone must start with +7 and be followed by 10 digits')
        .notRequired(),
      birthday: Yup.string()
        .matches(/^\d{4}\.\d{2}\.\d{2}$/, 'Birthday must be in the format YYYY.MM.DD')
        .notRequired(),
      password: Yup.string().min(4, 'Password must be at least 4 characters long').notRequired(),
    }),
    onSubmit: async (values, { resetForm, setTouched }) => {
      const employeeData = {
        fullName: values.fullName,
        email: initialValues.email || values.email, // Используем существующий email при редактировании
        phone: values.phone,
        address: values.address,
        registration: values.registration,
        birthday: values.birthday,
        password: values.password,
      };

      try {
        // Проверяем наличие ID для редактирования
        if (initialValues.id) {
          await editEmployee(initialValues.id, employeeData); // Обновляем сотрудника
        } else {
          await createEmployee(employeeData); // Создание нового сотрудника
        }
        onAddEmployee(employeeData); // Передаем данные наверх в нужном формате
        resetForm();
        setTouched({}); // Сброс состояния touched для всех полей
        setErrorMessage(''); // Сброс ошибки при успешной отправке
        closeForm(); // Закрытие формы после успешного добавления
      } catch (error) {
        setErrorMessage(error.message); // Установка сообщения об ошибке
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow">
      <h3 className="mb-4">Employee Form</h3>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.fullName && formik.errors.fullName}
          placeholder="Enter employee full name"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.fullName}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Условное отображение поля email */}
      {!initialValues.email && (
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
            placeholder="Enter employee email"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group controlId="registration">
        <Form.Label>Registration</Form.Label>
        <Form.Control
          type="text"
          name="registration"
          value={formik.values.registration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.registration && formik.errors.registration}
          placeholder="Enter employee registration"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.registration}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.phone && formik.errors.phone}
          placeholder="Enter employee phone (+7XXXXXXXXXX)"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.address && formik.errors.address}
          placeholder="Enter employee address"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="birthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          name="birthday"
          value={formik.values.birthday}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.birthday && formik.errors.birthday}
          placeholder="Enter employee birthday YYYY.MM.DD"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.birthday}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.password && formik.errors.password}
          placeholder="Enter employee password"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="mt-3">Submit</Button>

      <Button 
        type="button" 
        className="ms-3 mt-3" // Отступ слева и сверху
        variant="danger" // Красный цвет кнопки
        onClick={closeForm}
      >
        Close
      </Button>
    </Form>
  );
};

export default EmployeeForm;
