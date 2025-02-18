// src/services/storage/StorageService.js
class StorageService {
  constructor(storeName, version = 1) {
    this.storeName = storeName;
    this.version = version;
    this.db = null;
    this.syncPending = new Set();
  }

  // Inicializa la base de datos IndexedDB
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.storeName, this.version);

      request.onerror = () => {
        console.error('Error al abrir la base de datos');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Creamos el almacén de objetos para los libros
        if (!db.objectStoreNames.contains('books')) {
          const store = db.createObjectStore('books', {
            keyPath: 'id',
            autoIncrement: true
          });

          // Creamos índices para búsquedas comunes
          store.createIndex('title', 'title', { unique: false });
          store.createIndex('author', 'author', { unique: false });
          store.createIndex('syncStatus', 'syncStatus', { unique: false });
        }
      };
    });
  }

  // Método para agregar o actualizar un libro
  async saveBook(book) {
    try {
      const transaction = this.db.transaction(['books'], 'readwrite');
      const store = transaction.objectStore('books');

      // Marcamos el libro para sincronización
      book.syncStatus = 'pending';
      book.lastModified = Date.now();

      const request = store.put(book);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          this.syncPending.add(book.id);
          this.scheduleSyncPending();
          resolve(book);
        };

        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      throw error;
    }
  }

  // Obtiene todos los libros
  async getAllBooks() {
    try {
      const transaction = this.db.transaction(['books'], 'readonly');
      const store = transaction.objectStore('books');
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      throw error;
    }
  }

  // Busca libros por título o autor
  async searchBooks(query) {
    try {
      const books = await this.getAllBooks();
      const searchQuery = query.toLowerCase();

      return books.filter(book =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery)
      );
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      throw error;
    }
  }

  // Programa la sincronización de cambios pendientes
  scheduleSyncPending() {
    if (!navigator.onLine) {
      // Si estamos offline, registramos para sincronización posterior
      if ('serviceWorker' in navigator && 'sync' in registration) {
        registration.sync.register('sync-books');
      }
      return;
    }

    this.syncPendingChanges();
  }

  // Sincroniza los cambios pendientes con el servidor
  async syncPendingChanges() {
    if (this.syncPending.size === 0) return;

    try {
      const transaction = this.db.transaction(['books'], 'readwrite');
      const store = transaction.objectStore('books');

      for (const id of this.syncPending) {
        const request = store.get(id);

        request.onsuccess = async () => {
          const book = request.result;

          if (book && book.syncStatus === 'pending') {
            try {
              // Intentamos sincronizar con el servidor
              await this.syncWithServer(book);

              // Actualizamos el estado de sincronización
              book.syncStatus = 'synced';
              store.put(book);
              this.syncPending.delete(id);
            } catch (error) {
              console.error('Error al sincronizar:', error);
            }
          }
        };
      }
    } catch (error) {
      console.error('Error en la sincronización:', error);
    }
  }

  // Método para sincronizar con el servidor
  async syncWithServer(book) {
    try {
      const response = await fetch('/api/books', {
        method: book.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) throw new Error('Error en la sincronización');

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export const bookStorage = new StorageService('library-db', 1);