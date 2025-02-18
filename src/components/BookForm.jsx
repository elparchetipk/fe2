// src/components/BookForm.jsx
import React, { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import useFormValidation from '../hooks/useFormValidation';

const initialState = {
  title: '',
  author: '',
  isbn: '',
  description: '',
  coverUrl: '',
  category: '',
  pageCount: '',
  publishedDate: ''
};

const validationRules = {
  title: { required: true },
  author: { required: true },
  isbn: {
    pattern: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
    message: 'ISBN inválido'
  },
  pageCount: {
    custom: (value) => {
      const num = Number(value);
      if (isNaN(num) || num <= 0) return 'Debe ser un número positivo';
      return null;
    }
  }
};

const BookForm = ({ book = null, onSubmit, onCancel }) => {
  const { addBook, updateBook } = useLibrary();

  const {
    values,
    setValues,
    errors,
    touched,
    setTouched,
    validate,
    isValid
  } = useFormValidation(book || initialState, validationRules);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle field blur for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validate();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (book) {
        await updateBook(book.id, values);
      } else {
        await addBook(values);
      }
      onSubmit?.();
    } catch (error) {
      // Error handling will be managed by the notification system
      console.error('Error saving book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 ${
              touched.title && errors.title ? 'border-red-500' : ''
            }`}
          />
          {touched.title && errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Similar structure for other fields */}
        {/* We'll continue with more fields in the next part */}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {book ? 'Actualizar' : 'Agregar'} Libro
        </button>
      </div>
    </form>
  );
};

export default BookForm;