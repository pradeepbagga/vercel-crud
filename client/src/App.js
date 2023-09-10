import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Users from './Components/Users';
import AddUser from './Components/AddUser';
import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <BrowserRouter>
      <Container className='main-container'>
        <h2><Link to="/">MERN APP</Link></h2>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
