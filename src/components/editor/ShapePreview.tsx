import type { ShapeDef } from '@/lib/shapes/types';
import type { SceneObject } from '@/lib/editor-types';
import ObjectView from './ObjectView';

interface Props {
  def: ShapeDef;
  className?: string;
}

/** Миниатюра элемента для библиотеки — учитывает стартовый изгиб. */
const ShapePreview = ({ def, className }: Props) => {
  const bend = def.defaultBend ?? 0;

  if (!bend) {
    const flat: SceneObject = {
      id: 'p',
      shapeId: def.id,
      label: def.label,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
      fill: def.defaultFill,
      stroke: def.defaultStroke,
      strokeWidth: 2,
      opacity: 1,
    };
    return (
      <svg viewBox="-6 -6 112 112" className={className}>
        {def.render(flat)}
      </svg>
    );
  }

  const w = def.defaultWidth;
  const h = def.defaultHeight;
  const obj: SceneObject = {
    id: 'p',
    shapeId: def.id,
    label: def.label,
    x: 0,
    y: 0,
    width: w,
    height: h,
    rotation: 0,
    fill: def.defaultFill,
    stroke: def.defaultStroke,
    strokeWidth: 2,
    opacity: 1,
    bend,
  };

  const rad = (bend * Math.PI) / 180;
  const R = Math.abs(w / rad);
  const pad = R + h;
  const box = Math.max(w, R * 2 + h * 2) + h;

  return (
    <svg viewBox={`${w / 2 - box / 2} ${h / 2 - box / 2 + (rad > 0 ? pad / 2 : -pad / 2)} ${box} ${box}`} className={className}>
      <ObjectView object={obj} />
    </svg>
  );
};

export default ShapePreview;
