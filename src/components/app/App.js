import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../appHeader/AppHeader';
import EmployeeList from '../Employee/EmployeeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from '../auth';
import withAuth from '../auth/withAuth';
import EmployeeDetail from '../Employee/EmployeeDetail';
import ClientDetail from '../Client/clientDetail';
import ClientList from '../Client/ClientList';
import TaskList from '../task/taskList';
import Main from './main';
function App() {
  const ProtectedEmployeeList = withAuth(EmployeeList); // Защищаем компоненты
  const ProtectedClientList = withAuth(ClientList);
  const ProtectedTaskList = withAuth(TaskList);

  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
        <Route path="/" element={<Main />} />
 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/employees" element={<ProtectedEmployeeList />} />

          <Route path="/tasks" element={<ProtectedTaskList/>} />


          <Route path="/clients" element={<ProtectedClientList />} />
          <Route path="/clients/:id" element={<ClientDetail />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
