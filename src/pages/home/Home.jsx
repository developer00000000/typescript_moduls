import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      if (!response.ok) {
        throw new Error('Yuklashda xatolik yuz berdi');
      }
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter(character => {
    return character.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>Xatolik: {error.message}</div>;
  }

  return (
    <div className='container'>
      <div className='input'>
        <input type="text" placeholder='Qidirish' value={searchTerm} onChange={handleSearch} />
      </div>
      <h1 className='charakter'>USERS</h1>
      <div className="character-list">
        {filteredCharacters.map((character, index) => (
          <Link to={`/detail/${index+1}`} className="character-card" key={index}>
            <h3>{character.name}</h3>
            <p>Massa: {character.mass}</p>
            <p>Bo'yi: {character.height}</p>
            <p>Jins: {character.gender}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;