import { SHAPE_MAP } from '@/lib/shape-library';
import BentShape from './BentShape';
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

  if (def.isImported) {
    const b = object.bend ?? 0;
    return (
      <g transform={outer} opacity={object.opacity}>
        <g transform={`scale(${object.width / 100} ${object.height / 100})`}>
          {Math.abs(b) < 1 ? (
            <g dangerouslySetInnerHTML={{ __html: object.svg ?? '' }} />
          ) : (
            <BentShape
              def={{ ...def, render: () => <g dangerouslySetInnerHTML={{ __html: object.svg ?? '' }} /> }}
              object={object}
              bend={b}
            />
          )}
        </g>
      </g>
    );
  }

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

  const bend = object.bend ?? 0;

  return (
    <g transform={outer} opacity={object.opacity}>
      <g transform={`scale(${object.width / 100} ${object.height / 100})`}>
        {Math.abs(bend) < 1 ? def.render(object) : <BentShape def={def} object={object} bend={bend} />}
      </g>
    </g>
  );
};

export default ObjectView;