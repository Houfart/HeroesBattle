import React from 'react';

const BattleModal = ({ isOpen, onClose, hero1, hero2 }) => {
  if (!isOpen) return null;

  const calculateScore = (hero) => {
    const { intelligence, strength, speed, durability, power, combat } = hero.powerstats;
    return (intelligence + strength + speed + durability + power + combat) / 6;
  };

  const hero1Score = calculateScore(hero1);
  const hero2Score = calculateScore(hero2);

  const winner = hero1Score > hero2Score ? hero1.name : hero2.name;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Resultado da Batalha</h2>
        <p className="mb-4">{hero1.name} vs {hero2.name}</p>
        <p className="mb-4">Vencedor: <strong>{winner}</strong></p>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default BattleModal;