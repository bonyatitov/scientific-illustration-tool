import { S, line, type ShapeDef } from './types';

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
