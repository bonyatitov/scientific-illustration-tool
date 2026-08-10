import { useState } from 'react';
import Icon from '@/components/ui/icon';

const FORMATS = [
  {
    id: 'png',
    label: 'PNG',
    caption: 'Растр 2×',
    lines: [
      'Двойное разрешение — не мылит в печати',
      'Прозрачный фон по галочке',
      'Готово для препринта и презентации',
    ],
  },
  {
    id: 'svg',
    label: 'SVG',
    caption: 'Чистый вектор',
    lines: [
      'Открывается в Illustrator и Inkscape',
      'Каждый объект остаётся отдельной группой',
      'Масштабируется без потерь для журнала',
    ],
  },
] as const;

const ExportSection = () => {
  const [active, setActive] = useState<'png' | 'svg'>('svg');
  const fmt = FORMATS.find((f) => f.id === active)!;

  return (
    <section id="export" className="border-t border-border bg-card px-6 py-20 md:px-12 md:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="rule-label">Раздел 04 — экспорт</p>
          <h2 className="mt-4 font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
            Файл, который
            <br />
            примет <em className="not-italic text-primary">редакция</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Схема обрезается по содержимому с полем в 48 px — без белых километров по краям.
            Выгрузка идёт прямо в браузере, файл сразу падает в загрузки.
          </p>

          <div className="mt-10 flex gap-px bg-border">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`flex-1 px-6 py-4 text-left transition-colors ${
                  active === f.id ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="block font-head text-lg font-light">{f.label}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] opacity-80">{f.caption}</span>
              </button>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {fmt.lines.map((l) => (
              <li key={l} className="flex animate-fade-in items-start gap-3 text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative border border-border bg-background p-8">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--hero-x-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-x-grid) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="rule-label">membrana-схема.{active}</span>
              <Icon name={active === 'png' ? 'Image' : 'FileCode2'} size={16} className="text-primary" />
            </div>
            <svg viewBox="0 0 320 200" className="mt-6 w-full">
              <circle cx="70" cy="100" r="46" fill="var(--hero-x-cyto)" stroke="var(--hero-x-membrane)" strokeWidth="2" />
              <circle cx="58" cy="88" r="16" fill="var(--hero-x-nucleus)" stroke="var(--hero-x-organelle)" strokeWidth="1.5" />
              <path d="M126 100 H210" stroke="var(--hero-accent)" strokeWidth="3" strokeLinecap="round" />
              <path d="M222 100 L204 90 L204 110 Z" fill="var(--hero-accent)" />
              <rect x="238" y="66" width="68" height="68" rx="6" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="2" />
              <path d="M252 100 q10-12 18 0 t18 0" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="2" />
              <text x="46" y="170" fill="var(--hero-muted)" fontFamily="Inter, sans-serif" fontSize="12">
                клетка
              </text>
              <text x="248" y="170" fill="var(--hero-muted)" fontFamily="Inter, sans-serif" fontSize="12">
                мембрана
              </text>
            </svg>
            <div className="mt-6 grid grid-cols-3 gap-px border-t border-border bg-border pt-px">
              {[
                ['Размер', active === 'png' ? '2× 1420 px' : 'вектор'],
                ['Фон', 'опционально'],
                ['Объектов', '7'],
              ].map(([k, v]) => (
                <div key={k} className="bg-background px-3 py-3">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{k}</p>
                  <p className="mt-1 text-xs text-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
