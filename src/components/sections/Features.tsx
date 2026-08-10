import Icon from '@/components/ui/icon';

const ITEMS = [
  {
    n: '01',
    icon: 'Move',
    title: 'Прямое манипулирование',
    text: 'Объект берётся мышью и тянется. Восемь ручек меняют размер, верхняя — угол. Стрелки двигают на 2 px, с Shift — по сетке.',
  },
  {
    n: '02',
    icon: 'Grid3x3',
    title: 'Сетка 34 px и привязка',
    text: 'Схема сама выравнивается: без линейки, без пиксель-хантинга. Привязку и саму сетку можно выключить одним тумблером.',
  },
  {
    n: '03',
    icon: 'ZoomIn',
    title: 'Холст 4000 × 4000',
    text: 'Зум колесом от 20 до 300 %, панорама пробелом или средней кнопкой. Кнопка «Центр» возвращает на исходную.',
  },
  {
    n: '04',
    icon: 'Palette',
    title: 'Цвет как параметр',
    text: 'Заливка, обводка, толщина линии и прозрачность — свойства объекта, а не растр. Меняются в любой момент.',
  },
  {
    n: '05',
    icon: 'Layers',
    title: 'Слои без диалогов',
    text: 'Поднять, опустить, в самый верх, в самый низ. Список слоёв всегда под рукой в правой панели.',
  },
  {
    n: '06',
    icon: 'HardDriveDownload',
    title: 'Всё локально',
    text: 'Проект сохраняется в память браузера. Ни аккаунта, ни загрузки данных на чужой сервер.',
  },
];

const Features = () => (
  <section className="border-t border-border bg-background px-6 py-20 md:px-12 md:py-28">
    <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
      <div>
        <p className="rule-label">Раздел 03 — механика</p>
        <h2 className="mt-4 max-w-lg font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
          Шесть вещей,
          <br />
          которые экономят вечер
        </h2>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        Ничего лишнего: только то, что реально нужно, когда до дедлайна по статье остались сутки.
      </p>
    </div>

    <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
      {ITEMS.map((it) => (
        <article key={it.n} className="group bg-background p-8 transition-colors hover:bg-card">
          <div className="flex items-start justify-between">
            <Icon name={it.icon} size={22} className="text-primary" />
            <span className="font-head text-xs font-light tracking-[0.2em] text-muted-foreground">{it.n}</span>
          </div>
          <h3 className="mt-8 font-head text-lg font-light leading-snug tracking-[-0.02em] text-foreground">
            {it.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Features;
