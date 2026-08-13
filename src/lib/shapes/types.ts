import type { ReactNode } from 'react';
import type { CategoryId, SceneObject } from '../editor-types';

export interface ShapeDef {
  id: string;
  label: string;
  category: CategoryId;
  defaultWidth: number;
  defaultHeight: number;
  defaultFill: string;
  defaultStroke: string;
  isText?: boolean;
  /** объект отрисовывается из импортированной SVG-разметки */
  isImported?: boolean;
  defaultText?: string;
  defaultFontSize?: number;
  /** отрисовка в системе координат 0..100 × 0..100 */
  render: (o: SceneObject) => ReactNode;
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  icon: string;
  hint: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'cells', label: 'Клетки', icon: 'CircleDot', hint: 'Клетки и органеллы' },
  { id: 'molecules', label: 'Молекулы', icon: 'Atom', hint: 'ДНК, белки, липиды' },
  { id: 'lab', label: 'Лаборатория', icon: 'FlaskConical', hint: 'Посуда и приборы' },
  { id: 'arrows', label: 'Стрелки / Связи', icon: 'MoveRight', hint: 'Потоки и ингибирование' },
  { id: 'text', label: 'Текст', icon: 'Type', hint: 'Подписи и заголовки' },
  { id: 'shapes', label: 'Фигуры', icon: 'Shapes', hint: 'Базовая геометрия' },
];

export const S = (o: SceneObject) => ({
  fill: o.fill,
  stroke: o.stroke,
  strokeWidth: o.strokeWidth,
});

export const line = (o: SceneObject) => ({
  fill: 'none',
  stroke: o.stroke,
  strokeWidth: o.strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});