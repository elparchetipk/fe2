// src/hooks/usePerformanceMonitor.js
import { useEffect, useRef } from 'react';

const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    // Medimos el tiempo transcurrido desde el último render
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTime.current;

    renderCount.current += 1;

    // Registramos métricas en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render #${renderCount.current}`);
      console.log(`Tiempo de render: ${renderTime.toFixed(2)}ms`);
    }

    lastRenderTime.current = currentTime;

    // Reportamos a nuestro sistema de análisis si el render es lento
    if (renderTime > 16.67) { // Más de 60fps
      // Aquí podríamos enviar la métrica a un sistema de monitoreo
      console.warn(`Render lento en ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  });
};

export default usePerformanceMonitor;