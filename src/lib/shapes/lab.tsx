import { S, line, type ShapeDef } from './types';

export const LAB_SHAPES: ShapeDef[] = [
  {
    id: 'lab-flask',
    label: 'Колба',
    category: 'lab',
    defaultWidth: 170,
    defaultHeight: 190,
    defaultFill: '#16242e',
    defaultStroke: '#7fd6d0',
    render: (o) => (
      <>
        <path d="M40 6 V38 L12 88 a6 6 0 0 0 5 10 H83 a6 6 0 0 0 5 -10 L60 38 V6 Z" {...S(o)} />
        <path d="M34 6 H66" {...line(o)} strokeWidth={o.strokeWidth * 2} />
        <path d="M24 70 H76 l10 18 a6 6 0 0 1 -5 10 H19 a6 6 0 0 1 -5 -10 Z" fill={o.stroke} opacity="0.35" />
      </>
    ),
  },
  {
    id: 'lab-tube',
    label: 'Пробирка',
    category: 'lab',
    defaultWidth: 90,
    defaultHeight: 210,
    defaultFill: '#16242e',
    defaultStroke: '#7fd6d0',
    render: (o) => (
      <>
        <path d="M32 4 V78 a18 18 0 0 0 36 0 V4 Z" {...S(o)} />
        <path d="M26 4 H74" {...line(o)} strokeWidth={o.strokeWidth * 2} />
        <path d="M32 52 V78 a18 18 0 0 0 36 0 V52 Z" fill={o.stroke} opacity="0.4" />
      </>
    ),
  },
  {
    id: 'lab-petri',
    label: 'Чашка Петри',
    category: 'lab',
    defaultWidth: 190,
    defaultHeight: 150,
    defaultFill: '#1a2630',
    defaultStroke: '#8fa8c8',
    render: (o) => (
      <>
        <ellipse cx="50" cy="46" rx="46" ry="26" {...S(o)} />
        <path d="M4 46 V60 a46 26 0 0 0 92 0 V46" {...S(o)} />
        <ellipse cx="50" cy="46" rx="38" ry="20" fill={o.stroke} opacity="0.2" />
        <circle cx="38" cy="42" r="4" fill={o.stroke} opacity="0.6" />
        <circle cx="60" cy="50" r="3" fill={o.stroke} opacity="0.6" />
        <circle cx="56" cy="38" r="2.5" fill={o.stroke} opacity="0.6" />
      </>
    ),
  },
  {
    id: 'lab-pipette',
    label: 'Пипетка',
    category: 'lab',
    defaultWidth: 90,
    defaultHeight: 220,
    defaultFill: '#1e2836',
    defaultStroke: '#d8ff3e',
    render: (o) => (
      <>
        <path d="M34 2 H66 V52 L54 86 V96 H46 V86 L34 52 Z" {...S(o)} />
        <path d="M28 2 H72" {...line(o)} strokeWidth={o.strokeWidth * 2} />
        <path d="M46 72 L54 72 V96 H46 Z" fill={o.stroke} opacity="0.6" />
      </>
    ),
  },
  {
    id: 'lab-plate',
    label: 'Планшет 96 лунок',
    category: 'lab',
    defaultWidth: 260,
    defaultHeight: 180,
    defaultFill: '#1a2430',
    defaultStroke: '#8fa8c8',
    render: (o) => (
      <>
        <rect x="2" y="8" width="96" height="84" rx="5" {...S(o)} />
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 8 }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={11 + c * 11}
              cy={19 + r * 13}
              r="4"
              fill={o.stroke}
              opacity={(r + c) % 3 === 0 ? 0.7 : 0.25}
            />
          )),
        )}
      </>
    ),
  },
  {
    id: 'lab-microscope',
    label: 'Микроскоп',
    category: 'lab',
    defaultWidth: 180,
    defaultHeight: 200,
    defaultFill: '#1e2836',
    defaultStroke: '#8fa8c8',
    render: (o) => (
      <>
        <path d="M20 96 H80 a4 4 0 0 0 0 -10 H20 a4 4 0 0 0 0 10 Z" {...S(o)} />
        <path d="M34 86 V70 H66 V86 Z" {...S(o)} />
        <rect x="44" y="8" width="16" height="40" rx="4" {...S(o)} />
        <path d="M52 48 V64" {...line(o)} strokeWidth={o.strokeWidth * 2.4} />
        <path d="M60 20 q22 18 8 44" {...line(o)} strokeWidth={o.strokeWidth * 1.6} />
        <rect x="30" y="62" width="40" height="5" fill={o.stroke} opacity="0.6" />
      </>
    ),
  },
  {
    id: 'lab-tip',
    label: 'Наконечник',
    category: 'lab',
    defaultWidth: 70,
    defaultHeight: 180,
    defaultFill: '#22303c',
    defaultStroke: '#7fd6a2',
    render: (o) => (
      <>
        <path d="M30 4 H70 L58 60 L54 96 H46 L42 60 Z" {...S(o)} />
        <path d="M42 56 H58 L54 96 H46 Z" fill={o.stroke} opacity="0.45" />
      </>
    ),
  },
  {
    id: 'lab-gel',
    label: 'Электрофорез',
    category: 'lab',
    defaultWidth: 240,
    defaultHeight: 190,
    defaultFill: '#141c26',
    defaultStroke: '#8fb8ff',
    render: (o) => (
      <>
        <rect x="2" y="2" width="96" height="96" rx="3" {...S(o)} />
        {[16, 34, 52, 70, 86].map((x, c) => (
          <g key={c}>
            <rect x={x - 6} y="8" width="12" height="4" fill={o.stroke} opacity="0.8" />
            {[26, 42, 58, 76].map((y, r) =>
              (c + r) % 2 === 0 ? (
                <rect key={r} x={x - 6} y={y} width="12" height="4" fill={o.stroke} opacity={0.8 - r * 0.15} />
              ) : null,
            )}
          </g>
        ))}
      </>
    ),
  },
];
