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
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
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

  return (
    <aside className="hidden w-[252px] shrink-0 border-r border-white/8 bg-[#0a0f17] xl:flex xl:flex-col">
      <div className="border-b border-white/8 px-7 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10">
            <ChartColumn className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white">
              E-commerce
            </h2>
            <p className="mt-1 text-sm text-slate-400">Painel administrativo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onMenuChange(item.id)}
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
      </nav>

      <div className="px-4 pb-5">
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
      </div>
    </aside>
  );
}
