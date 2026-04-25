import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ProductForm } from './components/ProductForm';
import { RightPanel } from './components/RightPanel';
import { Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('products');
  const [isSaving, setIsSaving] = useState(false);

  // Product form state
  const [productName, setProductName] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [fiscalClass, setFiscalClass] = useState('');
  const [price, setPrice] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');

  // Right panel state
  const [isActive, setIsActive] = useState(true);
  const [controlStock, setControlStock] = useState(false);
  const [quantity, setQuantity] = useState('0');
  const [minQuantity, setMinQuantity] = useState('5');
  const [categories, setCategories] = useState<string[]>([]);

  // Show low stock warning toast
  useEffect(() => {
    if (controlStock && parseInt(quantity) > 0 && parseInt(quantity) <= parseInt(minQuantity)) {
      toast.warning('Estoque baixo', {
        description: 'A quantidade em estoque está abaixo do nível mínimo.',
      });
    }
  }, [quantity, minQuantity, controlStock]);

  const handleSaveProduct = async () => {
    // Validate required fields
    if (!productName || !sku || !fullDescription) {
      toast.error('Campos obrigatórios', {
        description: 'Preencha todos os campos obrigatórios antes de salvar.',
      });
      return;
    }

    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSaving(false);
    toast.success('Produto salvo com sucesso', {
      description: 'As informações foram atualizadas no sistema.',
    });
  };

  return (
    <div className="size-full flex bg-[#0a0a0a]">
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            color: '#fff',
          },
        }}
      />

      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-3 flex gap-3 h-full">
            {/* Main content area */}
            <div className="flex-1 min-w-0">
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
                promoPrice={promoPrice}
                onPromoPriceChange={setPromoPrice}
                shortDescription={shortDescription}
                onShortDescriptionChange={setShortDescription}
                fullDescription={fullDescription}
                onFullDescriptionChange={setFullDescription}
                weight={weight}
                onWeightChange={setWeight}
                height={height}
                onHeightChange={setHeight}
                width={width}
                onWidthChange={setWidth}
                depth={depth}
                onDepthChange={setDepth}
              />

            </div>

            {/* Right panel */}
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
            />
          </div>
        </main>
      </div>
    </div>
  );
}