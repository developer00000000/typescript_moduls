import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Yuklashda xatolik yuz berdi');
        }
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
    
    };
  }, [id]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>Xatolik: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Detail sahifa</h1>
      <div className="character-details">
        <h2>{character.name}</h2>
        <p>Massa: {character.mass}</p>
        <p>Bo'yi: {character.height}</p>
        <p>Jins: {character.gender}</p>
        
      </div>
    </div>
  );
}

export default DetailPage;