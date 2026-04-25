import { Bell, ChevronDown, Eye, Home, Menu } from 'lucide-react';

interface TopbarProps {
  onOpenMenu: () => void;
}

export function Topbar({ onOpenMenu }: TopbarProps) {
  return (
    <header className="relative border-b border-white/8 bg-[#0a0f17]/95 backdrop-blur-xl">
      <button
        type="button"
        onClick={onOpenMenu}
        className="absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06] sm:hidden"
        aria-label="Abrir menu de navegação"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="mx-auto flex max-w-[1480px] flex-col gap-4 px-3 py-4 sm:px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:px-6 lg:py-5">
        <div className="min-w-0 flex-1 pr-14 sm:pr-0">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <Home className="h-4 w-4 text-slate-500" />
            <span>Dashboard</span>
            <span className="text-slate-600">›</span>
            <span>Produtos</span>
            <span className="text-slate-600">›</span>
            <span className="font-medium text-slate-100">Cadastro de produtos</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Cadastro de produtos
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">
            Preencha as informações para cadastrar um novo produto na sua loja.
          </p>
        </div>

        <div className="flex flex-nowrap items-center gap-3 lg:max-w-[420px] lg:justify-end">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.06] sm:h-12"
          >
            <Eye className="h-4 w-4 text-slate-300" />
            Ver loja
          </button>

          <button
            type="button"
            aria-label="Abrir notificações"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 sm:h-12 sm:w-12"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            aria-label="Abrir menu do usuário"
            className="flex h-11 w-11 min-w-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white sm:h-auto sm:w-auto sm:justify-start sm:gap-3 sm:px-3 sm:py-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-400 text-sm font-semibold text-white">
              AD
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-medium text-white">Admin User</p>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          <button
            type="button"
            onClick={onOpenMenu}
            className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06] sm:flex sm:h-12 sm:w-12 xl:hidden"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
