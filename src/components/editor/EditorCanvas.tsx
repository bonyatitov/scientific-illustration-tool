import { useCallback, useEffect, useRef, useState } from 'react';
import { CANVAS_SIZE, GRID_STEP, snapValue, type EditorApi } from '@/hooks/use-editor';
import ObjectView from './ObjectView';
import Icon from '@/components/ui/icon';
import type { SceneObject } from '@/lib/editor-types';

type Handle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

const HANDLES: { id: Handle; cursor: string }[] = [
  { id: 'nw', cursor: 'nwse-resize' },
  { id: 'n', cursor: 'ns-resize' },
  { id: 'ne', cursor: 'nesw-resize' },
  { id: 'e', cursor: 'ew-resize' },
  { id: 'se', cursor: 'nwse-resize' },
  { id: 's', cursor: 'ns-resize' },
  { id: 'sw', cursor: 'nesw-resize' },
  { id: 'w', cursor: 'ew-resize' },
];

interface Props {
  editor: EditorApi;
}

interface DragState {
  mode: 'move' | 'resize' | 'rotate' | 'pan';
  handle?: Handle;
  startX: number;
  startY: number;
  origin: SceneObject | null;
  panStart: { x: number; y: number };
}

const EditorCanvas = ({ editor }: Props) => {
  const {
    objects, selected, selectedId, setSelectedId, view, showGrid, snap, lightPaper,
    viewportRef, svgRef, updateObject, removeObject, duplicateObject, zoomBy, panBy,
  } = editor;

  const drag = useRef<DragState | null>(null);
  const [spaceDown, setSpaceDown] = useState(false);
  const [dropping, setDropping] = useState(false);

  /* колесо мыши — зум */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey || !e.shiftKey) {
        zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1, { x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else {
        panBy(-e.deltaX, -e.deltaY);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [viewportRef, zoomBy, panBy]);

  /* клавиатура */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.code === 'Space') { setSpaceDown(true); e.preventDefault(); }
      if (!selectedId) return;
      if (e.key === 'Delete' || e.key === 'Backspace') { removeObject(selectedId); e.preventDefault(); }
      if ((e.key === 'd' || e.key === 'в') && (e.ctrlKey || e.metaKey)) { duplicateObject(selectedId); e.preventDefault(); }
      if (e.key === 'Escape') setSelectedId(null);
      const step = e.shiftKey ? GRID_STEP : 2;
      const obj = objects.find((o) => o.id === selectedId);
      if (!obj) return;
      if (e.key === 'ArrowLeft') { updateObject(obj.id, { x: obj.x - step }); e.preventDefault(); }
      if (e.key === 'ArrowRight') { updateObject(obj.id, { x: obj.x + step }); e.preventDefault(); }
      if (e.key === 'ArrowUp') { updateObject(obj.id, { y: obj.y - step }); e.preventDefault(); }
      if (e.key === 'ArrowDown') { updateObject(obj.id, { y: obj.y + step }); e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => { if (e.code === 'Space') setSpaceDown(false); };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [selectedId, objects, removeObject, duplicateObject, setSelectedId, updateObject]);

  const toCanvas = useCallback(
    (clientX: number, clientY: number) => {
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (clientX - rect.left - view.panX) / view.zoom,
        y: (clientY - rect.top - view.panY) / view.zoom,
      };
    },
    [view, viewportRef],
  );

  const startDrag = (e: React.PointerEvent, mode: DragState['mode'], handle?: Handle) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const p = toCanvas(e.clientX, e.clientY);
    drag.current = {
      mode,
      handle,
      startX: p.x,
      startY: p.y,
      origin: selected ? { ...selected } : null,
      panStart: { x: e.clientX, y: e.clientY },
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;

    if (d.mode === 'pan') {
      panBy(e.clientX - d.panStart.x, e.clientY - d.panStart.y);
      d.panStart = { x: e.clientX, y: e.clientY };
      return;
    }

    const o = d.origin;
    if (!o) return;
    const p = toCanvas(e.clientX, e.clientY);
    const dx = p.x - d.startX;
    const dy = p.y - d.startY;

    if (d.mode === 'move') {
      updateObject(o.id, { x: snapValue(o.x + dx, snap), y: snapValue(o.y + dy, snap) });
      return;
    }

    if (d.mode === 'rotate') {
      const cx = o.x + o.width / 2;
      const cy = o.y + o.height / 2;
      let deg = (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI + 90;
      deg = Math.round(((deg % 360) + 360) % 360);
      if (e.shiftKey) deg = Math.round(deg / 15) * 15;
      updateObject(o.id, { rotation: deg });
      return;
    }

    /* resize */
    let { x, y, width, height } = o;
    const h = d.handle!;
    if (h.includes('e')) width = o.width + dx;
    if (h.includes('s')) height = o.height + dy;
    if (h.includes('w')) { width = o.width - dx; x = o.x + dx; }
    if (h.includes('n')) { height = o.height - dy; y = o.y + dy; }
    width = Math.max(16, Math.round(width));
    height = Math.max(16, Math.round(height));
    updateObject(o.id, { x: Math.round(x), y: Math.round(y), width, height });
  };

  const endDrag = () => { drag.current = null; };

  const onBackgroundDown = (e: React.PointerEvent) => {
    if (e.button === 1 || spaceDown || e.button === 2) {
      startDrag(e, 'pan');
      return;
    }
    setSelectedId(null);
    startDrag(e, 'pan');
  };

  const zoomPct = Math.round(view.zoom * 100);
  const accent = lightPaper ? '#1a7f5a' : 'var(--hero-accent)';

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full overflow-hidden transition-colors"
      style={{
        cursor: spaceDown ? 'grab' : 'default',
        touchAction: 'none',
        background: lightPaper ? '#ffffff' : 'hsl(var(--background))',
      }}
      onPointerDown={onBackgroundDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onContextMenu={(e) => e.preventDefault()}
      onDragOver={(e) => {
        e.preventDefault();
        setDropping(true);
      }}
      onDragLeave={() => setDropping(false)}
      onDrop={async (e) => {
        e.preventDefault();
        setDropping(false);
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        if (!/\.svg$/i.test(file.name) && file.type !== 'image/svg+xml') return;
        if (file.size > 4 * 1024 * 1024) return;
        editor.importSvg(await file.text(), file.name);
      }}
    >
      {/* сетка вьюпорта */}
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: lightPaper
              ? 'linear-gradient(to right, #dfe4ea 1px, transparent 1px), linear-gradient(to bottom, #dfe4ea 1px, transparent 1px)'
              : 'linear-gradient(to right, var(--hero-x-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-x-grid) 1px, transparent 1px)',
            backgroundSize: `${GRID_STEP * view.zoom}px ${GRID_STEP * view.zoom}px`,
            backgroundPosition: `${view.panX}px ${view.panY}px`,
          }}
        />
      )}

      <svg
        ref={svgRef}
        className="absolute left-0 top-0 h-full w-full"
        style={{ overflow: 'visible' }}
      >
        <g transform={`translate(${view.panX} ${view.panY}) scale(${view.zoom})`}>
          {/* граница листа */}
          <rect
            x={0}
            y={0}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            fill="none"
            stroke={lightPaper ? '#c9d1da' : 'var(--hero-x-rule)'}
            strokeWidth={1 / view.zoom}
          />
          {objects.map((o) => (
            <g
              key={o.id}
              data-obj={o.id}
              style={{ cursor: spaceDown ? 'grab' : 'move' }}
              onPointerDown={(e) => {
                if (spaceDown) return;
                setSelectedId(o.id);
                const fresh = { ...o };
                const p = toCanvas(e.clientX, e.clientY);
                (e.target as Element).setPointerCapture?.(e.pointerId);
                e.stopPropagation();
                drag.current = {
                  mode: 'move',
                  startX: p.x,
                  startY: p.y,
                  origin: fresh,
                  panStart: { x: e.clientX, y: e.clientY },
                };
              }}
            >
              <ObjectView object={o} />
              {/* прозрачная зона захвата */}
              <rect
                data-hit=""
                x={o.x}
                y={o.y}
                width={o.width}
                height={o.height}
                transform={`rotate(${o.rotation} ${o.x + o.width / 2} ${o.y + o.height / 2})`}
                fill="transparent"
              />
            </g>
          ))}

          {/* рамка выделения */}
          {selected && (
            <g
              transform={`rotate(${selected.rotation} ${selected.x + selected.width / 2} ${selected.y + selected.height / 2})`}
              className="animate-scale-in"
            >
              <rect
                x={selected.x}
                y={selected.y}
                width={selected.width}
                height={selected.height}
                fill="none"
                stroke={accent}
                strokeWidth={1 / view.zoom}
              />
              <line
                x1={selected.x + selected.width / 2}
                y1={selected.y}
                x2={selected.x + selected.width / 2}
                y2={selected.y - 26 / view.zoom}
                stroke={accent}
                strokeWidth={1 / view.zoom}
              />
              <circle
                cx={selected.x + selected.width / 2}
                cy={selected.y - 26 / view.zoom}
                r={5 / view.zoom}
                fill={accent}
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => startDrag(e, 'rotate')}
              />
              {HANDLES.map(({ id, cursor }) => {
                const hx =
                  id.includes('w') ? selected.x : id.includes('e') ? selected.x + selected.width : selected.x + selected.width / 2;
                const hy =
                  id.includes('n') ? selected.y : id.includes('s') ? selected.y + selected.height : selected.y + selected.height / 2;
                const s = 9 / view.zoom;
                return (
                  <rect
                    key={id}
                    x={hx - s / 2}
                    y={hy - s / 2}
                    width={s}
                    height={s}
                    fill={accent}
                    style={{ cursor }}
                    onPointerDown={(e) => startDrag(e, 'resize', id)}
                  />
                );
              })}
            </g>
          )}
        </g>
      </svg>

      {/* метка выделенного объекта */}
      {selected && (
        <div
          className="pointer-events-none absolute bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
          style={{
            left: view.panX + selected.x * view.zoom,
            top: view.panY + selected.y * view.zoom - 26,
          }}
        >
          {selected.label} · слой {objects.findIndex((o) => o.id === selected.id) + 1}
        </div>
      )}

      {/* нижняя панель зума */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 border border-border bg-card/95 px-1.5 py-1.5 backdrop-blur">
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.2)}
          className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Уменьшить"
        >
          <Icon name="Minus" size={15} />
        </button>
        <span className="w-14 text-center text-xs tabular-nums text-foreground">{zoomPct}%</span>
        <button
          type="button"
          onClick={() => zoomBy(1.2)}
          className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Увеличить"
        >
          <Icon name="Plus" size={15} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button
          type="button"
          onClick={editor.resetView}
          className="flex h-7 items-center gap-1.5 px-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Icon name="Crosshair" size={13} /> Центр
        </button>
        <button
          type="button"
          onClick={() => editor.setShowGrid(!showGrid)}
          className={`flex h-7 items-center gap-1.5 px-2 text-[11px] uppercase tracking-[0.1em] transition-colors hover:bg-secondary ${showGrid ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name="Grid3x3" size={13} /> Сетка
        </button>
        <button
          type="button"
          onClick={() => editor.setLightPaper(!lightPaper)}
          title="Белый холст — как в статье или презентации"
          className={`flex h-7 items-center gap-1.5 px-2 text-[11px] uppercase tracking-[0.1em] transition-colors hover:bg-secondary ${lightPaper ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name={lightPaper ? 'Sun' : 'Moon'} size={13} /> {lightPaper ? 'Бумага' : 'Тёмный'}
        </button>
        <button
          type="button"
          onClick={() => editor.setSnap(!snap)}
          className={`flex h-7 items-center gap-1.5 px-2 text-[11px] uppercase tracking-[0.1em] transition-colors hover:bg-secondary ${snap ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name="Magnet" size={13} /> Привязка
        </button>
      </div>

      {dropping && (
        <div className="pointer-events-none absolute inset-3 z-20 flex items-center justify-center border-2 border-dashed border-primary bg-primary/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Отпустите — вставим SVG на холст
          </p>
        </div>
      )}

      {objects.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="max-w-xs text-center">
            <p className={`font-head text-lg font-light ${lightPaper ? 'text-[#1f2937]' : 'text-foreground'}`}>Холст пуст</p>
            <p className={`mt-2 text-sm leading-relaxed ${lightPaper ? 'text-[#5b6672]' : 'text-muted-foreground'}`}>
              Выберите элемент в библиотеке слева — он появится в центре холста.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;