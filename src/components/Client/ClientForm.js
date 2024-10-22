import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const ClientForm = ({ initialValues, onAddClient, closeForm }) => {
  const [client, setClient] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Сбрасываем ошибку при изменении значения
  };

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^\+7\d{10}$/; // Для формата +7XXXXXXXXXX
    const datePattern = /^\d{4}\.\d{2}\.\d{2}$/; // Для формата ГГГГ.ММ.ДД

    if (client.email && !/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!client.phone) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!phonePattern.test(client.phone)) {
      newErrors.phone = 'Телефон должен начинаться с +7 и содержать 10 цифр';
    }

    if (client.birthday && !datePattern.test(client.birthday)) {
      newErrors.birthday = 'Некорректный формат даты (ГГГГ.ММ.ДД)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Если ошибок нет, возвращаем true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddClient(client);
    }
  };

  return (
    <Modal show onHide={closeForm}>
      <Modal.Header closeButton>
        <Modal.Title>{initialValues.id ? 'Редактировать клиента' : 'Добавить клиента'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="name">
            <Form.Label>Полное имя</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={client.name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={client.email || ''}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={client.phone || ''}
              onChange={handleChange}
              placeholder="+7XXXXXXXXXX"
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Пол</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={client.gender || ''}
              onChange={handleChange}
            >
              <option value="">Выберите пол</option>
              <option value="муж">Мужской</option>
              <option value="жен">Женский</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="birthday">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="text"
              name="birthday"
              value={client.birthday || ''}
              onChange={handleChange}
              placeholder="ГГГГ.ММ.ДД"
              isInvalid={!!errors.birthday}
            />
            <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              {initialValues.id ? 'Сохранить изменения' : 'Добавить клиента'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClientForm;
