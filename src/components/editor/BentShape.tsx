import { useId } from 'react';
import type { SceneObject } from '@/lib/editor-types';
import type { ShapeDef } from '@/lib/shapes/types';

interface Props {
  def: ShapeDef;
  object: SceneObject;
  bend: number;
}

const SLICES = 48;
const OVERLAP = 0.4;

/**
 * Гнёт элемент по дуге: фигура режется на вертикальные полосы,
 * каждая ставится на свою точку дуги и поворачивается по касательной.
 * Расчёт идёт в мировых координатах объекта, поэтому неквадратные
 * элементы не перекашивает.
 */
const BentShape = ({ def, object, bend }: Props) => {
  const uid = useId().replace(/:/g, '');
  const { width: w, height: h } = object;

  /* дуга не может быть круче, чем позволяет толщина элемента */
  const maxRad = (1.9 * w) / Math.max(h, 1);
  const rad = Math.max(-maxRad, Math.min(maxRad, (bend * Math.PI) / 180));
  const R = w / rad;
  const arcCy = h / 2 + R;

  const half = Math.abs(rad) / 2;
  const shift = (R * (1 - Math.cos(half))) / 2;

  const content = def.render(object);
  const sw = w / 100;
  const sh = h / 100;

  return (
    <g transform={`scale(${1 / sw} ${1 / sh}) translate(0 ${shift})`}>
      <defs>
        {Array.from({ length: SLICES }).map((_, i) => (
          <clipPath key={i} id={`${uid}-c${i}`} clipPathUnits="userSpaceOnUse">
            <rect
              x={(i * 100) / SLICES - OVERLAP}
              y={-500}
              width={100 / SLICES + OVERLAP * 2}
              height={1100}
            />
          </clipPath>
        ))}
      </defs>
      {Array.from({ length: SLICES }).map((_, i) => {
        const xm = ((i + 0.5) * w) / SLICES;
        const t = (xm - w / 2) / R;
        const px = w / 2 + R * Math.sin(t);
        const py = arcCy - R * Math.cos(t);
        const deg = (t * 180) / Math.PI;
        return (
          <g
            key={i}
            transform={`translate(${px} ${py}) rotate(${deg}) translate(${-xm} ${-h / 2}) scale(${sw} ${sh})`}
          >
            <g clipPath={`url(#${uid}-c${i})`}>{content}</g>
          </g>
        );
      })}
    </g>
  );
};

export default BentShape;
