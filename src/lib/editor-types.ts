import { sanitizeSvgMarkup } from './import-svg';

export type CategoryId = 'cells' | 'molecules' | 'arrows' | 'text' | 'shapes' | 'imported';

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
  /** только для импортированных SVG (ChemDraw и т.п.) — очищенная разметка */
  svg?: string;
}

export interface SavedProject {
  name: string;
  savedAt: string;
  objects: SceneObject[];
}

export const STORAGE_KEY = 'membrana:project:v1';

const COLOR_RE = /^(#[0-9a-f]{3,8}|none|transparent|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\))$/i;
const ID_RE = /^[a-z0-9_-]{1,64}$/i;

const num = (v: unknown, fallback: number, min: number, max: number) => {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
};

const color = (v: unknown, fallback: string) =>
  typeof v === 'string' && COLOR_RE.test(v.trim()) ? v.trim() : fallback;

const str = (v: unknown, fallback: string, max: number) =>
  typeof v === 'string' ? v.slice(0, max) : fallback;

/** Приводит объект из localStorage к безопасному виду. */
export function sanitizeObject(raw: unknown, index: number): SceneObject | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const shapeId = typeof o.shapeId === 'string' && ID_RE.test(o.shapeId) ? o.shapeId : null;
  if (!shapeId) return null;

  const id = typeof o.id === 'string' && ID_RE.test(o.id) ? o.id : `r${index}${Date.now().toString(36)}`;

  return {
    id,
    shapeId,
    label: str(o.label, shapeId, 80),
    x: num(o.x, 0, -100000, 100000),
    y: num(o.y, 0, -100000, 100000),
    width: num(o.width, 100, 1, 20000),
    height: num(o.height, 100, 1, 20000),
    rotation: num(o.rotation, 0, -360, 360),
    fill: color(o.fill, '#7c8aa0'),
    stroke: color(o.stroke, '#0d1117'),
    strokeWidth: num(o.strokeWidth, 2, 0, 100),
    opacity: num(o.opacity, 1, 0, 1),
    text: o.text === undefined ? undefined : str(o.text, '', 500),
    fontSize: o.fontSize === undefined ? undefined : num(o.fontSize, 20, 4, 400),
    svg:
      typeof o.svg === 'string' && o.svg.length <= 400000
        ? sanitizeSvgMarkup(o.svg)
        : undefined,
  };
}

export function sanitizeProject(raw: unknown): SavedProject | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Record<string, unknown>;
  if (!Array.isArray(p.objects)) return null;
  const objects = p.objects
    .slice(0, 2000)
    .map((o, i) => sanitizeObject(o, i))
    .filter((o): o is SceneObject => o !== null);
  return {
    name: str(p.name, 'Проект', 120),
    savedAt: str(p.savedAt, new Date().toISOString(), 40),
    objects,
  };
}