import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ExcelUploadModal = ({ show, handleClose, onUpload }) => {
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Пожалуйста, загрузите файл формата .xlsx');
      setFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        // Предположим, вы хотите обработать первый лист
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        onUpload(jsonData);
        handleClose(); // Закрыть модалку после загрузки
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Загрузить Excel файл</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fileUpload">
            <Form.Label>Выберите файл (.xlsx)</Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              required
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              Загрузить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExcelUploadModal;
