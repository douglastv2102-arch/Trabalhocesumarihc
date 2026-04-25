import { ChevronDown, DollarSign, FileText, ImageIcon, Package2 } from 'lucide-react';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { TextEditor } from './TextEditor';
import { ImageUpload } from './ImageUpload';

interface ProductFormProps {
  productName: string;
  onProductNameChange: (value: string) => void;
  slug: string;
  onSlugChange: (value: string) => void;
  sku: string;
  onSkuChange: (value: string) => void;
  barcode: string;
  onBarcodeChange: (value: string) => void;
  fiscalClass: string;
  onFiscalClassChange: (value: string) => void;
  price: string;
  onPriceChange: (value: string) => void;
  promoPrice: string;
  onPromoPriceChange: (value: string) => void;
  shortDescription: string;
  onShortDescriptionChange: (value: string) => void;
  fullDescription: string;
  onFullDescriptionChange: (value: string) => void;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Package2;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/8 bg-[#171d27]/92 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/8">
          <Icon className="h-4 w-4 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function ProductForm({
  productName,
  onProductNameChange,
  slug,
  onSlugChange,
  sku,
  onSkuChange,
  barcode,
  onBarcodeChange,
  fiscalClass,
  onFiscalClassChange,
  price,
  onPriceChange,
  promoPrice,
  onPromoPriceChange,
  shortDescription,
  onShortDescriptionChange,
  fullDescription,
  onFullDescriptionChange,
}: ProductFormProps) {
  const productNameStatus = productName.length >= 3 ? 'success' : 'default';
  const slugStatus = slug.length >= 3 ? 'success' : 'default';
  const skuStatus = sku.length >= 3 ? 'success' : 'default';
  const barcodeStatus = barcode.length >= 8 ? 'success' : 'default';

  const handleProductNameChange = (value: string) => {
    onProductNameChange(value);
    onSlugChange(value.toLowerCase().trim().replace(/\s+/g, '-'));
  };

  return (
    <div className="space-y-5">
      <Section icon={Package2} title="Informações do produto">
        <div className="grid gap-4 lg:grid-cols-2">
          <InputField
            label="Nome do produto"
            value={productName}
            onChange={handleProductNameChange}
            required
            status={productNameStatus}
            message={productNameStatus === 'success' ? 'Nome válido.' : undefined}
          />

          <InputField
            label="Slug (URL amigável)"
            value={slug}
            onChange={onSlugChange}
            required
            status={slugStatus}
            message={slugStatus === 'success' ? 'URL amigável válida.' : undefined}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_0.9fr]">
          <InputField
            label="SKU"
            value={sku}
            onChange={onSkuChange}
            required
            status={skuStatus}
            message={skuStatus === 'success' ? 'SKU disponível.' : undefined}
          />

          <InputField
            label="Código de barras"
            value={barcode}
            onChange={onBarcodeChange}
            status={barcodeStatus}
          />

          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
              Classe fiscal
            </label>
            <div className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-[#131923] px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span>{fiscalClass}</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>
      </Section>

      <Section icon={DollarSign} title="Preços">
        <div className="grid gap-4 lg:grid-cols-2">
          <InputField
            label="Preço de venda"
            value={price}
            onChange={onPriceChange}
            required
            status="success"
            message="Preço válido."
            icon={<span className="text-base text-slate-300">R$</span>}
          />

          <InputField
            label="Preço promocional"
            value={promoPrice}
            onChange={onPromoPriceChange}
            icon={<span className="text-base text-slate-300">R$</span>}
            helperText="Deixe em branco para não usar promoção."
          />
        </div>
      </Section>

      <Section icon={FileText} title="Conteúdo">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.35fr]">
          <TextareaField
            label="Resumo curto"
            value={shortDescription}
            onChange={onShortDescriptionChange}
            required
            rows={4}
            showCounter
            maxLength={150}
          />

          <TextEditor
            value={fullDescription}
            onChange={onFullDescriptionChange}
            label="Descrição completa"
            required
            rows={4}
            maxLength={2000}
          />
        </div>
      </Section>

      <Section icon={ImageIcon} title="Imagens do produto">
        <ImageUpload />
      </Section>
    </div>
  );
}
