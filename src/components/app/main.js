import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './main.css'; // Добавьте свой CSS файл для стилей

const Main = () => {
  return (
    <Container fluid className="main-container">
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title as="h1" className="text-primary">Добро пожаловать в Админ Панель!</Card.Title>
              <Card.Text className="lead">
                Здесь вы можете управлять внутренним бизнеесом Maximus.
             
              </Card.Text>
         
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
