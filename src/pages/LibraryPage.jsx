// src/pages/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useUI } from '../context/UIContext';
import SearchBar from '../components/Search/SearchBar';
import FilterBar from '../components/Filters/FilterBar';
import BookGrid from '../components/BookGrid';
import Modal from '../components/Modal/Modal';
import BookForm from '../components/BookForm';

const LibraryPage = () => {
  const { books, fetchBooks, deleteBook } = useLibrary();
  const { showModal, hideModal, showNotification } = useUI();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargamos los libros al montar el componente
  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
        showNotification('Biblioteca cargada correctamente', 'success');
      } catch (error) {
        showNotification('Error al cargar la biblioteca', 'error');
      }
    };
    loadBooks();
  }, [fetchBooks, showNotification]);

  // Manejador para agregar un nuevo libro
  const handleAddBook = () => {
    showModal('addBook', {
      title: 'Agregar Nuevo Libro',
      content: (
        <BookForm
          onSubmit={() => {
            hideModal('addBook');
            showNotification('Libro agregado correctamente', 'success');
          }}
          onCancel={() => hideModal('addBook')}
        />
      )
    });
  };

  // Manejador para editar un libro
  const handleEditBook = (book) => {
    showModal('editBook', {
      title: 'Editar Libro',
      content: (
        <BookForm
          book={book}
          onSubmit={() => {
            hideModal('editBook');
            showNotification('Libro actualizado correctamente', 'success');
          }}
          onCancel={() => hideModal('editBook')}
        />
      )
    });
  };

  // Manejador para eliminar un libro
  const handleDeleteBook = (book) => {
    showModal('deleteConfirmation', {
      title: 'Confirmar Eliminación',
      content: (
        <div className="p-6">
          <p className="mb-4">
            ¿Estás seguro de que deseas eliminar "{book.title}"?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => hideModal('deleteConfirmation')}
              className="px-4 py-2 text-gray-700 border rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  await deleteBook(book.id);
                  hideModal('deleteConfirmation');
                  showNotification('Libro eliminado correctamente', 'success');
                } catch (error) {
                  showNotification('Error al eliminar el libro', 'error');
                }
              }}
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Eliminar
            </button>
          </div>
        </div>
      )
    });
  };

  // Función para filtrar y buscar libros
  const filterBooks = (searchTerm, filters) => {
    let result = books;

    // Aplicar búsqueda
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    if (filters.reading) {
      result = result.filter(book => book.isReading);
    }
    if (filters.completed) {
      result = result.filter(book => book.isCompleted);
    }
    if (filters.wishlist) {
      result = result.filter(book => book.inWishlist);
    }

    setFilteredBooks(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi Biblioteca</h1>
        <button
          onClick={handleAddBook}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Agregar Libro
        </button>
      </div>

      <div className="space-y-4">
        <SearchBar
          onSearch={term => {
            setSearchTerm(term);
            filterBooks(term, filters);
          }}
        />
        <FilterBar
          onFilterChange={newFilters => {
            filterBooks(searchTerm, newFilters);
          }}
        />
      </div>

      <BookGrid
        books={filteredBooks}
        onEditBook={handleEditBook}
        onDeleteBook={handleDeleteBook}
      />
    </div>
  );
};

export default LibraryPage;