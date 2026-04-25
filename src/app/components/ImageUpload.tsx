import { Plus, X } from 'lucide-react';
import { useState } from 'react';

type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  featured?: boolean;
};

const initialGallery: GalleryItem[] = [
  {
    id: 'main',
    image: '/images/galaxy-s24-highlights-color-carousel-global-mo.jpg',
    alt: 'Galaxy S24 em destaque',
    featured: true,
  },
  {
    id: 'side-1',
    image: '/images/celular-samsung-galaxy-s24-5g-exynos-2400-8gb-256gb_914354.webp',
    alt: 'Galaxy S24 frontal',
  },
  {
    id: 'side-2',
    image: '/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo.jpg',
    alt: 'Galaxy S24 Ultra traseira',
  },
  {
    id: 'side-3',
    image: '/images/s24-ultra-vaza.avif',
    alt: 'Galaxy S24 Ultra visual promocional',
  },
];

export function ImageUpload() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);

  const removeImage = (id: string) => {
    setGallery((current) => current.filter((item) => item.id !== id));
  };

  const mainImage = gallery[0];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.05fr_2.2fr]">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-200">
            Imagem principal <span className="text-rose-400">*</span>
          </p>

          <div className="relative h-[180px] overflow-hidden rounded-2xl border border-emerald-500/40 bg-[#131923] sm:h-[240px] xl:h-[118px]">
            {mainImage ? (
              <img
                src={mainImage.image}
                alt={mainImage.alt}
                className="h-full w-full object-cover"
              />
            ) : null}

            <div className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Principal
            </div>

            {mainImage ? (
              <button
                type="button"
                onClick={() => removeImage(mainImage.id)}
                aria-label="Remover imagem principal"
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-200">Galeria complementar</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {gallery.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative h-[96px] overflow-hidden rounded-2xl border border-white/10 bg-[#131923] sm:h-[112px] xl:h-[86px]"
              >
                <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />

                <button
                  type="button"
                  onClick={() => removeImage(item.id)}
                  aria-label={`Remover imagem ${item.alt}`}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            <button
              type="button"
              aria-label="Adicionar imagem complementar"
              className="flex h-[96px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#131923] px-3 text-center text-slate-400 transition hover:border-emerald-400/35 hover:text-white sm:h-[112px] xl:h-[86px]"
            >
              <Plus className="mb-2 h-5 w-5" />
              <span className="text-sm">Adicionar imagem</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Até 5 imagens no total: 1 principal e até 4 complementares. Formatos aceitos: PNG, JPG,
        AVIF ou WEBP.
        Tamanho máximo: 5MB por imagem.
      </p>
    </div>
  );
}
