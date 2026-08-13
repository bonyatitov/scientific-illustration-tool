import { S, line, type ShapeDef } from './types';

export const IMPORTED_SHAPE: ShapeDef = {
  id: 'imported-svg',
  label: 'Импорт из файла',
  category: 'imported',
  defaultWidth: 240,
  defaultHeight: 200,
  defaultFill: 'none',
  defaultStroke: 'none',
  isImported: true,
  render: () => null,
};

export const GEOMETRY_SHAPES: ShapeDef[] = [
  {
    id: 'sh-rect',
    label: 'Прямоугольник',
    category: 'shapes',
    defaultWidth: 200,
    defaultHeight: 130,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <rect x="1" y="1" width="98" height="98" {...S(o)} />,
  },
  {
    id: 'sh-round',
    label: 'Скруглённый блок',
    category: 'shapes',
    defaultWidth: 200,
    defaultHeight: 130,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <rect x="1" y="1" width="98" height="98" rx="14" {...S(o)} />,
  },
  {
    id: 'sh-circle',
    label: 'Круг',
    category: 'shapes',
    defaultWidth: 160,
    defaultHeight: 160,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <circle cx="50" cy="50" r="48" {...S(o)} />,
  },
  {
    id: 'sh-ellipse',
    label: 'Эллипс',
    category: 'shapes',
    defaultWidth: 210,
    defaultHeight: 130,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <ellipse cx="50" cy="50" rx="48" ry="48" {...S(o)} />,
  },
  {
    id: 'sh-triangle',
    label: 'Треугольник',
    category: 'shapes',
    defaultWidth: 170,
    defaultHeight: 150,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <polygon points="50,2 98,98 2,98" {...S(o)} />,
  },
  {
    id: 'sh-hex',
    label: 'Шестиугольник',
    category: 'shapes',
    defaultWidth: 170,
    defaultHeight: 160,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <polygon points="50,2 94,26 94,74 50,98 6,74 6,26" {...S(o)} />,
  },
  {
    id: 'sh-line',
    label: 'Линия',
    category: 'shapes',
    defaultWidth: 220,
    defaultHeight: 20,
    defaultFill: 'none',
    defaultStroke: '#79828f',
    render: (o) => <line x1="1" y1="50" x2="99" y2="50" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />,
  },
  {
    id: 'sh-arrow-block',
    label: 'Скобка',
    category: 'shapes',
    defaultWidth: 60,
    defaultHeight: 200,
    defaultFill: 'none',
    defaultStroke: '#79828f',
    render: (o) => (
      <path d="M70 2 q-24 0 -24 22 V38 q0 12 -22 12 q22 0 22 12 V78 q0 20 24 20" {...line(o)} strokeWidth={o.strokeWidth * 1.4} />
    ),
  },
  {
    id: 'sh-diamond',
    label: 'Ромб',
    category: 'shapes',
    defaultWidth: 170,
    defaultHeight: 170,
    defaultFill: '#1f2937',
    defaultStroke: '#79828f',
    render: (o) => <polygon points="50,2 98,50 50,98 2,50" {...S(o)} />,
  },
  {
    id: 'sh-scale',
    label: 'Масштабная линейка',
    category: 'shapes',
    defaultWidth: 220,
    defaultHeight: 40,
    defaultFill: 'none',
    defaultStroke: '#edeff2',
    render: (o) => (
      <>
        <path d="M2 60 H98" {...line(o)} strokeWidth={o.strokeWidth * 2} />
        <path d="M2 44 V76 M98 44 V76" {...line(o)} strokeWidth={o.strokeWidth * 2} />
      </>
    ),
  },
  {
    id: 'sh-cross',
    label: 'Крест',
    category: 'shapes',
    defaultWidth: 150,
    defaultHeight: 150,
    defaultFill: '#e2645f',
    defaultStroke: '#0d1117',
    render: (o) => <polygon points="36,2 64,2 64,36 98,36 98,64 64,64 64,98 36,98 36,64 2,64 2,36 36,36" {...S(o)} />,
  },
  {
    id: 'sh-dashed-box',
    label: 'Пунктирная рамка',
    category: 'shapes',
    defaultWidth: 220,
    defaultHeight: 150,
    defaultFill: 'none',
    defaultStroke: '#79828f',
    render: (o) => (
      <rect x="2" y="2" width="96" height="96" rx="4" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 1.2} strokeDasharray="6 6" />
    ),
  },
  {
    id: 'sh-star',
    label: 'Звезда',
    category: 'shapes',
    defaultWidth: 160,
    defaultHeight: 160,
    defaultFill: '#d8ff3e',
    defaultStroke: '#0d1117',
    render: (o) => (
      <polygon
        points="50,3 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38"
        {...S(o)}
      />
    ),
  },
];