interface Props {
  className?: string;
  title?: string;
}

const FEATHER = '#efb45c';
const BODY = '#2b3444';
const RIM = '#93a4bd';
const NEON = '#d8ff3e';

const CX = 60;
const CY = 78;

/** Перья веером по верхней полудуге. */
const fan = (r: number, len: number, count: number, w: number, key: string) =>
  Array.from({ length: count }).map((_, i) => {
    const a = Math.PI + (i / (count - 1)) * Math.PI;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return (
      <line
        key={`${key}${i}`}
        x1={CX + cos * r}
        y1={CY + sin * r}
        x2={CX + cos * (r + len)}
        y2={CY + sin * (r + len)}
        stroke={FEATHER}
        strokeWidth={w}
        strokeLinecap="round"
      />
    );
  });

const Peacock = ({ className, title }: Props) => (
  <svg viewBox="0 0 120 116" className={className} role="img" aria-label={title ?? 'Нуклеотоша'}>
    {title && <title>{title}</title>}

    {fan(41, 15, 23, 4, 'o')}
    <path d="M19 78 A41 41 0 0 1 101 78" fill="none" stroke={FEATHER} strokeWidth="3.4" opacity="0.6" />
    <path d="M31 78 A29 29 0 0 1 89 78" fill="none" stroke={FEATHER} strokeWidth="2.6" opacity="0.5" />
    {fan(29, 11, 17, 3.2, 'i')}

    <g stroke={FEATHER} strokeWidth="3.4" strokeLinecap="round" fill="none">
      <path d="M49 94 V102 l-8 7 M49 102 l8 7" />
      <path d="M71 94 V102 l-8 7 M71 102 l8 7" />
    </g>
    <g fill={FEATHER}>
      <circle cx="41" cy="110" r="3.2" />
      <circle cx="57" cy="110" r="3.2" />
      <circle cx="63" cy="110" r="3.2" />
      <circle cx="79" cy="110" r="3.2" />
    </g>

    <ellipse cx={CX} cy="79" rx="25" ry="19" fill={BODY} stroke={RIM} strokeWidth="3.6" />
    <ellipse cx="53" cy="76" rx="4.4" ry="3.4" fill={RIM} opacity="0.65" />
    <ellipse cx="66" cy="83" rx="3" ry="2.4" fill={RIM} opacity="0.5" />

    <path d="M59 68 C 55 54, 54 42, 57 33" fill="none" stroke={NEON} strokeWidth="4.2" strokeLinecap="round" />

    <g transform="rotate(-26 58 25)">
      <ellipse cx="58" cy="25" rx="15" ry="11.5" fill={BODY} stroke={NEON} strokeWidth="3.4" />
      <ellipse cx="56" cy="25" rx="5.6" ry="4.4" fill="#9ec24e" />
    </g>

    <g stroke={NEON} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M62 11 L68 2" />
      <path d="M69 14 L82 9" />
      <path d="M72 21 L85 24" />
    </g>
  </svg>
);

export default Peacock;
