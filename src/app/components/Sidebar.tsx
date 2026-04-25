import {
  Box,
  ChartColumn,
  ChevronDown,
  CreditCard,
  FileBarChart2,
  Headphones,
  LayoutDashboard,
  Package,
  Settings,
  Tag,
  Users,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({
  activeMenu,
  onMenuChange,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
    { id: 'categories', label: 'Categorias', icon: Box },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'orders', label: 'Pedidos', icon: CreditCard },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'stock', label: 'Estoque', icon: Package },
    { id: 'reports', label: 'Relatórios', icon: FileBarChart2 },
    { id: 'coupons', label: 'Cupons', icon: Tag },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleMenuChange = (menu: string) => {
    onMenuChange(menu);
    onMobileClose?.();
  };

  const renderMenuItems = () => (
    <div className="space-y-1.5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeMenu === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleMenuChange(item.id)}
            className={[
              'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition',
              isActive
                ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                : 'text-slate-400 hover:bg-white/[0.03] hover:text-white',
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  const renderBrand = () => (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10">
        <ChartColumn className="h-5 w-5 text-emerald-400" />
      </div>
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-white">
          E-commerce
        </div>
        <p className="mt-1 text-sm text-slate-400">Painel administrativo</p>
      </div>
    </div>
  );

  const renderFooter = () => (
    <>
      <div className="mb-5 rounded-2xl border border-white/10 bg-[#101722] p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
          <Headphones className="h-4 w-4 text-slate-200" />
        </div>
        <p className="text-sm font-semibold text-white">Precisa de ajuda?</p>
        <p className="mt-1 text-sm text-slate-400">Fale com o suporte</p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151c28] px-4 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-400 text-sm font-semibold text-white">
          AD
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">Admin User</p>
          <p className="truncate text-xs text-slate-400">admin@store.com</p>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </div>
    </>
  );

  return (
    <>
    <aside className="fixed inset-y-0 left-0 hidden w-[252px] shrink-0 border-r border-white/8 bg-[#0a0f17] xl:flex xl:flex-col">
      <div className="border-b border-white/8 px-7 py-7">
        {renderBrand()}
      </div>

      <nav className="flex-1 px-4 pt-6">
        {renderMenuItems()}
      </nav>

      <div className="mt-auto px-4 pb-4 pt-8">
        {renderFooter()}
      </div>
    </aside>

    {mobileOpen ? (
      <div className="fixed inset-0 z-50 xl:hidden">
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onMobileClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <aside className="relative ml-auto flex h-full w-[min(18rem,82vw)] flex-col border-l border-white/10 bg-[#0a0f17] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-5">
            <div>
              <p className="text-lg font-semibold text-white">Menu</p>
              <p className="mt-1 text-sm text-slate-400">Navegação principal</p>
            </div>
            <button
              type="button"
              onClick={onMobileClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.06]"
              aria-label="Fechar menu de navegação"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-5">{renderMenuItems()}</nav>
        </aside>
      </div>
    ) : null}
    </>
  );
}
