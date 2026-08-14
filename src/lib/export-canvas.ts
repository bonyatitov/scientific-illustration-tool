import type { SceneObject } from './editor-types';

const PADDING = 48;

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Насколько согнутый объект выходит за свои габариты. */
function bendGrow(o: SceneObject) {
  const bend = o.bend ?? 0;
  if (Math.abs(bend) < 1) return { top: 0, bottom: 0, left: 0, right: 0 };
  const maxRad = (1.9 * o.width) / Math.max(o.height, 1);
  const rad = Math.max(-maxRad, Math.min(maxRad, (bend * Math.PI) / 180));
  const R = Math.abs(o.width / rad);
  const half = Math.abs(rad) / 2;
  const sag = R * (1 - Math.cos(half));
  const side = Math.abs(rad) > Math.PI ? R + o.height : Math.max(0, R * Math.sin(half) - o.width / 2);
  const bulge = sag / 2 + o.height;
  return rad > 0
    ? { top: 0, bottom: bulge, left: side, right: side }
    : { top: bulge, bottom: 0, left: side, right: side };
}

export function sceneBounds(objects: SceneObject[]): Bounds {
  if (!objects.length) return { x: 0, y: 0, width: 800, height: 600 };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  objects.forEach((o) => {
    const cx = o.x + o.width / 2;
    const cy = o.y + o.height / 2;
    const rad = (o.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const g = bendGrow(o);
    const corners = [
      [o.x - g.left, o.y - g.top],
      [o.x + o.width + g.right, o.y - g.top],
      [o.x - g.left, o.y + o.height + g.bottom],
      [o.x + o.width + g.right, o.y + o.height + g.bottom],
    ];
    corners.forEach(([px, py]) => {
      const dx = px - cx;
      const dy = py - cy;
      const rx = cx + dx * cos - dy * sin;
      const ry = cy + dx * sin + dy * cos;
      minX = Math.min(minX, rx);
      minY = Math.min(minY, ry);
      maxX = Math.max(maxX, rx);
      maxY = Math.max(maxY, ry);
    });
  });

  return {
    x: Math.floor(minX - PADDING),
    y: Math.floor(minY - PADDING),
    width: Math.ceil(maxX - minX + PADDING * 2),
    height: Math.ceil(maxY - minY + PADDING * 2),
  };
}

/** Собирает автономный SVG-документ из живых узлов холста. */
export function buildSvgString(
  liveSvg: SVGSVGElement | null,
  objects: SceneObject[],
  background: string | null,
): string {
  const b = sceneBounds(objects);
  const parts: string[] = [];

  if (liveSvg) {
    objects.forEach((o) => {
      const node = liveSvg.querySelector(`[data-obj="${o.id}"]`);
      if (!node) return;
      const clone = node.cloneNode(true) as SVGGElement;
      clone.querySelectorAll('[data-hit]').forEach((n) => n.remove());
      clone.removeAttribute('style');
      clone.removeAttribute('data-obj');
      parts.push(clone.innerHTML ? clone.outerHTML : '');
    });
  }

  const bg = background
    ? `<rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" fill="${background}"/>`
    : '';

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${b.width}" height="${b.height}" viewBox="${b.x} ${b.y} ${b.width} ${b.height}">`,
    bg,
    parts.join(''),
    '</svg>',
  ].join('');
}

function download(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function exportSvg(
  liveSvg: SVGSVGElement | null,
  objects: SceneObject[],
  transparent: boolean,
  bgColor = '#0D1117',
) {
  const svg = buildSvgString(liveSvg, objects, transparent ? null : bgColor);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  download(url, `nucleotosha-${Date.now()}.svg`);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function exportPng(
  liveSvg: SVGSVGElement | null,
  objects: SceneObject[],
  transparent: boolean,
  scale = 2,
  bgColor = '#0D1117',
): Promise<void> {
  return new Promise((resolve, reject) => {
    const b = sceneBounds(objects);
    const svg = buildSvgString(liveSvg, objects, transparent ? null : bgColor);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = b.width * scale;
      canvas.height = b.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('canvas'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((out) => {
        if (!out) {
          reject(new Error('blob'));
          return;
        }
        const pngUrl = URL.createObjectURL(out);
        download(pngUrl, `nucleotosha-${Date.now()}.png`);
        setTimeout(() => URL.revokeObjectURL(pngUrl), 4000);
        resolve();
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('image'));
    };
    img.src = url;
  });
}