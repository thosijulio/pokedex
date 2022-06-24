import { Routes, Route } from 'react-router-dom';
import Pokemon from './pages/Pokemon';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
