// src/hooks/useWindowSize.js
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  // Inicializamos con valores por defecto para evitar errores en SSR
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Función para actualizar el estado con las dimensiones actuales
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Agregamos el listener y ejecutamos la función inicial
    window.addEventListener('resize', handleResize);
    handleResize();

    // Limpieza del efecto
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export { useWindowSize };

// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Intentamos obtener el valor del localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Efecto para sincronizar con localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;