import { S, line, type ShapeDef } from './types';

export const MOLECULE_SHAPES: ShapeDef[] = [
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
];
