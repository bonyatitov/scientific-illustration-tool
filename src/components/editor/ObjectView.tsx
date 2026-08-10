import { SHAPE_MAP } from '@/lib/shape-library';
import type { SceneObject } from '@/lib/editor-types';

interface Props {
  object: SceneObject;
}

/** Единая отрисовка объекта — используется и на холсте, и при экспорте. */
const ObjectView = ({ object }: Props) => {
  const def = SHAPE_MAP[object.shapeId];
  if (!def) return null;

  const cx = object.width / 2;
  const cy = object.height / 2;
  const outer = `translate(${object.x} ${object.y}) rotate(${object.rotation} ${cx} ${cy})`;

  if (def.isText) {
    const size = object.fontSize ?? 20;
    return (
      <g transform={outer} opacity={object.opacity}>
        <text
          x={0}
          y={object.height / 2}
          dominantBaseline="middle"
          fill={object.fill}
          fontFamily="Inter, sans-serif"
          fontSize={size}
          fontWeight={size >= 30 ? 500 : 400}
        >
          {object.text ?? ''}
        </text>
      </g>
    );
  }

  return (
    <g transform={outer} opacity={object.opacity}>
      <g transform={`scale(${object.width / 100} ${object.height / 100})`}>
        {def.render(object)}
      </g>
    </g>
  );
};

export default ObjectView;
