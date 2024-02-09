import React, { createContext, useContext, useState,useEffect } from 'react';

const CharacterContext = createContext();

export const useCharacterContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <CharacterContext.Provider value={{ characters, loading, error }}>
      {children}
    </CharacterContext.Provider>
  );
};