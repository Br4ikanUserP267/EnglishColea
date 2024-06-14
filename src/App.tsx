import './App.css';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Login} from './pages/Login/Login'; // Asegúrate de importar Login correctamente

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Añade más rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
