import { useEffect, useState } from 'react';
import TypesCard from '../components/TypesCard';
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
      {types.map(({ url }, index) => (
        <TypesCard key={index} url={url} />
      ))}
    </main>
  );
}

export default Types;
