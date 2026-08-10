import Icon from '@/components/ui/icon';

const PLANS = [
  {
    id: 'free',
    name: 'Черновик',
    price: '0 ₽',
    note: 'навсегда',
    features: ['Полный холст и библиотека', 'Экспорт PNG и SVG', 'Один проект в браузере', 'Без регистрации'],
    accent: false,
    cta: 'Открыть холст',
  },
  {
    id: 'lab',
    name: 'Лаборатория',
    price: '590 ₽',
    note: 'в месяц',
    features: [
      'Неограниченные проекты',
      'Свои элементы и палитры',
      'Экспорт 4× и PDF',
      'История версий схемы',
    ],
    accent: true,
    cta: 'Записаться в лист ожидания',
  },
  {
    id: 'dept',
    name: 'Кафедра',
    price: 'По счёту',
    note: 'от 10 мест',
    features: ['Общая библиотека группы', 'Единый стиль для статей', 'Приоритетная поддержка', 'Счёт для бухгалтерии'],
    accent: false,
    cta: 'Написать нам',
  },
];

const Pricing = () => (
  <section id="price" className="border-t border-border bg-background px-6 py-20 md:px-12 md:py-28">
    <div className="flex flex-col justify-between gap-6 pb-12 md:flex-row md:items-end">
      <div>
        <p className="rule-label">Раздел 05 — тарифы</p>
        <h2 className="mt-4 max-w-lg font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
          Первая версия
          <br />
          бесплатна целиком
        </h2>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        Всё, что показано выше, работает без оплаты. Платные планы — про масштаб, а не про доступ.
      </p>
    </div>

    <div className="grid gap-px bg-border lg:grid-cols-3">
      {PLANS.map((p) => (
        <div
          key={p.id}
          className={`flex flex-col p-8 transition-colors ${
            p.accent ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-card'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-[11px] uppercase tracking-[0.2em] ${p.accent ? 'opacity-70' : 'text-muted-foreground'}`}>
              {p.name}
            </p>
            {p.accent && (
              <span className="border border-primary-foreground/30 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em]">
                скоро
              </span>
            )}
          </div>
          <p className="mt-8 font-head text-4xl font-light tracking-[-0.03em]">{p.price}</p>
          <p className={`mt-2 text-xs uppercase tracking-[0.16em] ${p.accent ? 'opacity-70' : 'text-muted-foreground'}`}>
            {p.note}
          </p>

          <ul className="mt-8 flex-1 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-relaxed">
                <Icon
                  name="Minus"
                  size={14}
                  className={`mt-1 shrink-0 ${p.accent ? 'opacity-60' : 'text-primary'}`}
                />
                <span className={p.accent ? '' : 'text-muted-foreground'}>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#canvas"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#canvas')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`mt-10 flex h-12 items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
              p.accent
                ? 'bg-primary-foreground text-primary hover:-translate-y-0.5'
                : 'border border-border text-muted-foreground hover:border-primary hover:text-foreground'
            }`}
          >
            {p.cta}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Pricing;
