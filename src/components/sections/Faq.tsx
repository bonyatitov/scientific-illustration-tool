import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QA = [
  {
    q: 'Где хранится моя схема?',
    a: 'В памяти вашего браузера — localStorage. Кнопка «Сохранить» кладёт проект туда, «Загрузить» достаёт обратно. Ничего не уходит на сервер, но и на другом компьютере проект не появится: для переноса выгрузите SVG.',
  },
  {
    q: 'Можно ли редактировать выгруженный SVG дальше?',
    a: 'Да. Каждый объект остаётся отдельной группой с обычными кривыми, поэтому Illustrator, Inkscape и Affinity открывают файл как нормальный вектор, а не как картинку.',
  },
  {
    q: 'Как перенести структуру из ChemDraw?',
    a: 'В ChemDraw сохраните рисунок как SVG (File → Save As → SVG) и перетащите файл на холст или нажмите «Импорт SVG». Структура встанет как обычный объект: её можно двигать, вращать, масштабировать и выгружать вместе со схемой. Формат .cdx напрямую не читается — SVG остаётся универсальным мостом, его же понимают Word и PowerPoint.',
  },
  {
    q: 'Холст можно сделать белым?',
    a: 'Да. Внизу холста есть переключатель «Бумага / Тёмный». Белый режим показывает схему так, как она будет выглядеть в статье или презентации, и экспорт в этом режиме идёт на белом фоне.',
  },
  {
    q: 'Что с лицензией на элементы?',
    a: 'Все примитивы нарисованы нами и отдаются вместе со схемой — их можно использовать в статьях, презентациях и диссертациях без отдельного разрешения.',
  },
  {
    q: 'Почему элементов меньше, чем у больших редакторов?',
    a: 'Это первая версия. Мы сознательно начали со схематического ядра: клетки, молекулы, стрелки, текст, геометрия. Библиотека расширяется, механика редактора уже финальная.',
  },
  {
    q: 'Работает ли на телефоне?',
    a: 'Холст открывается, но библиотека и панель свойств рассчитаны на экран от 1024 px. Рисовать схему удобнее с мышью — тонкая настройка размеров этого требует.',
  },
];

const Faq = () => (
  <section id="faq" className="border-t border-border bg-card px-6 py-20 md:px-12 md:py-28">
    <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
      <div>
        <p className="rule-label">Раздел 05 — вопросы</p>
        <h2 className="mt-4 font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
          Сухие
          <br />
          ответы
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full border-t border-border">
        {QA.map((item, i) => (
          <AccordionItem key={item.q} value={`i${i}`} className="border-border">
            <AccordionTrigger className="gap-6 py-6 text-left hover:no-underline">
              <span className="flex items-baseline gap-5">
                <span className="font-head text-xs font-light tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="font-head text-base font-light leading-snug tracking-[-0.02em] text-foreground md:text-lg">
                  {item.q}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pl-[3.1rem] pr-4 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;