import { useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV = [
  { href: '#canvas', label: 'Холст' },
  { href: '#lib', label: 'Библиотека' },
  { href: '#export', label: 'Экспорт' },
  { href: '#faq', label: 'Вопросы' },
];

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="top" className="hero-scene font-body">
      <div className="hero-grid" />

      {/* ── шапка ── */}
      <header className="absolute inset-x-0 top-0 z-[5] flex items-center justify-between border-b border-[var(--hero-x-rule)] px-6 py-5 md:px-12 md:py-[30px]">
        <div className="flex items-baseline gap-3">
          <b className="font-head text-[1.05em] font-normal tracking-[-0.03em]">Мембрана</b>
          <span className="text-[0.68em] uppercase tracking-[0.2em] text-[var(--hero-muted)]">
            редактор схем
          </span>
        </div>

        <nav className="hidden items-center gap-[30px] md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => scrollTo(e, n.href)}
              className="text-[0.8em] uppercase tracking-[0.08em] text-[var(--hero-muted)] transition-colors hover:text-[var(--hero-text)]"
            >
              {n.label}
            </a>
          ))}
          <a href="#canvas" onClick={(e) => scrollTo(e, '#canvas')} className="hero-btn">
            Открыть холст
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[var(--hero-text)] md:hidden"
          aria-label="Меню"
        >
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </header>

      {open && (
        <div className="absolute inset-x-0 top-[65px] z-[6] animate-fade-in border-b border-[var(--hero-x-rule)] bg-[var(--hero-surface)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  scrollTo(e, n.href);
                  setOpen(false);
                }}
                className="text-[0.85em] uppercase tracking-[0.08em] text-[var(--hero-muted)]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#canvas"
              onClick={(e) => {
                scrollTo(e, '#canvas');
                setOpen(false);
              }}
              className="hero-btn text-center"
            >
              Открыть холст
            </a>
          </div>
        </div>
      )}

      {/* ── signature: объект на холсте ── */}
      <div className="hero-stage">
        <div className="hero-obj">
          <svg viewBox="0 0 600 600" aria-hidden="true">
            <circle cx="300" cy="300" r="238" fill="var(--hero-x-cyto)" stroke="var(--hero-x-membrane)" strokeWidth="2" />
            <circle cx="300" cy="300" r="222" fill="none" stroke="var(--hero-x-membrane)" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="266" cy="258" r="84" fill="var(--hero-x-nucleus)" />
            <circle cx="266" cy="258" r="84" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="1.5" />
            <circle cx="248" cy="240" r="22" fill="var(--hero-x-organelle)" />
            <ellipse cx="404" cy="356" rx="60" ry="27" transform="rotate(-24 404 356)" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="2" />
            <path d="M356 350 q14-14 26 0 t26 0 t26 0" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="2" transform="rotate(-24 404 356)" />
            <ellipse cx="214" cy="410" rx="44" ry="20" transform="rotate(18 214 410)" fill="none" stroke="var(--hero-x-membrane)" strokeWidth="2" />
            <path d="M150 320 q40-26 82-6" fill="none" stroke="var(--hero-x-membrane)" strokeWidth="2" />
            <path d="M144 348 q46-28 92-4" fill="none" stroke="var(--hero-x-membrane)" strokeWidth="2" />
            <circle cx="374" cy="204" r="9" fill="var(--hero-x-organelle)" />
            <circle cx="404" cy="238" r="6" fill="var(--hero-x-organelle)" />
            <circle cx="344" cy="440" r="7" fill="var(--hero-x-membrane)" />
            <circle cx="300" cy="300" r="238" fill="none" stroke="var(--hero-x-organelle)" strokeWidth="1" opacity=".5" />
          </svg>
        </div>
        <div className="hero-sel">
          <span className="hero-tag">Клетка животная · слой 3</span>
          <i className="hero-h tl" />
          <i className="hero-h tc" />
          <i className="hero-h tr" />
          <i className="hero-h lc" />
          <i className="hero-h rc" />
          <i className="hero-h bl" />
          <i className="hero-h bc" />
          <i className="hero-h br" />
          <dl className="hero-props">
            <dt>Свойства</dt>
            <div className="row">
              <s>Ш × В</s>
              <span>496 × 496</span>
            </div>
            <div className="row">
              <s>Поворот</s>
              <span>0°</span>
            </div>
            <div className="row">
              <s>Заливка</s>
              <span>
                <i className="sw" />
              </span>
            </div>
            <div className="row">
              <s>Слой</s>
              <span>3 / 7</span>
            </div>
          </dl>
        </div>
        <svg className="hero-cursor" width="22" height="26" viewBox="0 0 22 26" aria-hidden="true">
          <path
            d="M2 1 L2 21 L7.5 16.4 L11 24.6 L14.6 23 L11.2 15 L18.6 14.6 Z"
            fill="var(--hero-accent)"
            stroke="var(--hero-accent-contrast)"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* ── текстовый блок ── */}
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <i />
          Векторный редактор для биологов
        </p>
        <h1 className="hero-h1">
          Схема клетки
          <br />
          за десять минут,
          <br />
          <em>а не за вечер</em>
        </h1>
        <p className="hero-lead">
          240&nbsp;элементов: клетки, молекулы, стрелки. Тянете мышью, меняете заливку, выгружаете PNG или&nbsp;SVG для статьи.
        </p>
        <div className="hero-act">
          <a href="#canvas" onClick={(e) => scrollTo(e, '#canvas')} className="hero-btn">
            Собрать первую схему
          </a>
          <small>
            Без регистрации.
            <br />
            Проект живёт в браузере.
          </small>
        </div>
      </div>

      <div className="hero-meta">
        <span>Холст 4000×4000</span>
        <u>/</u>
        <span>Сетка 34 px</span>
        <u>/</u>
        <span>Экспорт PNG · SVG</span>
        <u>/</u>
        <span>Версия 0.1</span>
      </div>
    </section>
  );
};

export default Hero;