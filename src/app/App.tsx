import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ProductForm } from './components/ProductForm';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('products');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedNotice, setShowSavedNotice] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [productName, setProductName] = useState('Smartphone Galaxy S24');
  const [slug, setSlug] = useState('smartphone-galaxy-s24');
  const [sku, setSku] = useState('PROD-001');
  const [barcode, setBarcode] = useState('7891234567890');
  const [fiscalClass, setFiscalClass] = useState('NCM 8517.12.31');
  const [price, setPrice] = useState('3.499,00');
  const [promoPrice, setPromoPrice] = useState('2.999,00');
  const [promoEnabled, setPromoEnabled] = useState(true);
  const [shortDescription, setShortDescription] = useState(
    'Smartphone Samsung Galaxy S24 com 256GB de armazenamento.',
  );
  const [fullDescription, setFullDescription] = useState(
    'O Samsung Galaxy S24 combina desempenho de ponta com um design elegante. Equipado com processador Snapdragon 8 Gen 3, camera tripla de alta resolucao, tela Dynamic AMOLED 2X de 6.2" e bateria de longa duracao.',
  );

  const [isActive, setIsActive] = useState(true);
  const [controlStock, setControlStock] = useState(true);
  const [quantity, setQuantity] = useState('25');
  const [minQuantity, setMinQuantity] = useState('5');
  const [categories, setCategories] = useState<string[]>(['Eletrônicos', 'Smartphones']);

  const requiredFields = [
    { label: 'Nome do produto', value: productName },
    { label: 'Slug', value: slug },
    { label: 'SKU', value: sku },
    { label: 'Preço de venda', value: price },
    { label: 'Resumo curto', value: shortDescription },
    { label: 'Descrição completa', value: fullDescription },
    { label: 'Categoria', value: categories.length > 0 ? 'selected' : '' },
    { label: 'Quantidade em estoque', value: controlStock ? quantity : 'stock-disabled' },
    { label: 'Alerta mínimo', value: controlStock ? minQuantity : 'stock-disabled' },
  ];
  const pendingRequiredFields = requiredFields
    .filter((field) => !field.value)
    .map((field) => field.label);
  const completedRequiredFields = requiredFields.length - pendingRequiredFields.length;
  const requiredProgress = Math.round((completedRequiredFields / requiredFields.length) * 100);
  const stock = Number(quantity);
  const minStock = Number(minQuantity);
  const hasLowStock = controlStock && stock > 0 && minStock > 0 && stock <= minStock;
  const canSave = completedRequiredFields === requiredFields.length && !isSaving;

  useEffect(() => {
    if (!hasLowStock) {
      return;
    }

    toast.warning('Estoque baixo', {
      description: `Restam ${stock} unidades em estoque.`,
    });
  }, [hasLowStock, stock]);

  const handleSaveProduct = async () => {
    if (!canSave) {
      toast.error('Campo obrigatório', {
        description: 'Preencha os campos obrigatórios antes de salvar.',
      });
      return;
    }

    setShowSavedNotice(false);
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSavedNotice(true);

    toast.success('Produto salvo com sucesso!', {
      description: 'As alterações foram aplicadas.',
    });
  };

  return (
    <div className="min-h-screen bg-[#090d14] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[18%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute right-[-8rem] top-10 h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[12%] top-28 h-64 w-64 rounded-full border border-emerald-400/10" />
      </div>

      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: '#132619',
            border: '1px solid rgba(74, 222, 128, 0.25)',
            color: '#f8fafc',
          },
        }}
      />

      <div className="relative flex min-h-screen">
        <Sidebar
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
          mobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="ml-0 flex min-h-screen min-w-0 flex-1 flex-col xl:ml-[252px]">
          <Topbar onOpenMenu={() => setIsMobileMenuOpen(true)} />

          <main className="flex-1 overflow-y-auto px-3 pb-6 pt-3 sm:px-4 lg:px-6">
            <div className="mx-auto flex max-w-[1480px] flex-col gap-5 2xl:flex-row">
              <div className="min-w-0 flex-1">
                <ProductForm
                  productName={productName}
                  onProductNameChange={setProductName}
                  slug={slug}
                  onSlugChange={setSlug}
                  sku={sku}
                  onSkuChange={setSku}
                  barcode={barcode}
                  onBarcodeChange={setBarcode}
                  fiscalClass={fiscalClass}
                  onFiscalClassChange={setFiscalClass}
                  price={price}
                  onPriceChange={setPrice}
                  promoEnabled={promoEnabled}
                  onPromoEnabledChange={setPromoEnabled}
                  promoPrice={promoPrice}
                  onPromoPriceChange={setPromoPrice}
                  shortDescription={shortDescription}
                  onShortDescriptionChange={setShortDescription}
                  fullDescription={fullDescription}
                  onFullDescriptionChange={setFullDescription}
                />
              </div>

              <RightPanel
                isActive={isActive}
                onActiveChange={setIsActive}
                controlStock={controlStock}
                onControlStockChange={setControlStock}
                quantity={quantity}
                onQuantityChange={setQuantity}
                minQuantity={minQuantity}
                onMinQuantityChange={setMinQuantity}
                categories={categories}
                onCategoriesChange={setCategories}
                onSave={handleSaveProduct}
                isSaving={isSaving}
                canSave={canSave}
                showSavedNotice={showSavedNotice}
                onDismissSavedNotice={() => setShowSavedNotice(false)}
                completedRequiredFields={completedRequiredFields}
                totalRequiredFields={requiredFields.length}
                requiredProgress={requiredProgress}
                pendingRequiredFields={pendingRequiredFields}
                hasLowStock={hasLowStock}
              />
            </div>
          </main>
        </div>
      </div>

      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050a]/70 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151b24] px-5 py-4 shadow-2xl shadow-black/30">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            <span className="text-sm font-medium text-slate-100">Salvando produto...</span>
          </div>
        </div>
      )}
    </div>
  );
}
