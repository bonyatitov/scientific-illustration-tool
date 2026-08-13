import { S, line, type ShapeDef } from './types';

export const CELL_SHAPES: ShapeDef[] = [
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
    id: 'cell-nucleus',
    label: 'Ядро',
    category: 'cells',
    defaultWidth: 170,
    defaultHeight: 170,
    defaultFill: '#1c2430',
    defaultStroke: '#8f9fb8',
    render: (o) => (
      <>
        <circle cx="50" cy="50" r="46" {...S(o)} />
        <circle cx="50" cy="50" r="40" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 0.7} />
        <circle cx="42" cy="44" r="12" fill={o.stroke} opacity="0.45" />
        <circle cx="64" cy="62" r="5" fill={o.stroke} opacity="0.3" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <circle key={a} cx={50 + Math.cos(r) * 43} cy={50 + Math.sin(r) * 43} r="3" fill={o.stroke} />
          );
        })}
      </>
    ),
  },
  {
    id: 'cell-chloroplast',
    label: 'Хлоропласт',
    category: 'cells',
    defaultWidth: 220,
    defaultHeight: 130,
    defaultFill: '#16261d',
    defaultStroke: '#6fbf7d',
    render: (o) => (
      <>
        <ellipse cx="50" cy="50" rx="47" ry="30" {...S(o)} />
        {[26, 42, 58, 74].map((x, i) => (
          <g key={i}>
            <rect x={x - 5} y={i % 2 ? 32 : 44} width="10" height="22" rx="3" fill={o.stroke} opacity="0.5" />
            <path d={`M${x - 5} ${(i % 2 ? 32 : 44) + 7} H${x + 5} M${x - 5} ${(i % 2 ? 32 : 44) + 14} H${x + 5}`} {...line(o)} strokeWidth={o.strokeWidth * 0.5} />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'cell-golgi',
    label: 'Аппарат Гольджи',
    category: 'cells',
    defaultWidth: 220,
    defaultHeight: 150,
    defaultFill: 'none',
    defaultStroke: '#c98fd8',
    render: (o) => (
      <>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${16 + i * 3} ${30 + i * 12} q34 ${-16 + i * 2} ${68 - i * 6} 0`}
            {...line(o)}
            strokeWidth={o.strokeWidth * 1.6}
          />
        ))}
        <circle cx="20" cy="86" r="4" fill={o.stroke} opacity="0.6" />
        <circle cx="82" cy="86" r="3" fill={o.stroke} opacity="0.6" />
      </>
    ),
  },
  {
    id: 'cell-er',
    label: 'ЭПР',
    category: 'cells',
    defaultWidth: 230,
    defaultHeight: 150,
    defaultFill: 'none',
    defaultStroke: '#8fa8c8',
    render: (o) => (
      <>
        <path d="M6 24 q24 14 48 0 t40 0" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />
        <path d="M6 48 q24 14 48 0 t40 0" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />
        <path d="M6 72 q24 14 48 0 t40 0" {...line(o)} strokeWidth={o.strokeWidth * 1.5} />
        {[14, 34, 54, 74].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="18" r="2.5" fill={o.stroke} />
            <circle cx={x + 8} cy="42" r="2.5" fill={o.stroke} />
            <circle cx={x} cy="66" r="2.5" fill={o.stroke} />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'cell-stem',
    label: 'Стволовая клетка',
    category: 'cells',
    defaultWidth: 170,
    defaultHeight: 170,
    defaultFill: '#1a2430',
    defaultStroke: '#7fd6d0',
    render: (o) => (
      <>
        <circle cx="50" cy="50" r="44" {...S(o)} />
        <circle cx="50" cy="50" r="20" fill={o.stroke} opacity="0.35" />
        <circle cx="50" cy="50" r="8" fill={o.stroke} opacity="0.7" />
        <circle cx="50" cy="50" r="44" fill="none" stroke={o.stroke} strokeWidth={o.strokeWidth * 0.6} strokeDasharray="2 5" />
      </>
    ),
  },
  {
    id: 'cell-macrophage',
    label: 'Макрофаг',
    category: 'cells',
    defaultWidth: 210,
    defaultHeight: 190,
    defaultFill: '#221c2e',
    defaultStroke: '#9d8fd8',
    render: (o) => (
      <>
        <path
          d="M22 34 C 6 26, 14 8, 32 16 C 44 2, 66 6, 70 20 C 92 18, 98 42, 84 52 C 96 68, 78 92, 60 84 C 46 98, 22 92, 22 74 C 4 66, 6 44, 22 34 Z"
          {...S(o)}
        />
        <circle cx="46" cy="50" r="14" fill={o.stroke} opacity="0.45" />
        <circle cx="68" cy="64" r="5" fill={o.stroke} opacity="0.3" />
      </>
    ),
  },
  {
    id: 'cell-yeast',
    label: 'Дрожжевая клетка',
    category: 'cells',
    defaultWidth: 190,
    defaultHeight: 160,
    defaultFill: '#2a2519',
    defaultStroke: '#d8bd6f',
    render: (o) => (
      <>
        <circle cx="40" cy="56" r="34" {...S(o)} />
        <circle cx="80" cy="28" r="17" {...S(o)} />
        <circle cx="36" cy="52" r="11" fill={o.stroke} opacity="0.45" />
        <circle cx="80" cy="26" r="5" fill={o.stroke} opacity="0.45" />
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
];