import React from 'react';

/**
 * @UI/Sparkline
 * SVG-кривая из массива чисел. Stroke — accent или brand.
 * Пустой ряд или все null — путь не рисуется.
 */

export type SparklineStroke = 'accent' | 'brand';

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  values?: Array<number | null | undefined>;
  stroke?: SparklineStroke;
}
