import { useState } from 'react';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { TextEditor } from './TextEditor';
import { ImageUpload } from './ImageUpload';
import { Package, DollarSign, Ruler, FileText } from 'lucide-react';

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
  weight: string;
  onWeightChange: (value: string) => void;
  height: string;
  onHeightChange: (value: string) => void;
  width: string;
  onWidthChange: (value: string) => void;
  depth: string;
  onDepthChange: (value: string) => void;
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
  weight,
  onWeightChange,
  height,
  onHeightChange,
  width,
  onWidthChange,
  depth,
  onDepthChange
}: ProductFormProps) {
  const [productNameStatus, setProductNameStatus] = useState<'default' | 'success' | 'error'>('default');
  const [skuStatus, setSkuStatus] = useState<'default' | 'success' | 'error'>('default');

  const handleProductNameChange = (value: string) => {
    onProductNameChange(value);
    if (value.length >= 3) {
      setProductNameStatus('success');
      onSlugChange(value.toLowerCase().replace(/\s+/g, '-'));
    } else {
      setProductNameStatus('default');
    }
  };

  const handleSkuChange = (value: string) => {
    onSkuChange(value);
    if (value.length >= 3) {
      setSkuStatus('success');
    } else {
      setSkuStatus('default');
    }
  };

  return (
    <div className="space-y-3">
      {/* Informações do produto */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-semibold text-white">Informações do produto</h3>
        </div>

        <InputField
          label="Nome do produto"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Ex: Smartphone Galaxy S24"
          required
          status={productNameStatus}
          message={productNameStatus === 'success' ? 'Nome válido' : undefined}
        />

        <InputField
          label="Slug (URL amigável)"
          value={slug}
          onChange={onSlugChange}
          placeholder="smartphone-galaxy-s24"
        />

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="SKU"
            value={sku}
            onChange={handleSkuChange}
            placeholder="PROD-001"
            required
            status={skuStatus}
            message={skuStatus === 'success' ? 'SKU disponível' : undefined}
          />

          <InputField
            label="Código de barras"
            value={barcode}
            onChange={onBarcodeChange}
            placeholder="7891234567890"
          />

          <InputField
            label="Classe fiscal"
            value={fiscalClass}
            onChange={onFiscalClassChange}
            placeholder="NCM 8517.12.31"
          />
        </div>
      </div>

      {/* Preços */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-semibold text-white">Preços</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Preço de venda"
            value={price}
            onChange={onPriceChange}
            placeholder="R$ 0,00"
            type="text"
            required
            icon={<span className="text-sm">R$</span>}
          />

          <InputField
            label="Preço promocional"
            value={promoPrice}
            onChange={onPromoPriceChange}
            placeholder="R$ 0,00"
            type="text"
            icon={<span className="text-sm">R$</span>}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-semibold text-white">Conteúdo</h3>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-300">
            Resumo curto
          </label>
          <TextEditor
            value={shortDescription}
            onChange={onShortDescriptionChange}
            placeholder="Escreva uma breve descrição do produto que será exibida em listagens e resumos..."
            rows={3}
          />
        </div>

        <TextareaField
          label="Descrição completa"
          value={fullDescription}
          onChange={onFullDescriptionChange}
          placeholder="Descrição detalhada do produto, características, benefícios..."
          rows={4}
          required
        />
      </div>

      {/* Imagens */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-white mb-3">Imagens do produto</h3>
        <ImageUpload />
      </div>

      {/* Dimensões e pesos */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-semibold text-white">Dimensões e pesos</h3>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <InputField
            label="Peso (kg)"
            value={weight}
            onChange={onWeightChange}
            placeholder="0.500"
            type="text"
          />

          <InputField
            label="Altura (cm)"
            value={height}
            onChange={onHeightChange}
            placeholder="15"
            type="text"
          />

          <InputField
            label="Largura (cm)"
            value={width}
            onChange={onWidthChange}
            placeholder="10"
            type="text"
          />

          <InputField
            label="Profundidade (cm)"
            value={depth}
            onChange={onDepthChange}
            placeholder="5"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
