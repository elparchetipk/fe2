// src/components/BookCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BookCard = ({ book, onEdit, onDelete }) => {
  // Utilizamos intersection observer para animaciones al entrar en viewport
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
      }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
    >
      {/* Contenedor de la imagen con efecto de zoom suave */}
      <motion.div
        className="relative overflow-hidden h-48"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay con acciones */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(book)}
            className="p-2 bg-white rounded-full"
          >
            <EditIcon />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(book)}
            className="p-2 bg-white rounded-full"
          >
            <DeleteIcon />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Información del libro con animaciones sutiles */}
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{book.author}</p>
      </motion.div>
    </motion.div>
  );
};

export default BookCard;