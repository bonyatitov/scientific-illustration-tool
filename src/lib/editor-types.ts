export type CategoryId = 'cells' | 'molecules' | 'arrows' | 'text' | 'shapes';

export interface SceneObject {
  id: string;
  shapeId: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  /** только для текстовых объектов */
  text?: string;
  fontSize?: number;
}

export interface SavedProject {
  name: string;
  savedAt: string;
  objects: SceneObject[];
}

export const STORAGE_KEY = 'membrana:project:v1';
