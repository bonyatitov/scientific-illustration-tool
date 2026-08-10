import type { ReactNode } from 'react';
import type { CategoryId, SceneObject } from './editor-types';

export interface ShapeDef {
  id: string;
  label: string;
  category: CategoryId;
  defaultWidth: number;
  defaultHeight: number;
  defaultFill: string;
  defaultStroke: string;
  isText?: boolean;
  defaultText?: string;
  defaultFontSize?: number;
  /** отрисовка в системе координат 0..100 × 0..100 */
  render: (o: SceneObject) => ReactNode;
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  icon: string;
  hint: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'cells', label: 'Клетки', icon: 'CircleDot', hint: 'Клетки и органеллы' },
  { id: 'molecules', label: 'Молекулы', icon: 'Atom', hint: 'ДНК, белки, липиды' },
  { id: 'arrows', label: 'Стрелки / Связи', icon: 'MoveRight', hint: 'Потоки и ингибирование' },
  { id: 'text', label: 'Текст', icon: 'Type', hint: 'Подписи и заголовки' },
  { id: 'shapes', label: 'Фигуры', icon: 'Shapes', hint: 'Базовая геометрия' },
];

const S = (o: SceneObject) => ({
  fill: o.fill,
  stroke: o.stroke,
  strokeWidth: o.strokeWidth,
});

