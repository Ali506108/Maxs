import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Для декодирования токена
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Декодируем токен
      userRole = decodedToken.role; // Предположим, что роль записана как 'role' в токене
    } catch (err) {
      console.error('Ошибка при декодировании токена:', err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    navigate('/login'); // Перенаправляем на страницу логина
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/main">
          Main
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                {userRole === 'admin' && (
                  <Nav.Link as={Link} to="/employees" className="nav-link">
                    Employees
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/tasks" className="nav-link">
                  Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="/clients" className="nav-link">
                  Clients
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
