import {
  LayoutDashboard,
  FolderTree,
  Package,
  ShoppingCart,
  Warehouse,
  Settings,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
    { id: 'categories', label: 'Categorias', icon: FolderTree },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'stock', label: 'Estoque', icon: Warehouse },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-56 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">E-commerce</h1>
            <p className="text-xs text-gray-500">Painel administrativo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? 'bg-teal-500/15 text-teal-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin</p>
            <p className="text-xs text-purple-400">Disponível</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
