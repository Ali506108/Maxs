import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getAllClients, editClient, deleteClient, createClient, ExcelFetch } from './api';
import ClientForm from './ClientForm';
import ExcelUploadModal from './excelAddEmployee';
import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isExcelModalOpen, setExcelModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getAllClients();
        setClients(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setIsCreating(true);
  };

  const closeForm = () => {
    setEditingClient(null);
    setIsCreating(false);
  };

  const closeExcelModal = () => {
    setExcelModalOpen(false);
  };

  const handleUpdateClient = async (updatedClient) => {
    try {
      if (editingClient) {
        await editClient(editingClient.id, updatedClient);
        setClients((prevClients) =>
          prevClients.map((cli) =>
            cli.id === editingClient.id ? updatedClient : cli
          )
        );
      } else if (isCreating) {
        const newClient = await createClient(updatedClient);
        setClients((prevClients) => [...prevClients, newClient]);
      }
      closeForm();
    } catch (err) {
      console.error('Ошибка при обновлении:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении:', err);
    }
  };

  const handleDetailPage = (id) => {
    navigate(`/clients/${id}`);
  };

  const handleUpload = async (data) => {
    try {
      await ExcelFetch(data);
      console.log('Файл успешно загружен');
      closeExcelModal(); // Закрыть модалку после загрузки
      const updatedClients = await getAllClients(); // Обновляем список клиентов
      setClients(updatedClients);
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    }
  };

  // Получаем ширину окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {(editingClient || isCreating) && (
        <ClientForm
          initialValues={editingClient || {}}
          onAddClient={handleUpdateClient}
          closeForm={closeForm}
        />
      )}

      <ExcelUploadModal
        show={isExcelModalOpen}
        handleClose={closeExcelModal}
        onUpload={handleUpload}
      />

      <h1 className="text-center mb-4">Управление клиентами</h1>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setExcelModalOpen(true)}
          >
            Загрузить Excel
          </Button>
          <Button
            variant="primary"
            className="mb-3 ms-2"
            onClick={handleCreate}
          >
            Добавить клиента
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Полное имя</th>
                {windowWidth >= 817 && <th>Email</th>}
                {windowWidth >= 817 && <th>Телефон</th>}
                {windowWidth >= 817 && <th>Пол</th>}
                {windowWidth >= 817 && <th>Дата рождения</th>}
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client.id}>
                  <td>{index + 1}</td>
                  <td>{client.name}</td>
                  {windowWidth >= 817 && <td>{client.email}</td>}
                  {windowWidth >= 817 && <td>{client.phone}</td>}
                  {windowWidth >= 817 && <td>{client.gender}</td>}
                  {windowWidth >= 817 && <td>{client.birthday}</td>}
                  <td>
                    <Button
                      variant="warning"
                      size="xs"
                      onClick={() => handleDetailPage(client.id)}
                      className="me-2"
                    >
                      Детали
                    </Button>
                    <Button
                      variant="danger"
                      size="xs"
                      onClick={() => handleDelete(client.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ClientList;
