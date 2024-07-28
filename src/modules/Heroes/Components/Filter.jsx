import PropTypes from 'prop-types';
import { useState } from 'react';

const Filter = ({ heroes, onFilter }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterClick = () => {
    const filteredHeroes = heroes.filter(hero =>
      hero.name.toLowerCase().includes(query.toLowerCase())
    );
    onFilter(filteredHeroes);
  };

  const handleClearClick = () => {
    setQuery('');
    onFilter(heroes);
  };

  return (
    <div className="mb-4 flex space-x-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Filtrar heróis..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleFilterClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Filtrar
      </button>
      <button
        onClick={handleClearClick}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
      >
        Limpar
      </button>
    </div>
  );
};

Filter.propTypes = {
  heroes: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default Filter;