import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getType from '../services/getType';
import upperFirstLetter from '../helpers/upperFirstLetter';
import './TypeCard.css';
import { Link } from 'react-router-dom';

function TypeCard({ name }) {
  const [type, setType] = useState({});
  const typeExist = Object.keys(type).length > 0;

  useEffect(() => {
    if (!typeExist) {
      getType(name).then((result) => setType(result));
    }
  }, [type]);

  if (typeExist) {
    const {
      id,
      name,
      damage_relations: {
        double_damage_from,
        double_damage_to,
        half_damage_from,
        half_damage_to,
        no_damage_from,
        no_damage_to
      }
    } = type;

    return (
      <section className="type-card">
        <div className="type-card-header">
          <h3>{upperFirstLetter(name)}</h3>
          <img alt="type" src={require(`../images/pokemonTypes/${name}.png`)} title={name} />
        </div>
        <div className="type-card-other-infos">
          <div className="type-card-damage-relation">
            <h4>Double damage from: </h4>
            {double_damage_from.length
              ? double_damage_from.map(({ name }, index) => (
                  <img
                    alt={`${name}`}
                    key={index}
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={`${name}`}
                  />
                ))
              : 'None'}
          </div>
          <div className="type-card-damage-relation">
            <h4>Double damage to: </h4>
            {double_damage_to.length
              ? double_damage_to.map(({ name }, index) => (
                  <img
                    alt={`${name}`}
                    key={index}
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={`${name}`}
                  />
                ))
              : 'None'}
          </div>
          <div className="type-card-damage-relation">
            <h4>Half damage from: </h4>
            {half_damage_from.length
              ? half_damage_from.map(({ name }, index) => (
                  <img
                    alt={`${name}`}
                    key={index}
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={`${name}`}
                  />
                ))
              : 'None'}
          </div>
          <div className="type-card-damage-relation">
            <h4>Half damage to: </h4>
            {half_damage_to.length
              ? half_damage_to.map(({ name }, index) => (
                  <img
                    alt={`${name}`}
                    key={index}
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={`${name}`}
                  />
                ))
              : 'None'}
          </div>
          <div className="type-card-damage-relation">
            <h4>No damage from: </h4>
            {no_damage_from.length
              ? no_damage_from.map(({ name }, index) => (
                  <img
                    alt={`${name}`}
                    key={index}
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={`${name}`}
                  />
                ))
              : 'None'}
          </div>
          <div className="type-card-damage-relation">
            <h4>No damage to: </h4>
            {no_damage_to.length ? (
              no_damage_to.map(({ name }, index) => (
                <img
                  alt={`${name}`}
                  key={index}
                  src={require(`../images/pokemonTypes/${name}.png`)}
                  title={`${name}`}
                />
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
        <div className="type-card-footer">
          <Link id="btn-type-details" to={`/types/${id}`}>
            See details
          </Link>
        </div>
      </section>
    );
  }
}

TypeCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default TypeCard;