const line = (o: SceneObject) => ({
  fill: 'none',
  stroke: o.stroke,
  strokeWidth: o.strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const SHAPES: ShapeDef[] = [
  /* ─────────────── Клетки ─────────────── */
  {
    id: 'cell-animal',
    label: 'Животная клетка',
    category: 'cells',
    defaultWidth: 220,
    defaultHeight: 220,
    defaultFill: '#171e28',
    defaultStroke: '#3e4a5c',
    render: (o) => (
      <>
        <circle cx="50" cy="50" r="48" {...S(o)} />
        <circle cx="50" cy="50" r="44" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 0.5} strokeDasharray="3 4" />
        <circle cx="40" cy="40" r="17" fill={o.stroke} opacity="0.55" />
        <circle cx="36" cy="36" r="5" fill={o.stroke} />
        <ellipse cx="68" cy="62" rx="12" ry="6" transform="rotate(-24 68 62)" {...line(o)} />
        <ellipse cx="34" cy="72" rx="9" ry="4" transform="rotate(18 34 72)" {...line(o)} />
        <circle cx="66" cy="30" r="2.5" fill={o.stroke} />
        <circle cx="74" cy="42" r="2" fill={o.stroke} />
      </>
    ),
  },
  {
    id: 'cell-plant',
    label: 'Растительная клетка',
    category: 'cells',
    defaultWidth: 240,
    defaultHeight: 190,
    defaultFill: '#171e28',
    defaultStroke: '#4a586d',
    render: (o) => (
      <>
        <rect x="2" y="2" width="96" height="96" rx="8" {...S(o)} />
        <rect x="9" y="9" width="82" height="82" rx="5" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 0.6} />
        <circle cx="32" cy="34" r="12" fill={o.stroke} opacity="0.5" />
        <ellipse cx="66" cy="60" rx="14" ry="9" fill={o.stroke} opacity="0.35" />
        <ellipse cx="68" cy="30" rx="8" ry="5" transform="rotate(-20 68 30)" {...line(o)} />
        <ellipse cx="34" cy="68" rx="8" ry="5" transform="rotate(24 34 68)" {...line(o)} />
      </>
    ),
  },
  {
    id: 'cell-bacteria',
    label: 'Бактерия',
    category: 'cells',
    defaultWidth: 240,
    defaultHeight: 120,
    defaultFill: '#1d2634',
    defaultStroke: '#6f8ba8',
    render: (o) => (
      <>
        <rect x="4" y="26" width="92" height="48" rx="24" {...S(o)} />
        <path d="M20 50 q8-10 16 0 t16 0 t16 0" {...line(o)} />
        <path d="M96 50 q10-14 22-6" {...line(o)} />
        <path d="M4 50 q-10 14-22 6" {...line(o)} />
        <circle cx="34" cy="40" r="4" fill={o.stroke} opacity="0.6" />
      </>
    ),
  },
  {
    id: 'cell-virus',
    label: 'Вирус',
    category: 'cells',
    defaultWidth: 180,
    defaultHeight: 180,
    defaultFill: '#241b2c',
    defaultStroke: '#a882d8',
    render: (o) => (
      <>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * 32;
          const y1 = 50 + Math.sin(a) * 32;
          const x2 = 50 + Math.cos(a) * 46;
          const y2 = 50 + Math.sin(a) * 46;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} {...line(o)} />
              <circle cx={x2} cy={y2} r="4" fill={o.stroke} />
            </g>
          );
        })}
        <circle cx="50" cy="50" r="32" {...S(o)} />
        <circle cx="50" cy="50" r="16" fill={o.stroke} opacity="0.4" />
      </>
    ),
  },
  {
    id: 'cell-neuron',
    label: 'Нейрон',
    category: 'cells',
    defaultWidth: 260,
    defaultHeight: 160,
    defaultFill: '#1b2432',
    defaultStroke: '#67d2c4',
    render: (o) => (
      <>
        <path d="M8 50 L26 34 M8 50 L26 66 M14 30 L28 42 M14 70 L28 58" {...line(o)} />
        <circle cx="36" cy="50" r="16" {...S(o)} />
        <circle cx="36" cy="50" r="6" fill={o.stroke} opacity="0.6" />
        <path d="M52 50 H84" {...line(o)} strokeWidth={o.strokeWidth * 2} />
        <path d="M84 50 L94 42 M84 50 L94 58 M84 50 L96 50" {...line(o)} />
      </>
    ),
  },
  {
    id: 'cell-mito',
    label: 'Митохондрия',
    category: 'cells',
    defaultWidth: 220,
    defaultHeight: 120,
    defaultFill: '#2a1f22',
    defaultStroke: '#e08a7d',
    render: (o) => (
      <>
        <ellipse cx="50" cy="50" rx="47" ry="27" {...S(o)} />
        <path d="M12 50 q8-16 16 0 t16 0 t16 0 t16 0 t12 0" {...line(o)} />
      </>
    ),
  },
  {
    id: 'cell-rbc',
    label: 'Эритроцит',
    category: 'cells',
    defaultWidth: 150,
    defaultHeight: 150,
    defaultFill: '#2f1a1e',
    defaultStroke: '#d4646a',
    render: (o) => (
      <>
        <circle cx="50" cy="50" r="46" {...S(o)} />
        <circle cx="50" cy="50" r="22" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 1.4} opacity="0.8" />
      </>
    ),
  },

  /* ─────────────── Молекулы ─────────────── */
  {
    id: 'mol-dna',
    label: 'ДНК',
    category: 'molecules',
    defaultWidth: 130,
    defaultHeight: 230,
    defaultFill: 'none',
    defaultStroke: '#8fb8ff',
    render: (o) => (
      <>
        <path d="M25 2 C 75 22, 75 38, 25 58 C -25 78, 75 82, 75 98" {...line(o)} />
        <path d="M75 2 C 25 22, 25 38, 75 58 C 125 78, 25 82, 25 98" {...line(o)} />
        {[12, 26, 40, 54, 68, 82].map((y, i) => (
          <line key={i} x1="22" y1={y} x2="78" y2={y} {...line(o)} strokeWidth={o.strokeWidth * 0.8} opacity="0.65" />
        ))}
      </>
    ),
  },
  {
    id: 'mol-protein',
    label: 'Белок',
    category: 'molecules',
    defaultWidth: 190,
    defaultHeight: 160,
    defaultFill: '#1f2a3b',
    defaultStroke: '#7aa2e3',
    render: (o) => (
      <>
        <path
          d="M18 46 C 10 20, 44 6, 62 18 C 84 8, 98 34, 88 52 C 96 74, 66 96, 48 84 C 22 92, 6 68, 18 46 Z"
          {...S(o)}
        />
        <circle cx="42" cy="42" r="7" fill={o.stroke} opacity="0.5" />
        <circle cx="66" cy="58" r="5" fill={o.stroke} opacity="0.35" />
      </>
    ),
  },
  {
    id: 'mol-antibody',
    label: 'Антитело',
    category: 'molecules',
    defaultWidth: 170,
    defaultHeight: 170,
    defaultFill: 'none',
    defaultStroke: '#f0c274',
    render: (o) => (
      <>
        <path d="M50 96 V54 L22 14 M50 54 L78 14" {...line(o)} strokeWidth={o.strokeWidth * 2.4} />
        <circle cx="22" cy="12" r="7" fill={o.stroke} />
        <circle cx="78" cy="12" r="7" fill={o.stroke} />
      </>
    ),
  },
  {
    id: 'mol-bilayer',
    label: 'Липидный бислой',
    category: 'molecules',
    defaultWidth: 300,
    defaultHeight: 120,
    defaultFill: 'none',
    defaultStroke: '#f2b544',
    render: (o) => (
      <>
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 6 + i * 8.8;
          return (
            <g key={i}>
              <circle cx={x} cy="14" r="5" fill={o.stroke} />
              <path d={`M${x - 2} 20 V44 M${x + 2} 20 V44`} {...line(o)} />
              <circle cx={x} cy="86" r="5" fill={o.stroke} />
              <path d={`M${x - 2} 80 V56 M${x + 2} 80 V56`} {...line(o)} />
            </g>
          );
        })}
      </>
    ),
  },
  {
    id: 'mol-atp',
    label: 'АТФ',
    category: 'molecules',
    defaultWidth: 150,
    defaultHeight: 150,
    defaultFill: '#22302a',
    defaultStroke: '#7fd6a2',
    render: (o) => (
      <>
        <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" {...S(o)} />
        <circle cx="50" cy="50" r="16" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth} />
        <path d="M50 34 V66 M34 50 H66" {...line(o)} />
      </>
    ),
  },
  {
    id: 'mol-receptor',
    label: 'Рецептор',
    category: 'molecules',
    defaultWidth: 150,
    defaultHeight: 190,
    defaultFill: '#1f2b36',
    defaultStroke: '#6fc4d8',
    render: (o) => (
      <>
        <path d="M28 96 V44 a22 22 0 0 1 44 0 V96 Z" {...S(o)} />
        <path d="M36 40 V16 M64 40 V16" {...line(o)} strokeWidth={o.strokeWidth * 1.6} />
        <circle cx="36" cy="12" r="6" fill={o.stroke} />
        <circle cx="64" cy="12" r="6" fill={o.stroke} />
      </>
    ),
  },

  /* ─────────────── Стрелки / Связи ─────────────── */
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

  /* ─────────────── Текст ─────────────── */
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

  /* ─────────────── Фигуры ─────────────── */
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

export const SHAPE_MAP: Record<string, ShapeDef> = Object.fromEntries(
  SHAPES.map((s) => [s.id, s]),
);

export const shapesByCategory = (id: CategoryId) => SHAPES.filter((s) => s.category === id);
