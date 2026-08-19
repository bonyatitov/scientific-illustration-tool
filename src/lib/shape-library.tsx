import type { CategoryId } from './editor-types';
import { CELL_SHAPES } from './shapes/cells';
import { MOLECULE_SHAPES } from './shapes/molecules';
import { LAB_SHAPES } from './shapes/lab';
import { ARROW_SHAPES, EXTRA_ARROW_SHAPES, TEXT_SHAPES } from './shapes/arrows-text';
import { SYMBOL_SHAPES } from './shapes/symbols';
import { GEOMETRY_SHAPES, IMPORTED_SHAPE } from './shapes/geometry';
import type { ShapeDef } from './shapes/types';

export { CATEGORIES } from './shapes/types';
export type { ShapeDef, CategoryDef } from './shapes/types';

export const SHAPES: ShapeDef[] = [
  ...CELL_SHAPES,
  ...MOLECULE_SHAPES,
  ...LAB_SHAPES,
  ...ARROW_SHAPES,
  ...EXTRA_ARROW_SHAPES,
  ...TEXT_SHAPES,
  ...SYMBOL_SHAPES,
  ...GEOMETRY_SHAPES,
];

export { IMPORTED_SHAPE };

export const SHAPE_MAP: Record<string, ShapeDef> = Object.fromEntries(
  [...SHAPES, IMPORTED_SHAPE].map((s) => [s.id, s]),
);

export const shapesByCategory = (id: CategoryId) => SHAPES.filter((s) => s.category === id);