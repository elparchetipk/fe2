// src/components/BookCard.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';

const BookCard = ({ book, onEdit, onDelete }) => {
  const { preferences } = useAccessibility();
  const cardRef = useRef(null);

  // Determinamos si las animaciones deben estar activas
  const shouldAnimate = !preferences.reduceMotion;

  // Manejador de eventos de teclado
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        // Activar la acción principal (ver detalles)
        onViewDetails(book);
        break;
      case 'e':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          onEdit(book);
        }
        break;
      case 'Delete':
        onDelete(book);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="article"
      aria-label={`Libro: ${book.title} por ${book.author}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      animate={shouldAnimate ? { scale: 1 } : undefined}
      className={`
        bg-white dark:bg-gray-800
        rounded-lg overflow-hidden
        ${preferences.highContrast ? 'border-2 border-black dark:border-white' : 'border border-gray-200'}
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none
      `}
    >
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={`Portada del libro ${book.title}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        {/* Overlay de acciones accesible */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 focus-within:opacity-100
          transition-opacity duration-200"
          role="group"
          aria-label="Acciones del libro"
        >
          <div className="flex items-center justify-center h-full space-x-4">
            <button
              onClick={() => onEdit(book)}
              aria-label={`Editar libro ${book.title}`}
              className="p-2 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <EditIcon aria-hidden="true" />
            </button>
            <button
              onClick={() => onDelete(book)}
              aria-label={`Eliminar libro ${book.title}`}
              className="p-2 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <DeleteIcon aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Información del libro con tamaño de texto ajustable */}
      <div className="p-4">
        <h3 className={`
          font-semibold mb-2
          ${preferences.fontSize === 'large' ? 'text-xl' :
            preferences.fontSize === 'small' ? 'text-base' : 'text-lg'}
        `}>
          {book.title}
        </h3>
        <p className={`
          text-gray-600 dark:text-gray-300
          ${preferences.fontSize === 'large' ? 'text-lg' :
            preferences.fontSize === 'small' ? 'text-sm' : 'text-base'}
        `}>
          {book.author}
        </p>

        {/* Metadatos adicionales para lectores de pantalla */}
        <div className="sr-only">
          <p>Género: {book.genre}</p>
          <p>Fecha de publicación: {book.publishDate}</p>
          <p>Estado de lectura: {book.isReading ? 'En lectura' : 'No iniciado'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;