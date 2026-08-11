import { line, type ShapeDef } from './types';

export const ARROW_SHAPES: ShapeDef[] = [
  {
    id: 'arr-right',
    label: 'Стрелка',
    category: 'arrows',
    defaultWidth: 240,
    defaultHeight: 60,
    defaultFill: 'none',
    defaultStroke: '#d8ff3e',
    render: (o) => (
      <>
        <path d="M2 50 H86" {...line(o)} strokeWidth={o.strokeWidth * 1.6} />
        <path d="M98 50 L80 38 L80 62 Z" fill={o.stroke} />
      </>
    ),
  },
  {
    id: 'arr-double',
    label: 'Двойная стрелка',
    category: 'arrows',
    defaultWidth: 240,
    defaultHeight: 60,
    defaultFill: 'none',
    defaultStroke: '#d8ff3e',
    render: (o) => (
      <>
        <path d="M14 50 H86" {...line(o)} strokeWidth={o.strokeWidth * 1.6} />
        <path d="M98 50 L80 38 L80 62 Z" fill={o.stroke} />
        <path d="M2 50 L20 38 L20 62 Z" fill={o.stroke} />
      </>
    ),
  },
  {
    id: 'arr-curved',
    label: 'Изогнутая стрелка',
    category: 'arrows',
    defaultWidth: 220,
    defaultHeight: 140,
    defaultFill: 'none',
    defaultStroke: '#d8ff3e',
    render: (o) => (
      <>
        <path d="M4 88 C 20 20, 70 12, 86 42" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />
        <path d="M94 60 L74 42 L94 34 Z" fill={o.stroke} />
      </>
    ),
  },
  {
    id: 'arr-inhibit',
    label: 'Ингибирование',
    category: 'arrows',
    defaultWidth: 220,
    defaultHeight: 60,
    defaultFill: 'none',
    defaultStroke: '#e2645f',
    render: (o) => (
      <>
        <path d="M2 50 H88" {...line(o)} strokeWidth={o.strokeWidth * 1.6} />
        <path d="M90 26 V74" {...line(o)} strokeWidth={o.strokeWidth * 2.4} />
      </>
    ),
  },
  {
    id: 'arr-dashed',
    label: 'Пунктирная связь',
    category: 'arrows',
    defaultWidth: 220,
    defaultHeight: 40,
    defaultFill: 'none',
    defaultStroke: '#79828f',
    render: (o) => (
      <path d="M2 50 H98" {...line(o)} strokeWidth={o.strokeWidth * 1.4} strokeDasharray="7 7" />
    ),
  },
  {
    id: 'arr-cycle',
    label: 'Цикл',
    category: 'arrows',
    defaultWidth: 170,
    defaultHeight: 170,
    defaultFill: 'none',
    defaultStroke: '#d8ff3e',
    render: (o) => (
      <>
        <path d="M84 34 A 40 40 0 1 0 88 62" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />
        <path d="M92 22 L96 46 L74 40 Z" fill={o.stroke} />
      </>
    ),
  },
];

export const TEXT_SHAPES: ShapeDef[] = [
  {
    id: 'txt-title',
    label: 'Заголовок',
    category: 'text',
    defaultWidth: 320,
    defaultHeight: 60,
    defaultFill: '#edeff2',
    defaultStroke: 'none',
    isText: true,
    defaultText: 'Заголовок схемы',
    defaultFontSize: 34,
    render: () => null,
  },
  {
    id: 'txt-label',
    label: 'Подпись',
    category: 'text',
    defaultWidth: 220,
    defaultHeight: 40,
    defaultFill: '#edeff2',
    defaultStroke: 'none',
    isText: true,
    defaultText: 'Подпись элемента',
    defaultFontSize: 20,
    render: () => null,
  },
  {
    id: 'txt-caption',
    label: 'Сноска',
    category: 'text',
    defaultWidth: 260,
    defaultHeight: 32,
    defaultFill: '#79828f',
    defaultStroke: 'none',
    isText: true,
    defaultText: 'Рис. 1 — описание',
    defaultFontSize: 15,
    render: () => null,
  },
  {
    id: 'txt-badge',
    label: 'Метка',
    category: 'text',
    defaultWidth: 150,
    defaultHeight: 34,
    defaultFill: '#d8ff3e',
    defaultStroke: 'none',
    isText: true,
    defaultText: 'in vitro',
    defaultFontSize: 16,
    render: () => null,
  },
];
