import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClientById, editClient } from './api'; // Импортируем необходимые функции
import ClientForm from './ClientForm'; // Форма для редактирования
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setClient(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id , isEditing]);

  const handleEdit = async (updatedClient) => {
    await editClient(updatedClient.id, updatedClient);
    setIsEditing(false);
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!client) return <Alert variant="warning">Клиент не найден</Alert>;

  return (
    <div className="container mt-4">
      {isEditing ? (
        <ClientForm
          initialValues={client}
          onAddClient={handleEdit}
          closeForm={() => setIsEditing(false)}
        />
      ) : (
        <Card className="mb-4 p-3">
          <Card.Header>
            <h2>Детали клиента</h2>
          </Card.Header>
          <Card.Body>
            <p><strong>Полное имя:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Телефон:</strong> {client.phone}</p>
            <p><strong>Пол:</strong> {client.gender}</p>
            <p><strong>Дата рождение:</strong> {client.birthday}</p>
            <Button variant="warning" onClick={() => setIsEditing(true)}>Изменить</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ClientDetail;
