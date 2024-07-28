import { useState, useEffect } from 'react';
import { getHeroes } from '../API/heroes.api';
import Filter from './Filter';

const HeroesList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efeito colateral para buscar dados dos heróis na API
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setLoading(true);
        const result = await getHeroes();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // Efeito colateral para travar o scroll do navegador quando o modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Função para carregar mais heróis
  const loadMoreHeroes = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  // Função para filtrar os heróis
  const handleFilter = (filteredHeroes) => {
    setFilteredData(filteredHeroes);
  };

  // Função para selecionar um herói
  const selectHero = (hero) => {
    setSelectedHeroes((prevSelected) => {
      if (prevSelected.length >= 2) {
        alert('Você só pode selecionar dois heróis.');
        return prevSelected;
      }
      const newSelected = [...prevSelected, hero];
      if (newSelected.length === 2) {
        setIsModalOpen(true);
      }
      return newSelected;
    });
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    if (getWinner()) {
      clearSelectedHeroes();
    }
  };

  // Função para limpar os heróis selecionados
  const clearSelectedHeroes = () => {
    setSelectedHeroes([]);
  };

  // Função para calcular o total de powerstats de um herói
  const getTotalPowerstats = (hero) => {
    return Object.values(hero.powerstats).reduce((acc, stat) => acc + stat, 0);
  };

  // Função para determinar o vencedor entre os heróis selecionados
  const getWinner = () => {
    if (selectedHeroes.length < 2) return null;
    const [hero1, hero2] = selectedHeroes;
    return getTotalPowerstats(hero1) > getTotalPowerstats(hero2) ? hero1.name : hero2.name;
  };

  // Renderização condicional para exibir um carregamento enquanto os dados são buscados
  if (loading) {
    return <div className="text-center text-xl">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Heróis</h1>
      <Filter heroes={data} onFilter={handleFilter} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.slice(0, limit).map((hero, index) => (
          <li key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{hero.name}</h2>
            <img src={hero.images.md} alt={hero.name} className="w-full h-auto rounded-md mb-4" />
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Powerstats:</h3>
              <ul>
                {Object.entries(hero.powerstats).map(([stat, value]) => (
                  <li key={stat} className="text-sm">
                    {stat}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => selectHero(hero)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Selecionar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={loadMoreHeroes}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Carregar Mais
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedHeroes.slice(0, 2).map((hero, index) => {
                const totalPowerstats = getTotalPowerstats(hero);
                return (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
                    <img src={hero.images.md} alt={hero.name} className="w-full h-auto rounded-md mb-4" />
                    <p className="text-lg font-semibold">Total Powerstats: {totalPowerstats}</p>
                  </div>
                );
              })}
            </div>
            <h3 className="text-xl font-bold mt-4">Vencedor:</h3>
            <p className="text-lg">{getWinner()}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroesList;