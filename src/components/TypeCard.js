import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getType from '../services/getType';
import upperFirstLetter from '../helpers/upperFirstLetter';
import './TypeCard.css';

function TypeCard({ name }) {
  const [type, setType] = useState({});
  const typeExist = Object.keys(type).length > 0;

  useEffect(() => {
    if (!typeExist) {
      getType(name).then((result) => setType(result));
    }
  }, [type]);

  if (typeExist) {
    const { name } = type;
    return (
      <section className="type-card">
        <div className="type-card-header">
          <h3>{upperFirstLetter(name)}</h3>
          <img alt="type" src={require(`../images/pokemonTypes/${name}.png`)} title={name} />
        </div>
      </section>
    );
  }
}

TypeCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default TypeCard;
