import { Plus, X } from 'lucide-react';
import { useState } from 'react';

type GalleryItem = {
  id: string;
  image: string;
  featured?: boolean;
};

const initialGallery: GalleryItem[] = [
  {
    id: 'main',
    image:
      'linear-gradient(135deg, rgba(196,199,255,0.95), rgba(93,96,146,0.9) 45%, rgba(26,29,47,0.95))',
    featured: true,
  },
  {
    id: 'side-1',
    image:
      'linear-gradient(135deg, rgba(210,212,255,0.9), rgba(106,111,166,0.9) 52%, rgba(35,38,64,1))',
  },
  {
    id: 'side-2',
    image:
      'linear-gradient(180deg, rgba(208,210,255,0.9), rgba(86,89,144,0.92) 40%, rgba(33,36,61,1))',
  },
  {
    id: 'side-3',
    image:
      'linear-gradient(140deg, rgba(185,189,235,0.95), rgba(92,97,155,0.92) 55%, rgba(28,31,52,1))',
  },
  {
    id: 'side-4',
    image:
      'linear-gradient(135deg, rgba(211,213,243,0.95), rgba(87,91,139,0.92) 48%, rgba(29,31,50,1))',
  },
];

export function ImageUpload() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);

  const removeImage = (id: string) => {
    setGallery((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_2.2fr]">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-200">
            Imagem principal <span className="text-rose-400">*</span>
          </p>

          <div className="relative h-[118px] overflow-hidden rounded-2xl border border-emerald-500/40 bg-[#131923]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: gallery[0]?.image,
              }}
            />
            <div className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Principal
            </div>
            <button
              type="button"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-200">Galeria de imagens (até 6)</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {gallery.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative h-[86px] overflow-hidden rounded-2xl border border-white/10 bg-[#131923]"
              >
                <div className="absolute inset-0" style={{ backgroundImage: item.image }} />
                <button
                  type="button"
                  onClick={() => removeImage(item.id)}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="flex h-[86px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#131923] text-slate-400 transition hover:border-emerald-400/35 hover:text-white"
            >
              <Plus className="mb-2 h-5 w-5" />
              <span className="text-sm">Adicionar imagem</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Formatos aceitos: PNG, JPG ou WEBP. Tamanho máximo: 5MB por imagem.
      </p>
    </div>
  );
}
