import { useEffect, useState } from 'react';
import TypeCard from '../components/TypeCard';
import getTypes from '../services/getTypes';
import './Types.css';

function Types() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (!types.length) {
      getTypes().then((result) => setTypes(result));
    }
  }, [types]);
  return (
    <main className="main-types">
      {types.map(({ name }, index) => (
        <TypeCard key={index} name={name} />
      ))}
    </main>
  );
}

export default Types;
