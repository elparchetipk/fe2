// src/components/Search/SearchBar.jsx
import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Utilizamos debounce para evitar demasiadas búsquedas
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar libros..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

// src/components/Filters/FilterBar.jsx
const FilterBar = () => {
  const { filters, setFilters } = useLibrary();

  const handleFilterChange = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  return (
    <div className="flex flex-wrap gap-2">
      <FilterButton
        active={filters.reading}
        onClick={() => handleFilterChange('reading')}
      >
        Leyendo
      </FilterButton>
      <FilterButton
        active={filters.completed}
        onClick={() => handleFilterChange('completed')}
      >
        Completados
      </FilterButton>
      <FilterButton
        active={filters.wishlist}
        onClick={() => handleFilterChange('wishlist')}
      >
        Lista de deseos
      </FilterButton>
    </div>
  );
};

const FilterButton = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-colors
        ${active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
    >
      {children}
    </button>
  );
};