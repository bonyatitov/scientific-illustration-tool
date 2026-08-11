const ALLOWED_TAGS = new Set([
  'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan', 'defs', 'marker', 'symbol', 'use', 'title', 'desc',
  'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'pattern',
]);

const BLOCKED_ATTR = /^(on|xlink:href$|href$|src$|formaction$)/i;

export interface ImportedSvg {
  inner: string;
  width: number;
  height: number;
}

function clean(node: Element) {
  [...node.children].forEach((child) => {
    const tag = child.tagName.replace(/^.*:/, '');
    if (!ALLOWED_TAGS.has(tag)) {
      child.remove();
      return;
    }
    [...child.attributes].forEach((attr) => {
      const name = attr.name;
      const value = attr.value;
      if (BLOCKED_ATTR.test(name)) {
        if (name === 'href' || name === 'xlink:href') {
          if (!value.startsWith('#')) child.removeAttribute(name);
        } else {
          child.removeAttribute(name);
        }
        return;
      }
      if (/url\s*\(\s*['"]?\s*(?!#)/i.test(value) || /javascript:/i.test(value)) {
        child.removeAttribute(name);
      }
    });
    clean(child);
  });
}

/** Разбирает SVG-файл (например экспорт из ChemDraw) в безопасную разметку. */
export function parseSvgFile(text: string): ImportedSvg | null {
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg || doc.querySelector('parsererror')) return null;

  clean(svg);

  const viewBox = svg.getAttribute('viewBox');
  let width = parseFloat(svg.getAttribute('width') ?? '') || 0;
  let height = parseFloat(svg.getAttribute('height') ?? '') || 0;

  if (viewBox) {
    const parts = viewBox.trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts.every(Number.isFinite)) {
      const [minX, minY, vw, vh] = parts;
      if (vw > 0 && vh > 0) {
        width = width || vw;
        height = height || vh;
        const inner = `<g transform="scale(${100 / vw} ${100 / vh}) translate(${-minX} ${-minY})">${svg.innerHTML}</g>`;
        return { inner, width, height };
      }
    }
  }

  if (!(width > 0) || !(height > 0)) return null;
  const inner = `<g transform="scale(${100 / width} ${100 / height})">${svg.innerHTML}</g>`;
  return { inner, width, height };
}

/** Повторная очистка сохранённой разметки при загрузке проекта. */
export function sanitizeSvgMarkup(markup: string): string {
  const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg || doc.querySelector('parsererror')) return '';
  clean(svg);
  return svg.innerHTML;
}
