import { AlertTriangle } from 'lucide-react';

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
  onCategoriesChange
}: RightPanelProps) {
  const availableCategories = [
    'Eletrônicos',
    'Roupas',
    'Alimentos',
    'Livros',
    'Casa e decoração',
    'Esportes'
  ];

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      onCategoriesChange(categories.filter(c => c !== category));
    } else {
      onCategoriesChange([...categories, category]);
    }
  };

  const showLowStockWarning = controlStock && parseInt(quantity) <= parseInt(minQuantity);

  return (
    <div className="w-72 space-y-3">
      {/* Status do produto */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-white">
          Status do produto
        </h3>

        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => onActiveChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-700 rounded-full peer-checked:bg-teal-500 transition-all"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
          <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
            Produto ativo
          </span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={controlStock}
              onChange={(e) => onControlStockChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-700 rounded-full peer-checked:bg-teal-500 transition-all"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
          <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
            Controlar estoque
          </span>
        </label>
      </div>

      {/* Estoque */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-white">Estoque</h3>

        {showLowStockWarning && (
          <div className="flex items-start gap-1.5 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-400">Estoque abaixo do nível mínimo</p>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-300">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[#0f0f0f] border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 rounded-lg text-white focus:outline-none transition-all"
            disabled={!controlStock}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-300">Alerta mínimo</label>
          <input
            type="number"
            value={minQuantity}
            onChange={(e) => onMinQuantityChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[#0f0f0f] border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 rounded-lg text-white focus:outline-none transition-all"
            disabled={!controlStock}
          />
        </div>
      </div>

      {/* Categorias */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-white">Categorias</h3>

        <div className="space-y-1.5">
          {availableCategories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 bg-[#0f0f0f] border-2 border-gray-700 rounded checked:bg-teal-500 checked:border-teal-500 cursor-pointer transition-all"
              />
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>

        <button className="w-full mt-2 px-3 py-2 text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors text-left">
          + Adicionar categoria
        </button>
      </div>

      {/* Botão salvar */}
      <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/20">
        Salvar produto
      </button>
    </div>
  );
}
