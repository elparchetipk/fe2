// src/services/bookService.js
import { sampleBooks } from '../data/sampleBooks';

export class BookService {
  constructor() {
    // Inicialmente usamos datos de ejemplo
    this.books = [...sampleBooks];
  }

  async getBooks() {
    // En el futuro, esto podría obtener datos de una API real
    return this.books;
  }

  async searchBooks(query) {
    // Más adelante, esto podría buscar en Google Books
    return this.books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  }

  getPlaceholderCover(title, author) {
    // Generamos una portada placeholder con el título y autor
    return `https://via.placeholder.com/300x450/808080/FFFFFF?text=${encodeURIComponent(title)}`;
  }
}