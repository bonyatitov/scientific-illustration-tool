import type { ShapeDef } from './types';

const TEXT = '#edeff2';
const ACCENT = '#8fd0e8';

interface Entry {
  id: string;
  char: string;
  label: string;
  color?: string;
  size?: number;
  italic?: boolean;
}

const GREEK_LOWER: Entry[] = [
  { id: 'alpha', char: 'α', label: 'альфа' },
  { id: 'beta', char: 'β', label: 'бета' },
  { id: 'gamma', char: 'γ', label: 'гамма' },
  { id: 'delta', char: 'δ', label: 'дельта' },
  { id: 'epsilon', char: 'ε', label: 'эпсилон' },
  { id: 'zeta', char: 'ζ', label: 'дзета' },
  { id: 'eta', char: 'η', label: 'эта' },
  { id: 'theta', char: 'θ', label: 'тета' },
  { id: 'iota', char: 'ι', label: 'йота' },
  { id: 'kappa', char: 'κ', label: 'каппа' },
  { id: 'lambda', char: 'λ', label: 'лямбда' },
  { id: 'mu', char: 'μ', label: 'мю' },
  { id: 'nu', char: 'ν', label: 'ню' },
  { id: 'xi', char: 'ξ', label: 'кси' },
  { id: 'omicron', char: 'ο', label: 'омикрон' },
  { id: 'pi', char: 'π', label: 'пи' },
  { id: 'rho', char: 'ρ', label: 'ро' },
  { id: 'sigma', char: 'σ', label: 'сигма' },
  { id: 'tau', char: 'τ', label: 'тау' },
  { id: 'upsilon', char: 'υ', label: 'ипсилон' },
  { id: 'phi', char: 'φ', label: 'фи' },
  { id: 'chi', char: 'χ', label: 'хи' },
  { id: 'psi', char: 'ψ', label: 'пси' },
  { id: 'omega', char: 'ω', label: 'омега' },
];

const GREEK_UPPER: Entry[] = [
  { id: 'u-gamma', char: 'Γ', label: 'Гамма' },
  { id: 'u-delta', char: 'Δ', label: 'Дельта' },
  { id: 'u-theta', char: 'Θ', label: 'Тета' },
  { id: 'u-lambda', char: 'Λ', label: 'Лямбда' },
  { id: 'u-xi', char: 'Ξ', label: 'Кси' },
  { id: 'u-pi', char: 'Π', label: 'Пи' },
  { id: 'u-sigma', char: 'Σ', label: 'Сигма' },
  { id: 'u-phi', char: 'Φ', label: 'Фи' },
  { id: 'u-psi', char: 'Ψ', label: 'Пси' },
  { id: 'u-omega', char: 'Ω', label: 'Омега' },
];

const SCIENCE: Entry[] = [
  { id: 'degree', char: '°C', label: 'градус', color: ACCENT, italic: false },
  { id: 'micro', char: 'мкм', label: 'микрометр', color: ACCENT, italic: false },
  { id: 'plusminus', char: '±', label: 'плюс-минус', italic: false },
  { id: 'approx', char: '≈', label: 'примерно', italic: false },
  { id: 'noteq', char: '≠', label: 'не равно', italic: false },
  { id: 'leq', char: '≤', label: 'меньше-равно', italic: false },
  { id: 'geq', char: '≥', label: 'больше-равно', italic: false },
  { id: 'infinity', char: '∞', label: 'бесконечность', italic: false },
  { id: 'sum', char: '∑', label: 'сумма', italic: false },
  { id: 'sqrt', char: '√', label: 'корень', italic: false },
  { id: 'integral', char: '∫', label: 'интеграл' },
  { id: 'partial', char: '∂', label: 'производная' },
  { id: 'nabla', char: '∇', label: 'набла', italic: false },
  { id: 'prime', char: '′', label: 'штрих', italic: false },
  { id: 'permille', char: '‰', label: 'промилле', italic: false },
  { id: 'percent', char: '%', label: 'процент', italic: false },
  { id: 'dot-mult', char: '·', label: 'умножение', italic: false },
  { id: 'times', char: '×', label: 'крестик', italic: false },
  { id: 'bullet', char: '•', label: 'маркер', italic: false },
  { id: 'dagger', char: '†', label: 'крест-сноска', italic: false },
  { id: 'star', char: '∗', label: 'звёздочка', italic: false },
  { id: 'angle', char: '∠', label: 'угол', italic: false },
  { id: 'proportional', char: '∝', label: 'пропорционально', italic: false },
  { id: 'element', char: '∈', label: 'принадлежит', italic: false },
];

const REACTION: Entry[] = [
  { id: 'r-arrow', char: '→', label: 'реакция', color: ACCENT, italic: false },
  { id: 'r-rev', char: '⇌', label: 'равновесие', color: ACCENT, italic: false },
  { id: 'r-both', char: '↔', label: 'обратимо', color: ACCENT, italic: false },
  { id: 'r-double', char: '⇒', label: 'следует', color: ACCENT, italic: false },
  { id: 'r-up', char: '↑', label: 'рост', color: ACCENT, italic: false },
  { id: 'r-down', char: '↓', label: 'снижение', color: ACCENT, italic: false },
  { id: 'r-plus', char: '+', label: 'плюс', color: ACCENT, italic: false },
  { id: 'r-minus', char: '−', label: 'минус', color: ACCENT, italic: false },
];

const build = (list: Entry[], prefix: string): ShapeDef[] =>
  list.map((e) => ({
    id: `sym-${prefix}-${e.id}`,
    label: e.label,
    category: 'symbols' as const,
    defaultWidth: 60,
    defaultHeight: 60,
    defaultFill: e.color ?? TEXT,
    defaultStroke: 'none',
    isText: true,
    defaultText: e.char,
    defaultFontSize: e.size ?? 42,
    defaultItalic: e.italic ?? true,
    render: () => null,
  }));

export const SYMBOL_SHAPES: ShapeDef[] = [
  ...build(GREEK_LOWER, 'g'),
  ...build(GREEK_UPPER, 'G'),
  ...build(SCIENCE, 's'),
  ...build(REACTION, 'r'),
];
