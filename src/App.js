import { Routes, Route } from 'react-router-dom';
import Pokemon from './pages/Pokemon';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/pokemon" element={<Pokemon />} />
    </Routes>
  );
}

export default App;
