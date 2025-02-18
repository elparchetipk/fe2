// src/components/VirtualizedBookGrid.jsx
import React, { useCallback } from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useWindowSize } from '../hooks/useWindowSize';
import BookCard from './BookCard';

const VirtualizedBookGrid = ({ books }) => {
  const { width } = useWindowSize();

  // Calculamos el número de columnas basado en el ancho de la ventana
  const columnCount = React.useMemo(() => {
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  }, [width]);

  // Altura de cada fila
  const rowHeight = 400;

  // Calculamos el número de filas necesarias
  const rowCount = Math.ceil(books.length / columnCount);

  // Renderizamos cada celda de manera eficiente
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const bookIndex = rowIndex * columnCount + columnIndex;
    const book = books[bookIndex];

    if (!book) return null;

    return (
      <div style={style}>
        <BookCard
          book={book}
          className="m-2" // Agregamos margen para espaciado
        />
      </div>
    );
  }, [books, columnCount]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          className="scrollbar-thin scrollbar-thumb-gray-400"
          columnCount={columnCount}
          columnWidth={width / columnCount}
          height={height}
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={width}
        >
          {Cell}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
};

export default React.memo(VirtualizedBookGrid);