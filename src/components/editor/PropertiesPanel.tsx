import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { SHAPE_MAP } from '@/lib/shape-library';
import type { EditorApi } from '@/hooks/use-editor';

interface Props {
  editor: EditorApi;
}

const SWATCHES = ['#d8ff3e', '#8fb8ff', '#67d2c4', '#f0c274', '#e2645f', '#a882d8', '#edeff2', '#3e4a5c', '#171e28', 'none'];

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

const NumInput = ({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) => (
  <div className="flex items-center border border-border bg-background focus-within:border-primary">
    <input
      type="number"
      value={Math.round(value)}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-8 w-[62px] bg-transparent px-2 text-right text-sm tabular-nums text-foreground outline-none"
    />
    {suffix && <span className="pr-2 text-[10px] text-muted-foreground">{suffix}</span>}
  </div>
);

const ColorField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const isNone = value === 'none' || !value;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="relative h-8 w-8 shrink-0 cursor-pointer border border-border">
          <span
            className="absolute inset-0"
            style={{
              background: isNone
                ? 'repeating-conic-gradient(#2c3547 0% 25%, #171e28 0% 50%) 50%/8px 8px'
                : value,
            }}
          />
          <input
            type="color"
            value={isNone ? '#1f2937' : value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 min-w-0 flex-1 border border-border bg-background px-2 text-xs uppercase text-foreground outline-none focus:border-primary"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            title={c}
            className={`h-5 w-5 border transition-transform hover:scale-110 ${
              value === c ? 'border-primary' : 'border-border'
            }`}
            style={{
              background:
                c === 'none'
                  ? 'repeating-conic-gradient(#2c3547 0% 25%, #171e28 0% 50%) 50%/6px 6px'
                  : c,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const PropertiesPanel = ({ editor }: Props) => {
  const { selected, objects, updateObject, removeObject, duplicateObject, moveLayer, setSelectedId } = editor;

  if (!selected) {
    return (
      <aside className="flex h-full w-[286px] shrink-0 flex-col border-l border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <p className="rule-label">Свойства</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <Icon name="MousePointerClick" size={26} className="text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ничего не выбрано. Кликните по объекту на холсте, чтобы поменять размер, цвет и слой.
          </p>
        </div>
        <div className="border-t border-border px-4 py-3">
          <p className="rule-label mb-2">Слои · {objects.length}</p>
          <LayerList editor={editor} />
        </div>
      </aside>
    );
  }

  const def = SHAPE_MAP[selected.shapeId];
  const index = objects.findIndex((o) => o.id === selected.id);

  return (
    <aside className="flex h-full w-[286px] shrink-0 flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="rule-label">Свойства</p>
          <p className="mt-0.5 truncate font-head text-sm font-light text-foreground">{selected.label}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Снять выделение"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-4">
        <div className="py-1">
          <Row label="Позиция">
            <NumInput value={selected.x} onChange={(v) => updateObject(selected.id, { x: v })} suffix="X" />
            <NumInput value={selected.y} onChange={(v) => updateObject(selected.id, { y: v })} suffix="Y" />
          </Row>
          <Row label="Размер">
            <NumInput value={selected.width} onChange={(v) => updateObject(selected.id, { width: Math.max(16, v) })} suffix="Ш" />
            <NumInput value={selected.height} onChange={(v) => updateObject(selected.id, { height: Math.max(16, v) })} suffix="В" />
          </Row>
        </div>

        <div className="py-3">
          <Row label="Поворот">
            <NumInput value={selected.rotation} onChange={(v) => updateObject(selected.id, { rotation: ((v % 360) + 360) % 360 })} suffix="°" />
          </Row>
          <Slider
            value={[selected.rotation]}
            min={0}
            max={359}
            step={1}
            onValueChange={([v]) => updateObject(selected.id, { rotation: v })}
            className="mt-1"
          />
          <div className="mt-3 flex gap-1">
            {[0, 45, 90, 180, 270].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => updateObject(selected.id, { rotation: a })}
                className="flex-1 border border-border py-1 text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {a}°
              </button>
            ))}
          </div>
        </div>

        {!def?.isText && (
          <div className="py-3">
            <Row label="Изгиб">
              <NumInput
                value={selected.bend ?? 0}
                onChange={(v) => updateObject(selected.id, { bend: Math.max(-350, Math.min(350, v)) })}
                suffix="°"
              />
            </Row>
            <Slider
              value={[selected.bend ?? 0]}
              min={-350}
              max={350}
              step={1}
              onValueChange={([v]) => updateObject(selected.id, { bend: v })}
              className="mt-1"
            />
            <div className="mt-3 flex gap-1">
              {[
                { v: -180, t: '⌒' },
                { v: -90, t: '◜' },
                { v: 0, t: '—' },
                { v: 90, t: '◟' },
                { v: 180, t: '⌣' },
                { v: 350, t: '◯' },
              ].map((b) => (
                <button
                  key={b.v}
                  type="button"
                  onClick={() => updateObject(selected.id, { bend: b.v })}
                  title={b.v === 0 ? 'Без изгиба' : `${b.v}°`}
                  className={`flex-1 border py-1 text-[13px] leading-none transition-colors hover:border-primary hover:text-foreground ${
                    (selected.bend ?? 0) === b.v ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                  }`}
                >
                  {b.t}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              Гнёт элемент по дуге — например бислой вокруг клетки.
            </p>
          </div>
        )}

        {def?.isText && (
          <div className="space-y-2 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Текст</p>
            <textarea
              value={selected.text ?? ''}
              onChange={(e) => updateObject(selected.id, { text: e.target.value })}
              rows={2}
              className="w-full resize-none border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary"
            />
            <Row label="Кегль">
              <NumInput
                value={selected.fontSize ?? 20}
                onChange={(v) => updateObject(selected.id, { fontSize: Math.max(8, v) })}
                suffix="px"
              />
            </Row>
          </div>
        )}

        {def?.isImported && (
          <div className="space-y-2 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Импортированный рисунок</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Цвета заданы в исходном файле. Меняйте размер, поворот и прозрачность — пропорции сохраняются при
              равномерном масштабировании.
            </p>
          </div>
        )}

        {!def?.isImported && (
          <div className="space-y-2 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {def?.isText ? 'Цвет текста' : 'Заливка'}
            </p>
            <ColorField value={selected.fill} onChange={(v) => updateObject(selected.id, { fill: v })} />
          </div>
        )}

        {!def?.isText && !def?.isImported && (
          <div className="space-y-2 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Обводка</p>
            <ColorField value={selected.stroke} onChange={(v) => updateObject(selected.id, { stroke: v })} />
            <Row label="Толщина">
              <NumInput
                value={selected.strokeWidth}
                onChange={(v) => updateObject(selected.id, { strokeWidth: Math.max(0, v) })}
                suffix="px"
              />
            </Row>
          </div>
        )}

        <div className="py-3">
          <Row label="Прозрачность">
            <span className="text-sm tabular-nums text-foreground">{Math.round(selected.opacity * 100)}%</span>
          </Row>
          <Slider
            value={[selected.opacity * 100]}
            min={10}
            max={100}
            step={1}
            onValueChange={([v]) => updateObject(selected.id, { opacity: v / 100 })}
          />
        </div>

        <div className="py-3">
          <Row label={`Слой ${index + 1} / ${objects.length}`}>{null}</Row>
          <div className="grid grid-cols-4 gap-1">
            {([
              { d: 'bottom', i: 'ChevronsDown', t: 'В самый низ' },
              { d: 'down', i: 'ChevronDown', t: 'Опустить' },
              { d: 'up', i: 'ChevronUp', t: 'Поднять' },
              { d: 'top', i: 'ChevronsUp', t: 'В самый верх' },
            ] as const).map((b) => (
              <button
                key={b.d}
                type="button"
                title={b.t}
                onClick={() => moveLayer(selected.id, b.d)}
                className="flex h-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <Icon name={b.i} size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 py-3">
          <button
            type="button"
            onClick={() => duplicateObject(selected.id)}
            className="flex h-9 flex-1 items-center justify-center gap-2 border border-border text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <Icon name="Copy" size={14} /> Дубль
          </button>
          <button
            type="button"
            onClick={() => removeObject(selected.id)}
            className="flex h-9 flex-1 items-center justify-center gap-2 border border-destructive/60 text-xs uppercase tracking-[0.1em] text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <Icon name="Trash2" size={14} /> Удалить
          </button>
        </div>
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="rule-label mb-2">Слои · {objects.length}</p>
        <LayerList editor={editor} />
      </div>
    </aside>
  );
};

const LayerList = ({ editor }: Props) => {
  const { objects, selectedId, setSelectedId } = editor;
  if (!objects.length) {
    return <p className="text-xs text-muted-foreground">Пока пусто</p>;
  }
  return (
    <div className="max-h-32 space-y-px overflow-y-auto">
      {[...objects].reverse().map((o, i) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setSelectedId(o.id)}
          className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors ${
            selectedId === o.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          <span className="tabular-nums opacity-60">{objects.length - i}</span>
          <span className="truncate">{o.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PropertiesPanel;