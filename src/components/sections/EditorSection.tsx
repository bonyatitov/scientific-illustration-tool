import { useCallback, useEffect, useState } from 'react';
import { useEditor } from '@/hooks/use-editor';
import EditorToolbar from '@/components/editor/EditorToolbar';
import LibraryPanel from '@/components/editor/LibraryPanel';
import EditorCanvas from '@/components/editor/EditorCanvas';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import Icon from '@/components/ui/icon';

const EditorSection = () => {
  const editor = useEditor();
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => setFullscreen((v) => !v), []);

  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !editor.selectedId) setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [fullscreen, editor.selectedId]);

  const shell = fullscreen
    ? 'fixed inset-0 z-50 flex flex-col border-0 bg-card'
    : 'mx-6 mb-16 flex h-[760px] flex-col border border-border bg-card md:mx-12';

  return (
    <section id="canvas" className="border-t border-border bg-background">
      <div className="flex items-end justify-between gap-6 px-6 py-12 md:px-12">
        <div>
          <p className="rule-label">Раздел 01 — рабочее место</p>
          <h2 className="mt-4 max-w-xl font-head text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-5xl">
            Холст. Прямо здесь,
            <br />
            без установки
          </h2>
        </div>
        <p className="hidden max-w-[280px] text-sm leading-relaxed text-muted-foreground md:block">
          Кликните элемент слева — он встанет в центр. Тяните мышью, крутите за верхнюю ручку, меняйте цвет справа.
        </p>
      </div>

      <div className={shell}>
        <EditorToolbar editor={editor} fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} />
        <div className="flex min-h-0 flex-1">
          <div className="hidden md:flex">
            <LibraryPanel onAdd={editor.addShape} />
          </div>
          <div className="min-w-0 flex-1">
            <EditorCanvas editor={editor} />
          </div>
          <div className="hidden lg:flex">
            <PropertiesPanel editor={editor} />
          </div>
        </div>
        <div className="flex h-9 shrink-0 items-center gap-5 border-t border-border px-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Icon name="MousePointer2" size={11} /> Тянуть — перемещение
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Icon name="ZoomIn" size={11} /> Колесо — зум
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <Icon name="Hand" size={11} /> Пробел — панорама
          </span>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Icon name="Delete" size={11} /> Del — удалить
          </span>
          <span className="hidden items-center gap-1.5 xl:flex">
            <Icon name="FilePlus2" size={11} /> Перетащите SVG — импорт
          </span>
          {fullscreen && (
            <span className="flex items-center gap-1.5 text-primary">
              <Icon name="Minimize2" size={11} /> Esc — свернуть
            </span>
          )}
        </div>
      </div>

      <div className="mx-6 mb-16 border border-border border-dashed p-6 text-sm leading-relaxed text-muted-foreground md:hidden">
        Библиотека и панель свойств доступны на экране шириной от 1024 px — на телефоне холст работает в режиме просмотра.
      </div>
    </section>
  );
};

export default EditorSection;