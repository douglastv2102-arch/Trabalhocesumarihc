import { Check, CheckCircle2, Info, Minus, Plus, Shield, TriangleAlert } from 'lucide-react';

interface RightPanelProps {
  isActive: boolean;
  onActiveChange: (value: boolean) => void;
  controlStock: boolean;
  onControlStockChange: (value: boolean) => void;
  quantity: string;
  onQuantityChange: (value: string) => void;
  minQuantity: string;
  onMinQuantityChange: (value: string) => void;
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onSave: () => void;
  isSaving: boolean;
  canSave: boolean;
  showSavedNotice: boolean;
  onDismissSavedNotice: () => void;
  completedRequiredFields: number;
  totalRequiredFields: number;
  requiredProgress: number;
  pendingRequiredFields: string[];
  hasLowStock: boolean;
}

function Panel({
  title,
  icon: Icon,
  children,
  action,
  titleAfter,
}: {
  title: string;
  icon: typeof Shield;
  children: React.ReactNode;
  action?: React.ReactNode;
  titleAfter?: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/8 bg-[#171d27]/92 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/8">
            <Icon className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">{title}</h2>
            {titleAfter}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <label className="flex items-start gap-4">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={title}
        className={[
          'relative mt-1 h-7 w-12 shrink-0 rounded-full transition',
          checked ? 'bg-emerald-400' : 'bg-slate-700',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-1 h-5 w-5 rounded-full bg-white transition',
            checked ? 'left-6' : 'left-1',
          ].join(' ')}
        />
      </button>
      <span className="min-w-0">
        <span className="block text-base font-medium text-white sm:text-lg">{title}</span>
        <span className="mt-1 block text-sm text-slate-400">{description}</span>
      </span>
    </label>
  );
}

export function RightPanel({
  isActive,
  onActiveChange,
  controlStock,
  onControlStockChange,
  quantity,
  onQuantityChange,
  minQuantity,
  onMinQuantityChange,
  categories,
  onCategoriesChange,
  onSave,
  isSaving,
  canSave,
  showSavedNotice,
  onDismissSavedNotice,
  completedRequiredFields,
  totalRequiredFields,
  requiredProgress,
  pendingRequiredFields,
  hasLowStock,
}: RightPanelProps) {
  const availableCategories = [
    'Eletrônicos',
    'Smartphones',
    'Acessórios',
    'Notebooks',
    'Casa e decoração',
    'Eletrodomésticos',
  ];

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      onCategoriesChange(categories.filter((item) => item !== category));
      return;
    }

    onCategoriesChange([...categories, category]);
  };

  const updateNumber = (
    currentValue: string,
    onChange: (value: string) => void,
    delta: number,
  ) => {
    const nextValue = Math.max(0, Number(currentValue || '0') + delta);
    onChange(String(nextValue));
  };

  return (
    <aside className="w-full shrink-0 space-y-5 2xl:w-[420px]">
      <div className="hidden rounded-3xl border border-white/10 bg-[#101722] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)] 2xl:block">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-300">Progresso do cadastro</p>
            <p className="mt-1 text-2xl font-semibold text-white">{requiredProgress}% completo</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
            {completedRequiredFields}/{totalRequiredFields}
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${requiredProgress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Campos obrigatórios completos antes da publicação.
        </p>
      </div>

      {showSavedNotice ? (
      <div className="hidden rounded-3xl border border-emerald-500/25 bg-[#14321f] p-5 text-white shadow-[0_18px_50px_rgba(16,185,129,0.08)] 2xl:block">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold sm:text-lg">Produto salvo com sucesso!</p>
            <p className="mt-1 text-sm text-emerald-100/75">As alterações foram aplicadas.</p>
          </div>
          <button
            type="button"
            onClick={onDismissSavedNotice}
            className="text-emerald-100/70 transition hover:text-white"
            aria-label="Fechar mensagem de sucesso"
          >
            ×
          </button>
        </div>
      </div>

      ) : null}

      <Panel title="Status do produto" icon={Shield}>
        <div className="space-y-6">
          <Toggle
            checked={isActive}
            onChange={onActiveChange}
            title="Produto ativo"
            description="O produto ficará visível na sua loja."
          />

          <Toggle
            checked={controlStock}
            onChange={onControlStockChange}
            title="Controlar estoque"
            description="Habilite para gerenciar o estoque."
          />
        </div>
      </Panel>

      <Panel title="Estoque" icon={TriangleAlert}>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
              <span id="stock-quantity-label">Quantidade em estoque</span> <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div
                className={[
                  'flex h-14 w-full items-center rounded-2xl border bg-[#131923] pl-4 pr-2 text-white transition sm:h-[3.75rem]',
                  controlStock
                    ? 'border-emerald-500/70 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/15'
                    : 'border-white/10 opacity-60',
                ].join(' ')}
              >
                <input
                  id="stock-quantity"
                  aria-labelledby="stock-quantity-label"
                  type="number"
                  value={quantity}
                  onChange={(event) => onQuantityChange(event.target.value)}
                  disabled={!controlStock}
                  className="w-full bg-transparent text-base text-white outline-none disabled:cursor-not-allowed disabled:text-slate-500 [appearance:textfield]"
                />

                <div className="ml-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateNumber(quantity, onQuantityChange, -1)}
                    disabled={!controlStock}
                    aria-label="Diminuir quantidade em estoque"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateNumber(quantity, onQuantityChange, 1)}
                    disabled={!controlStock}
                    aria-label="Aumentar quantidade em estoque"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
              <span id="minimum-stock-label">Alerta mínimo</span> <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div
                className={[
                  'flex h-14 w-full items-center rounded-2xl border bg-[#131923] pl-4 pr-2 text-white transition sm:h-[3.75rem]',
                  hasLowStock
                    ? 'border-amber-400/80 focus-within:border-amber-300 focus-within:ring-4 focus-within:ring-amber-500/15'
                    : 'border-white/10 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/15',
                  controlStock ? '' : 'opacity-60',
                ].join(' ')}
              >
                <input
                  id="minimum-stock"
                  aria-labelledby="minimum-stock-label"
                  type="number"
                  value={minQuantity}
                  onChange={(event) => onMinQuantityChange(event.target.value)}
                  disabled={!controlStock}
                  className="w-full bg-transparent text-base text-white outline-none disabled:cursor-not-allowed disabled:text-slate-500 [appearance:textfield]"
                />

                <div className="ml-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateNumber(minQuantity, onMinQuantityChange, -1)}
                    disabled={!controlStock}
                    aria-label="Diminuir alerta mínimo"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateNumber(minQuantity, onMinQuantityChange, 1)}
                    disabled={!controlStock}
                    aria-label="Aumentar alerta mínimo"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-300 transition hover:bg-amber-500/20"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
            </div>
          </div>

          {hasLowStock ? (
            <div className="flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm text-amber-300">
              <TriangleAlert className="h-4 w-4 shrink-0" />
              <span>Estoque baixo: restam {quantity} unidades.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-3 py-2 text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Estoque acima do alerta mínimo.</span>
            </div>
          )}
        </div>
      </Panel>

      <Panel
        title="Categorias"
        icon={Check}
        titleAfter={
          <span className="inline-flex items-center rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300">
            Obrigatório
          </span>
        }
        action={
          <button type="button" className="text-sm font-medium text-sky-400">
            Gerenciar categorias
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Selecione pelo menos uma categoria para organizar o produto na loja.
          </p>

          <div className="space-y-3">
            {availableCategories.map((category) => {
              const checked = categories.includes(category);

              return (
                <label key={category} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    aria-pressed={checked}
                    aria-label={`${checked ? 'Remover' : 'Selecionar'} categoria ${category}`}
                    className={[
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition',
                      checked
                        ? 'border-emerald-400 bg-emerald-400 text-[#0a0f17]'
                        : 'border-white/15 bg-transparent text-transparent',
                    ].join(' ')}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-base text-white sm:text-lg">{category}</span>
                </label>
              );
            })}
          </div>
        </div>
      </Panel>

      <div className="space-y-4 pt-1">
        <div className="rounded-3xl border border-white/10 bg-[#101722] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)] 2xl:hidden">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300">Progresso do cadastro</p>
              <p className="mt-1 text-2xl font-semibold text-white">{requiredProgress}% completo</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
              {completedRequiredFields}/{totalRequiredFields}
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${requiredProgress}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Campos obrigatórios completos antes da publicação.
          </p>
        </div>

        {showSavedNotice ? (
          <div className="rounded-3xl border border-emerald-500/25 bg-[#14321f] p-5 text-white shadow-[0_18px_50px_rgba(16,185,129,0.08)] 2xl:hidden">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold sm:text-lg">Produto salvo com sucesso!</p>
                <p className="mt-1 text-sm text-emerald-100/75">As alterações foram aplicadas.</p>
              </div>
              <button
                type="button"
                onClick={onDismissSavedNotice}
                className="text-emerald-100/70 transition hover:text-white"
                aria-label="Fechar mensagem de sucesso"
              >
                ×
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
          <button
            type="button"
            className="h-14 rounded-2xl border border-white/15 bg-transparent text-base font-medium text-white transition hover:bg-white/[0.03] sm:text-lg"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className={[
              'h-14 rounded-2xl text-base font-semibold text-white transition sm:text-lg',
              canSave
                ? 'bg-gradient-to-r from-emerald-500 to-green-400 hover:brightness-105'
                : 'cursor-not-allowed border border-white/10 bg-white/8 text-slate-500',
            ].join(' ')}
          >
            {isSaving ? 'Salvando...' : canSave ? 'Salvar produto' : 'Complete os obrigatórios'}
          </button>
        </div>

        {pendingRequiredFields.length > 0 ? (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            <div className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
              <TriangleAlert className="h-4 w-4 shrink-0" />
              <span>Itens que ainda precisam de atenção</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {pendingRequiredFields.map((field) => (
                <span
                  key={field}
                  className="rounded-full border border-amber-300/20 bg-[#1f1a10] px-3 py-1 text-xs font-medium text-amber-100"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <div className="flex items-center gap-2 font-semibold text-emerald-300">
              <Info className="h-4 w-4 shrink-0" />
              <span>Cadastro completo e pronto para salvar.</span>
            </div>
          </div>
        )}

        <p className="text-sm text-slate-500">Último salvamento: ainda não realizado nesta edição</p>
      </div>
    </aside>
  );
}
