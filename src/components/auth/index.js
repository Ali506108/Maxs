import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { loginAdmin, loginEmployee } from './api'; // Импортируйте функции авторизации
import './LoginPage.css'; // Подключим CSS для дополнительных стилей

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLogin, setAdminLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Сбросить ошибку

    try {
      if (adminLogin) {
        await loginAdmin(email, password); // Вход для администратора
      } else {
        await loginEmployee(email, password); // Вход для сотрудника
      }
      navigate('/main'); // Перенаправление на защищенную страницу
    } catch (err) {
      setError(err.message); // Установить сообщение об ошибке
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow-lg login-card">
            <h2 className="text-center mb-4">{adminLogin ? 'Вход для админа' : 'Вход для сотрудников'}</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Отображение ошибки */}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 btn-login">
                Войти
              </Button>
            </Form>
            <p className="text-center mt-3 switch-text">
              <Button variant="link" onClick={() => setAdminLogin(!adminLogin)} className="switch-btn">
                {adminLogin ? 'Перейти к входу для сотрудников' : 'Вход для админа'}
              </Button>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
