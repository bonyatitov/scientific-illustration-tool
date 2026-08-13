import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const CtaSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[a-zа-я]{2,}$/i.test(email.trim());
    if (!ok) {
      setError('Похоже на опечатку — проверьте адрес');
      return;
    }
    setError('');
    setSent(true);
    toast.success('Записали', { description: 'Напишем, когда откроем «Лабораторию».' });
  };

  return (
    <section id="cta" className="relative overflow-hidden border-t border-border bg-background px-6 py-24 md:px-12 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--hero-x-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-x-grid) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(100% 80% at 20% 50%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(100% 80% at 20% 50%, #000 20%, transparent 75%)',
        }}
      />
      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="rule-label flex items-center gap-3">
            <i className="block h-px w-6 bg-primary" />
            Дальше
          </p>
          <h2 className="mt-6 font-head text-4xl font-light leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
            Откройте холст
            <br />
            <span className="text-primary">и просто начните</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Регистрации нет, туториала нет. Есть библиотека слева, свойства справа и десять минут до готовой схемы.
          </p>
          <a
            href="#canvas"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#canvas')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-10 inline-flex h-14 items-center gap-3 bg-primary px-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Собрать первую схему
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>

        <div className="border border-border bg-card p-8">
          <p className="rule-label">Лист ожидания «Лаборатории»</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Пришлём одно письмо, когда появятся неограниченные проекты и свои элементы.
            Художники — оставляйте адрес здесь же, ответим лично.
          </p>
          {sent ? (
            <div className="mt-8 flex items-center gap-3 border border-primary/40 bg-primary/10 px-4 py-4">
              <Icon name="Check" size={18} className="text-primary" />
              <span className="text-sm text-foreground">Адрес записан. Спасибо.</span>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8" noValidate>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@university.ru"
                  className={`h-12 flex-1 border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary ${
                    error ? 'border-destructive' : 'border-border'
                  }`}
                />
                <button
                  type="submit"
                  className="h-12 bg-primary px-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Записаться
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
              <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Без рассылок и рекламы
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;