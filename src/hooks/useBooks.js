// src/hooks/useBooks.js
import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const useBooks = () => {
  // Estado para los libros y el estado de carga
  const [books, setBooks] = useLocalStorage('books', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar libros desde la API
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los libros');
      // Si hay un error, usamos los datos del localStorage
      console.error('Usando datos en caché:', err);
    } finally {
      setLoading(false);
    }
  }, [setBooks]);

  // Función para agregar un nuevo libro
  const addBook = useCallback(async (newBook) => {
    try {
      // Intentamos guardar en el servidor
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error('Error al guardar');

      const savedBook = await response.json();
      setBooks(prevBooks => [...prevBooks, savedBook]);

    } catch (err) {
      // Si falla, guardamos localmente y programamos sincronización
      console.log('Guardando localmente para sincronización posterior');
      setBooks(prevBooks => [...prevBooks, { ...newBook, pendingSync: true }]);
      // Registramos para sincronización posterior
      if ('serviceWorker' in navigator && 'sync' in registration) {
        registration.sync.register('sync-books');
      }
    }
  }, [setBooks]);

  // Función para actualizar un libro
  const updateBook = useCallback(async (id, updates) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
  }, [setBooks]);

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook
  };
};

export default useBooks;