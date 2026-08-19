import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { CATEGORIES, SHAPES } from '@/lib/shape-library';
import ShapePreview from './ShapePreview';
import type { CategoryId } from '@/lib/editor-types';

interface Props {
  onAdd: (shapeId: string) => void;
}

const LibraryPanel = ({ onAdd }: Props) => {
  const [active, setActive] = useState<CategoryId>('cells');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q)
      return SHAPES.filter(
        (s) => s.label.toLowerCase().includes(q) || (s.defaultText ?? '').toLowerCase().includes(q),
      );
    return SHAPES.filter((s) => s.category === active);
  }, [active, query]);

  const compact = !query && active === 'symbols';

  return (
    <aside className="flex h-full w-[268px] shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <p className="rule-label">Библиотека</p>
        <div className="relative mt-2">
          <Icon
            name="Search"
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск элемента"
            className="h-9 w-full border border-border bg-background pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-px border-b border-border bg-border">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => { setActive(c.id); setQuery(''); }}
            title={c.hint}
            className={`flex flex-1 basis-[33%] items-center justify-center gap-1.5 px-2 py-2.5 text-[10px] uppercase tracking-[0.1em] transition-colors ${
              active === c.id && !query
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Icon name={c.icon} size={13} />
            <span className="truncate">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className={`grid gap-2 ${compact ? 'grid-cols-4' : 'grid-cols-2'}`}>
          {list.map((def) => (
            <button
              key={def.id}
              type="button"
              onClick={() => onAdd(def.id)}
              title={def.label}
              className={`group flex flex-col items-center border border-border bg-background transition-all hover:border-primary hover:bg-secondary ${
                compact ? 'gap-0.5 p-1.5' : 'gap-2 p-2'
              }`}
            >
              <div className={`flex w-full items-center justify-center ${compact ? 'h-9' : 'h-16'}`}>
                {def.isText ? (
                  <span
                    className={`text-center leading-none text-foreground ${
                      def.category === 'symbols' ? 'text-[30px]' : 'text-xs leading-tight'
                    }`}
                    style={{ color: def.defaultFill, fontStyle: def.defaultItalic ? 'italic' : 'normal' }}
                  >
                    {def.defaultText}
                  </span>
                ) : (
                  <ShapePreview def={def} className="h-16 w-16" />
                )}
              </div>
              <span
                className={`w-full truncate text-center leading-tight text-muted-foreground transition-colors group-hover:text-foreground ${
                  compact ? 'text-[8px]' : 'text-[10px]'
                }`}
              >
                {def.label}
              </span>
            </button>
          ))}
        </div>
        {list.length === 0 && (
          <p className="px-1 py-6 text-center text-sm text-muted-foreground">Ничего не нашлось</p>
        )}
      </div>

      <div className="border-t border-border px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {SHAPES.length} элементов · клик добавляет в центр
      </div>
    </aside>
  );
};

export default LibraryPanel;