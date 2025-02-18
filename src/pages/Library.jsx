// src/pages/Library.jsx
import React, { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import BookGrid from '../components/BookGrid';
import FilterBar from '../components/FilterBar';
import AddBookButton from '../components/AddBookButton';

const Library = () => {
  const {
    books,
    loading,
    error,
    fetchBooks,
    filters
  } = useLibrary();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Función para filtrar los libros según los filtros activos
  const filteredBooks = React.useMemo(() => {
    return books.filter(book => {
      if (filters.reading && !book.isReading) return false;
      if (filters.completed && !book.isCompleted) return false;
      if (filters.wishlist && !book.inWishlist) return false;
      return true;
    });
  }, [books, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi Biblioteca</h1>
        <AddBookButton />
      </div>

      <FilterBar />

      <BookGrid books={filteredBooks} />
    </div>
  );
};

export default Library;