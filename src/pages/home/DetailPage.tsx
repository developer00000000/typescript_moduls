import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Character {
  name: string;
  mass: string;
  height: string;
  gender: string;
}

const DetailPage: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | any>(null);

  const { id } = useParams<{ id: string }>();

 useEffect(() => {
  const fetchCharacter = async () => {
    setLoading(true); // setLoading ni ishga tushurish
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!response.ok) {
        throw new Error('Yuklashda xatolik yuz berdi');
      }
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // fetch tugaganidan so'ng setLoading ni false qilish
    }
  };

  fetchCharacter();
}, [id]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>Xatolik: {error.message}</div>;
  }

  if (!character) {
    return <div>Ma'lumot topilmadi.</div>;
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
};

export default DetailPage;