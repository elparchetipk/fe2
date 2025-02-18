// src/context/LibraryContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { bookStorage } from '../services/storage/StorageService';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializamos el almacenamiento
  useEffect(() => {
    const initStorage = async () => {
      try {
        await bookStorage.init();
        const storedBooks = await bookStorage.getAllBooks();
        setBooks(storedBooks);
      } catch (error) {
        setError('Error al inicializar el almacenamiento');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initStorage();
  }, []);

  // Manejador para agregar un libro
  const addBook = async (bookData) => {
    try {
      const savedBook = await bookStorage.saveBook(bookData);
      setBooks(prev => [...prev, savedBook]);
      return savedBook;
    } catch (error) {
      setError('Error al guardar el libro');
      throw error;
    }
  };

  // Manejador para actualizar un libro
  const updateBook = async (id, bookData) => {
    try {
      const updatedBook = await bookStorage.saveBook({
        ...bookData,
        id
      });
      setBooks(prev =>
        prev.map(book =>
          book.id === id ? updatedBook : book
        )
      );
      return updatedBook;
    } catch (error) {
      setError('Error al actualizar el libro');
      throw error;
    }
  };

  // Manejador para buscar libros
  const searchBooks = async (query) => {
    try {
      return await bookStorage.searchBooks(query);
    } catch (error) {
      setError('Error en la búsqueda');
      throw error;
    }
  };

  return (
    <LibraryContext.Provider value={{
      books,
      loading,
      error,
      addBook,
      updateBook,
      searchBooks
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);