import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const BookCard = ({ book }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className="transform hover:scale-105 transition-duration-300 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full ${isMobile ? 'h-48' : 'h-64'} object-cover"
          loading="lazy"/>
          {book.isReading && (
            <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm ">Leyendo
            </span>
          )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{book.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {book.author}
        </p>
      </div>
    </div>
  )
}

export default BookCard;