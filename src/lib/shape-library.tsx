import type { CategoryId } from './editor-types';
import { CELL_SHAPES } from './shapes/cells';
import { MOLECULE_SHAPES } from './shapes/molecules';
import { ARROW_SHAPES, TEXT_SHAPES } from './shapes/arrows-text';
import { GEOMETRY_SHAPES } from './shapes/geometry';
import type { ShapeDef } from './shapes/types';

export { CATEGORIES } from './shapes/types';
export type { ShapeDef, CategoryDef } from './shapes/types';

export const SHAPES: ShapeDef[] = [
  ...CELL_SHAPES,
  ...MOLECULE_SHAPES,
  ...ARROW_SHAPES,
  ...TEXT_SHAPES,
  ...GEOMETRY_SHAPES,
];

export const SHAPE_MAP: Record<string, ShapeDef> = Object.fromEntries(
  SHAPES.map((s) => [s.id, s]),
);

export const shapesByCategory = (id: CategoryId) => SHAPES.filter((s) => s.category === id);
