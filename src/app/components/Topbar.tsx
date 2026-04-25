import { Eye, LogOut, Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-14 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-5">
      <div>
        <h2 className="text-base font-bold text-white">Cadastro de produtos</h2>
        <p className="text-xs text-gray-500">Adicione e gerencie os produtos da sua loja</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Search className="w-4 h-4" />
        </button>

        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-700">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Ver loja</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all border border-red-500/30">
          <LogOut className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Sair</span>
        </button>
      </div>
    </header>
  );
}
