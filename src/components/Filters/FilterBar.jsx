// src/components/Filters/FilterBar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FilterBar = ({ onFilterChange, activeFilters }) => {
  // Animación para el contenedor de filtros
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  // Animación para cada botón de filtro
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2"
    >
      {Object.entries(activeFilters).map(([key, active]) => (
        <motion.button
          key={key}
          variants={buttonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-full transition-colors ${
            active
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FilterBar;