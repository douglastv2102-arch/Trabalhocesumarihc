import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export function ImageUpload() {
  const [gallery, setGallery] = useState<string[]>([]);

  const handleGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGallery(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-300">
          Imagens do produto
        </label>
        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-lg cursor-pointer transition-all text-xs font-medium">
          <Upload className="w-3.5 h-3.5" />
          <span>Adicionar imagens</span>
          <input type="file" className="hidden" onChange={handleGalleryImage} accept="image/*" multiple />
        </label>
      </div>

      <div className="border-2 border-dashed border-gray-700 rounded-lg p-3 min-h-[140px]">
        {gallery.length > 0 ? (
          <div className="grid grid-cols-5 gap-2">
            {gallery.map((img, index) => (
              <div key={index} className="relative aspect-square bg-[#0f0f0f] border border-gray-700 rounded-lg overflow-hidden group">
                <img src={img} alt={`Produto ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setGallery(prev => prev.filter((_, i) => i !== index))}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <ImageIcon className="w-10 h-10 text-gray-600 mb-2" />
            <p className="text-xs text-gray-500">Nenhuma imagem adicionada</p>
            <p className="text-xs text-gray-600">Clique em "Adicionar imagens" para começar</p>
          </div>
        )}
      </div>
    </div>
  );
}
