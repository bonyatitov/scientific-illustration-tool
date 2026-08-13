import Icon from '@/components/ui/icon';

const LINKS = [
  { href: '#canvas', label: 'Холст' },
  { href: '#lib', label: 'Библиотека' },
  { href: '#export', label: 'Экспорт' },
  { href: '#artist', label: 'Художнику' },
  { href: '#faq', label: 'Вопросы' },
];

const Footer = () => (
  <footer className="border-t border-border bg-background px-6 py-10 md:px-12">
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-baseline gap-3">
          <b className="font-head text-base font-normal tracking-[-0.03em] text-foreground">Нуклеотоша</b>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">редактор схем</span>
        </div>
        <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
          Векторный редактор научных иллюстраций. Работает в браузере, данные остаются у вас.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>Разработчик: Титов Богдан</span>
          <span className="text-[var(--hero-x-membrane)]">·</span>
          <a
            href="https://vk.com/bonyatitov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            <Icon name="MessageCircle" size={13} />
            @bonyatitov
          </a>
        </p>
      </div>

      <nav className="flex flex-wrap gap-6">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>

    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-6 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      <span>Холст 4000×4000</span>
      <span className="text-[var(--hero-x-membrane)]">/</span>
      <span>Сетка 34 px</span>
      <span className="text-[var(--hero-x-membrane)]">/</span>
      <span>Экспорт PNG · SVG</span>
      <span className="text-[var(--hero-x-membrane)]">/</span>
      <span>Версия 0.1 · {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;