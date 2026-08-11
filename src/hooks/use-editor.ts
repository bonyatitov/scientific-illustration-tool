import { useCallback, useEffect, useRef, useState } from 'react';
import { SHAPE_MAP, IMPORTED_SHAPE } from '@/lib/shape-library';
import { parseSvgFile } from '@/lib/import-svg';
import { STORAGE_KEY, sanitizeProject, type SavedProject, type SceneObject } from '@/lib/editor-types';

export const CANVAS_SIZE = 4000;
export const GRID_STEP = 34;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;

let counter = 0;
const uid = () => `o${Date.now().toString(36)}${(counter++).toString(36)}`;

export interface Viewport {
  zoom: number;
  panX: number;
  panY: number;
}

export function useEditor() {
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<Viewport>({ zoom: 0.7, panX: 0, panY: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [lightPaper, setLightPaper] = useState(false);
  const [snap, setSnap] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  /* центрируем холст при первом рендере */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setView((v) => ({
      ...v,
      panX: width / 2 - (CANVAS_SIZE / 2) * v.zoom,
      panY: height / 2 - (CANVAS_SIZE / 2) * v.zoom,
    }));
  }, []);

  useEffect(() => {
    try {
      setHasSaved(!!localStorage.getItem(STORAGE_KEY));
    } catch {
      setHasSaved(false);
    }
  }, []);

  const selected = objects.find((o) => o.id === selectedId) ?? null;

  const viewportCenter = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };
    const { width, height } = el.getBoundingClientRect();
    return {
      x: (width / 2 - view.panX) / view.zoom,
      y: (height / 2 - view.panY) / view.zoom,
    };
  }, [view]);

  const addShape = useCallback(
    (shapeId: string) => {
      const def = SHAPE_MAP[shapeId];
      if (!def) return;
      const c = viewportCenter();
      const obj: SceneObject = {
        id: uid(),
        shapeId: def.id,
        label: def.label,
        x: Math.round(c.x - def.defaultWidth / 2),
        y: Math.round(c.y - def.defaultHeight / 2),
        width: def.defaultWidth,
        height: def.defaultHeight,
        rotation: 0,
        fill: def.defaultFill,
        stroke: def.defaultStroke,
        strokeWidth: 2,
        opacity: 1,
        text: def.defaultText,
        fontSize: def.defaultFontSize,
      };
      setObjects((prev) => [...prev, obj]);
      setSelectedId(obj.id);
    },
    [viewportCenter],
  );

  const importSvg = useCallback(
    (text: string, name?: string) => {
      const parsed = parseSvgFile(text);
      if (!parsed) return null;
      const c = viewportCenter();
      const maxSide = 420;
      const k = Math.min(1, maxSide / Math.max(parsed.width, parsed.height));
      const w = Math.max(24, Math.round(parsed.width * k));
      const h = Math.max(24, Math.round(parsed.height * k));
      const obj: SceneObject = {
        id: uid(),
        shapeId: IMPORTED_SHAPE.id,
        label: name ? name.replace(/\.[^.]+$/, '').slice(0, 40) : IMPORTED_SHAPE.label,
        x: Math.round(c.x - w / 2),
        y: Math.round(c.y - h / 2),
        width: w,
        height: h,
        rotation: 0,
        fill: 'none',
        stroke: 'none',
        strokeWidth: 0,
        opacity: 1,
        svg: parsed.inner,
      };
      setObjects((prev) => [...prev, obj]);
      setSelectedId(obj.id);
      return obj;
    },
    [viewportCenter],
  );

  const updateObject = useCallback((id: string, patch: Partial<SceneObject>) => {
    setObjects((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }, []);

  const removeObject = useCallback((id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const duplicateObject = useCallback((id: string) => {
    setObjects((prev) => {
      const src = prev.find((o) => o.id === id);
      if (!src) return prev;
      const copy = { ...src, id: uid(), x: src.x + 28, y: src.y + 28 };
      return [...prev, copy];
    });
  }, []);

  const moveLayer = useCallback((id: string, dir: 'up' | 'down' | 'top' | 'bottom') => {
    setObjects((prev) => {
      const i = prev.findIndex((o) => o.id === id);
      if (i < 0) return prev;
      const next = [...prev];
      const [item] = next.splice(i, 1);
      if (dir === 'up') next.splice(Math.min(i + 1, next.length), 0, item);
      else if (dir === 'down') next.splice(Math.max(i - 1, 0), 0, item);
      else if (dir === 'top') next.push(item);
      else next.unshift(item);
      return next;
    });
  }, []);

  const clearCanvas = useCallback(() => {
    setObjects([]);
    setSelectedId(null);
  }, []);

  /* ── зум ── */
  const zoomBy = useCallback((factor: number, anchor?: { x: number; y: number }) => {
    setView((v) => {
      const el = viewportRef.current;
      const rect = el?.getBoundingClientRect();
      const ax = anchor?.x ?? (rect ? rect.width / 2 : 0);
      const ay = anchor?.y ?? (rect ? rect.height / 2 : 0);
      const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * factor));
      const k = zoom / v.zoom;
      return {
        zoom,
        panX: ax - (ax - v.panX) * k,
        panY: ay - (ay - v.panY) * k,
      };
    });
  }, []);

  const resetView = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const zoom = 0.7;
    setView({
      zoom,
      panX: width / 2 - (CANVAS_SIZE / 2) * zoom,
      panY: height / 2 - (CANVAS_SIZE / 2) * zoom,
    });
  }, []);

  const panBy = useCallback((dx: number, dy: number) => {
    setView((v) => ({ ...v, panX: v.panX + dx, panY: v.panY + dy }));
  }, []);

  /* ── localStorage ── */
  const saveProject = useCallback(() => {
    const payload: SavedProject = {
      name: 'Нуклеотоша — проект',
      savedAt: new Date().toISOString(),
      objects,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      return null;
    }
    setSavedAt(payload.savedAt);
    setHasSaved(true);
    return payload;
  }, [objects]);

  const loadProject = useCallback(() => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
    if (!raw) return null;
    try {
      const parsed = sanitizeProject(JSON.parse(raw));
      if (!parsed) return null;
      setObjects(parsed.objects);
      setSelectedId(null);
      setSavedAt(parsed.savedAt);
      return parsed;
    } catch {
      return null;
    }
  }, []);

  return {
    objects,
    setObjects,
    selected,
    selectedId,
    setSelectedId,
    view,
    setView,
    showGrid,
    setShowGrid,
    lightPaper,
    setLightPaper,
    snap,
    setSnap,
    savedAt,
    hasSaved,
    viewportRef,
    svgRef,
    addShape,
    importSvg,
    updateObject,
    removeObject,
    duplicateObject,
    moveLayer,
    clearCanvas,
    zoomBy,
    resetView,
    panBy,
    saveProject,
    loadProject,
  };
}

export type EditorApi = ReturnType<typeof useEditor>;
export const snapValue = (v: number, on: boolean) => (on ? Math.round(v / GRID_STEP) * GRID_STEP : Math.round(v));