import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportPng, exportSvg } from '@/lib/export-canvas';
import type { EditorApi } from '@/hooks/use-editor';

interface Props {
  editor: EditorApi;
}

const btn =
  'flex h-9 items-center gap-2 border border-border px-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground';

const EditorToolbar = ({ editor }: Props) => {
  const { objects, svgRef, saveProject, loadProject, clearCanvas, hasSaved, savedAt } = editor;
  const [confirmClear, setConfirmClear] = useState(false);
  const [transparent, setTransparent] = useState(false);

  const empty = objects.length === 0;

  const doPng = async () => {
    try {
      await exportPng(svgRef.current, objects, transparent, 2);
      toast.success('PNG сохранён', { description: 'Файл ушёл в загрузки браузера.' });
    } catch {
      toast.error('Не удалось собрать PNG');
    }
  };

  const doSvg = () => {
    exportSvg(svgRef.current, objects, transparent);
    toast.success('SVG сохранён', { description: 'Вектор готов для статьи.' });
  };

  const doSave = () => {
    saveProject();
    toast.success('Проект сохранён', { description: `${objects.length} объектов в памяти браузера.` });
  };

  const doLoad = () => {
    const res = loadProject();
    if (res) toast.success('Проект загружен', { description: `${res.objects.length} объектов восстановлено.` });
    else toast.error('Сохранённых проектов не найдено');
  };

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <a href="#top" className="flex items-baseline gap-2">
          <b className="font-head text-base font-normal tracking-[-0.03em] text-foreground">Нуклеотоша</b>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            редактор схем
          </span>
        </a>
        <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
        <span className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:inline">
          {objects.length} объектов
          {savedAt && ` · сохранено ${new Date(savedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className={btn} onClick={doSave} disabled={empty}>
          <Icon name="Save" size={14} />
          <span className="hidden lg:inline">Сохранить</span>
        </button>
        <button type="button" className={btn} onClick={doLoad} disabled={!hasSaved}>
          <Icon name="FolderOpen" size={14} />
          <span className="hidden lg:inline">Загрузить</span>
        </button>
        <button type="button" className={btn} onClick={() => setConfirmClear(true)} disabled={empty}>
          <Icon name="Eraser" size={14} />
          <span className="hidden lg:inline">Очистить</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              disabled={empty}
              className="flex h-9 items-center gap-2 bg-primary px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Icon name="Download" size={14} /> Экспорт
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Выгрузить схему
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={doPng} className="gap-2">
              <Icon name="Image" size={15} /> PNG · 2×
            </DropdownMenuItem>
            <DropdownMenuItem onClick={doSvg} className="gap-2">
              <Icon name="FileCode2" size={15} /> SVG · вектор
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setTransparent((v) => !v);
              }}
              className="gap-2"
            >
              <Icon name={transparent ? 'CheckSquare' : 'Square'} size={15} />
              Прозрачный фон
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-head font-light">Очистить холст?</AlertDialogTitle>
            <AlertDialogDescription>
              Все {objects.length} объектов будут удалены. Сохранённый в браузере проект останется на месте — его можно будет загрузить обратно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearCanvas();
                toast('Холст очищен');
              }}
            >
              Очистить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditorToolbar;
