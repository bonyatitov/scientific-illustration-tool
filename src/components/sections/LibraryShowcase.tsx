import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { CATEGORIES, shapesByCategory, type ShapeDef } from '@/lib/shape-library';
import type { CategoryId, SceneObject } from '@/lib/editor-types';

const preview = (def: ShapeDef): SceneObject => ({
  id: 'p',
  shapeId: def.id,
  label: def.label,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
  fill: def.defaultFill,
  stroke: def.defaultStroke,
  strokeWidth: 2,
  opacity: 1,
});

const LibraryShowcase = () => {
  const [active, setActive] = useState<CategoryId>('cells');
  const items = shapesByCategory(active);
  const meta = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="lib" className="border-t border-border bg-background px-6 py-20 md:px-12 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
        <div>
          <p className="rule-label">Раздел 02 — библиотека</p>
          <h2 className="mt-4 font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
            Пять полок,
            <br />
            ни одной лишней
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Мы не рисуем красивые стоковые картинки. Мы даём точные схематические примитивы,
            которые редактор понимает как объекты: их можно красить, крутить и складывать в слои.
          </p>

          <div className="mt-10 space-y-px border-y border-border">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors ${
                  active === c.id ? 'bg-primary text-primary-foreground' : 'hover:bg-card'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon name={c.icon} size={17} />
                  <span className="text-sm uppercase tracking-[0.1em]">{c.label}</span>
                </span>
                <span className={`text-xs tabular-nums ${active === c.id ? 'opacity-70' : 'text-muted-foreground'}`}>
                  {shapesByCategory(c.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-4">
            <p className="font-head text-xl font-light text-foreground">{meta.hint}</p>
            <p className="rule-label">{items.length} элементов</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 xl:grid-cols-4">
            {items.map((def, i) => (
              <div
                key={def.id}
                className="group flex animate-fade-in flex-col items-center justify-between gap-4 bg-background p-6 transition-colors hover:bg-card"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex h-24 w-full items-center justify-center">
                  {def.isText ? (
                    <span className="text-center text-sm" style={{ color: def.defaultFill }}>
                      {def.defaultText}
                    </span>
                  ) : (
                    <svg viewBox="-6 -6 112 112" className="h-24 w-24 transition-transform duration-300 group-hover:scale-110">
                      {def.render(preview(def))}
                    </svg>
                  )}
                </div>
                <span className="text-center text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {def.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibraryShowcase;
