// src/context/LibraryContext.js
import React, { createContext, useContext } from 'react';
import useBooks from '../hooks/useBooks';
import useLocalStorage from '../hooks/useLocalStorage';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const booksManager = useBooks();
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [filters, setFilters] = useLocalStorage('filters', {
    reading: false,
    completed: false,
    wishlist: false
  });

  const value = {
    ...booksManager,
    theme,
    setTheme,
    filters,
    setFilters
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary debe usarse dentro de un LibraryProvider');
  }
  return context;
};