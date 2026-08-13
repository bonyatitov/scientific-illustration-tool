import Icon from '@/components/ui/icon';
import { SHAPES } from '@/lib/shape-library';

const STEPS = [
  {
    icon: 'Pencil',
    title: 'Рисуете в цифре',
    text: 'Procreate, Photoshop, Figma, Illustrator, планшет — что угодно. Главное, чтобы рисунок был цифровым и с чистым контуром.',
  },
  {
    icon: 'Wand2',
    title: 'Мы переводим в вектор',
    text: 'Конвертация в SVG, оптимизация путей и подключение к редактору — полностью на нас. От вас — только картинка.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Авторство остаётся за вами',
    text: 'Имя художника появляется на странице проекта и в подписи к элементам. Работы можно смело класть в портфолио.',
  },
];

const WISHLIST = [
  'Органеллы крупным планом',
  'Иммунные клетки',
  'Модельные организмы',
  'Лабораторные приборы',
  'Биохимические пути',
  'Ткани и срезы',
];

const ArtistCall = () => (
  <section id="artist" className="relative overflow-hidden border-t border-border bg-background px-6 py-20 md:px-12 md:py-28">
    <div
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--hero-x-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-x-grid) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        maskImage: 'radial-gradient(90% 70% at 80% 30%, #000 10%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(90% 70% at 80% 30%, #000 10%, transparent 70%)',
      }}
    />

    <div className="relative grid gap-14 lg:grid-cols-[minmax(0,440px)_1fr]">
      <div>
        <p className="rule-label flex items-center gap-3">
          <i className="block h-px w-6 bg-primary" />
          Раздел 05 — приглашение
        </p>
        <h2 className="mt-6 font-head text-3xl font-light leading-[1.08] tracking-[-0.03em] text-foreground md:text-5xl">
          Ищем художника,
          <br />
          <span className="text-primary">который любит науку</span>
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Сейчас в библиотеке {SHAPES.length} элементов, и все нарисованы разработчиком — то есть человеком,
          у которого сильная сторона это код, а не рисунок. Хочется, чтобы клетки выглядели живыми,
          а приборы — узнаваемыми. Если вы рисуете и вам близка биология, давайте сделаем это вместе.
        </p>

        <div className="mt-8 flex items-start gap-3 border border-primary/40 bg-primary/10 px-4 py-4">
          <Icon name="Heart" size={17} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            Скажем честно: проект пока некоммерческий и денег не приносит, поэтому платить за работу
            нам нечем. Взамен — постоянное авторство на странице, полная свобода в стиле
            и элементы, которыми будут пользоваться студенты и лаборатории по всей стране.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://vk.com/bonyatitov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center gap-3 bg-primary px-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Icon name="MessageCircle" size={16} />
            Написать во ВКонтакте
          </a>
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex h-14 items-center gap-3 border border-border px-6 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            Оставить почту
          </a>
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Богдан Титов · vk.com/bonyatitov · достаточно двух-трёх работ
        </p>
      </div>

      <div className="divide-y divide-border self-start border border-border">
        {STEPS.map((s, i) => (
          <article key={s.title} className="group flex gap-5 bg-background p-6 transition-colors hover:bg-card md:p-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary">
              <Icon name={s.icon} size={19} />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <span className="font-head text-xs font-light tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="font-head text-lg font-light leading-snug tracking-[-0.02em] text-foreground">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </article>
        ))}

        <div className="bg-background p-6 md:p-8">
          <p className="rule-label">Что особенно ждём</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {WISHLIST.map((w) => (
              <span
                key={w}
                className="border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Свои идеи тоже приветствуются — если считаете, что схемам не хватает чего-то ещё,
            просто нарисуйте это.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ArtistCall;