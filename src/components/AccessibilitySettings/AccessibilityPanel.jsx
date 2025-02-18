// src/components/AccessibilitySettings/AccessibilityPanel.jsx
import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityPanel = () => {
  const { preferences, updatePreference } = useAccessibility();

  return (
    <div
      role="dialog"
      aria-label="Configuración de accesibilidad"
      className="p-6 bg-white dark:bg-gray-800 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Configuración de Accesibilidad</h2>

      <div className="space-y-4">
        {/* Control de movimiento */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="reduce-motion"
            className="flex items-center space-x-2"
          >
            <span>Reducir movimiento</span>
            <span className="text-sm text-gray-500">
              (Desactiva animaciones)
            </span>
          </label>
          <input
            id="reduce-motion"
            type="checkbox"
            checked={preferences.reduceMotion}
            onChange={(e) => updatePreference('reduceMotion', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {/* Control de contraste */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="high-contrast"
            className="flex items-center space-x-2"
          >
            <span>Alto contraste</span>
            <span className="text-sm text-gray-500">
              (Mejora la legibilidad)
            </span>
          </label>
          <input
            id="high-contrast"
            type="checkbox"
            checked={preferences.highContrast}
            onChange={(e) => updatePreference('highContrast', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {/* Control de tamaño de texto */}
        <div className="space-y-2">
          <label
            htmlFor="font-size"
            className="block"
          >
            Tamaño del texto
          </label>
          <select
            id="font-size"
            value={preferences.fontSize}
            onChange={(e) => updatePreference('fontSize', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;