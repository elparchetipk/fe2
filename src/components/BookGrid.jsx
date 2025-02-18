// src/components/BookGrid.jsx
import React from 'react';
import BookCard from './BookCard';
import { useWindowSize } from '../hooks/useWindowSize';

const BookGrid = ({ books }) => {
  const { width } = useWindowSize();

  // Determinamos el número de columnas basado en el ancho de la pantalla
  const gridColumns = React.useMemo(() => {
    if (width < 640) return 'grid-cols-1';
    if (width < 768) return 'grid-cols-2';
    if (width < 1024) return 'grid-cols-3';
    return 'grid-cols-4';
  }, [width]);

  return (
    <div className={`grid ${gridColumns} gap-4 auto-rows-max`}>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          className="h-full"
        />
      ))}

      {/* Estado vacío */}
      {books.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No hay libros que mostrar. ¡Agrega algunos a tu biblioteca!
          </p>
        </div>
      )}
    </div>
  );
};

export default BookGrid;