
import React, { useState, useRef, useEffect } from 'react';
import { Product } from './types';
import EditorPanel from './components/EditorPanel';
import ProductCard from './components/ProductCard';
import { toJpeg } from 'html-to-image';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Niacinamide 10% + Zinc 1%',
    logo: 'https://logovector.net/wp-content/uploads/2021/02/the-ordinary-logo-vector.png',
    images: [
      'https://images.ctfassets.net/p332i0hvxu0s/1I251oy1y0IuA6w8SWg4oK/38b815fdd32822a0139e830f353b34241/theordinary-niacinamide-10-zinc-1-30ml.png?w=600&fm=webp',
      'https://images.ctfassets.net/p332i0hvxu0s/283lnnJSAyvpsb0V72C2s/78393b3f2715ad0623ca2f821615f59c/theordinary-niacinamide-10-zinc-1-60ml.png?w=600&fm=webp',
    ],
    description: 'High-strength vitamin and mineral blemish formula.',
    descriptionAr: 'تركيبة قوية من الفيتامينات والمعادن لمكافحة الشوائب.',
    price: 70,
    originalPrice: null,
    promotionText: null,
    soldOut: false,
  },
  {
    id: 2,
    name: 'Hyaluronic Acid 2% + B5',
    logo: 'https://logovector.net/wp-content/uploads/2021/02/the-ordinary-logo-vector.png',
    images: [
      'https://images.ctfassets.net/p332i0hvxu0s/3B2Y062dYmYwG6EC8qWaSe/5e533c39f0490b4a742c8d2024b35e23/theordinary-hyaluronic-acid-2-b5-30ml.png?w=600&fm=webp',
      'https://images.ctfassets.net/p332i0hvxu0s/38uit2G1nTNvjA35g2zT2S/4a74e06c1341d3c01306b88b7d4d4e3f/theordinary-hyaluronic-acid-2-b5-60ml.png?w=600&fm=webp',
    ],
    description: 'A hydration support formula.',
    descriptionAr: 'تركيبة دعم الترطيب.',
    price: 237,
    originalPrice: 299,
    promotionText: 'BEST SELLER',
    soldOut: false,
  },
  {
    id: 3,
    name: 'Glycolic Acid 7% Toning Solution',
    logo: 'https://logovector.net/wp-content/uploads/2021/02/the-ordinary-logo-vector.png',
    images: [
      'https://images.ctfassets.net/p332i0hvxu0s/29gJb72j2AysqmAeYg4Q4I/0ee928f09b2e04a1b0201202a0a256a4/theordinary-glycolic-acid-7-toning-solution-240ml.png?w=600&fm=webp',
      'https://images.ctfassets.net/p332i0hvxu0s/43uW44gzg0mwcO0wGkUia4/8f6f56fe456bad110a3341935e4125b0/theordinary-glycolic-acid-7-toning-solution-texture.jpg?w=600&fm=webp'
    ],
    description: 'An alpha hydroxyl acid that exfoliates the skin.',
    descriptionAr: 'حمض ألفا هيدروكسي الذي يقشر البشرة.',
    price: 140,
    originalPrice: null,
    promotionText: null,
    soldOut: true,
  },
  {
    id: 4,
    name: 'Lash Curl Finisher',
    logo: 'https://logovector.net/wp-content/uploads/2021/02/the-ordinary-logo-vector.png',
    images: [
      'https://images.ctfassets.net/p332i0hvxu0s/5No25T20UiC2A44SOi0Ea0/16c87e076e03c6214f4e7052a514e047/theordinary-multi-peptide-lash-and-brow-serum-5ml.png?w=600&fm=webp',
      'https://images.ctfassets.net/p332i0hvxu0s/7vKllL8zWj1M6c8kG004I4/3688b48f936d8590c9527e045e75c602/The_Ordinary_Multi-Peptide_Lash_and_Brow_Serum_Swatch.jpg?w=600&fm=webp'
    ],
    description: 'Fixateur Cils Courbés.',
    descriptionAr: 'مُثبت تمويج الرموش.',
    price: 150,
    originalPrice: null,
    promotionText: 'NEW',
    soldOut: false,
  },
];

type AspectRatio = '1:1' | '4:5' | '9:16';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('instaFicheProducts');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem('instaFicheProducts', JSON.stringify(products));
  }, [products]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    products[0]?.id ?? null
  );
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const cardRef = useRef<HTMLDivElement>(null);
  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null;

  const handleUpdateProduct = (updated: Product) => {
    setProducts(p =>
      p.map(x => (x.id === updated.id ? updated : x))
    );
  };

  const handleAddNewProduct = () => {
    const id = Date.now();
    setProducts(p => [
      ...p,
      {
        id,
        name: 'New Product',
        description: 'Description',
        descriptionAr: 'الوصف بالعربية',
        images: ['https://via.placeholder.com/300'],
        price: 0,
        originalPrice: null,
        promotionText: null,
        soldOut: false,
        logo: null,
      },
    ]);
    setSelectedProductId(id);
  };

  const handleDeleteProduct = (id: number) => {
    if (!confirm('Delete this product?')) return;
    setProducts(p => p.filter(x => x.id !== id));
    setSelectedProductId(prev => (prev === id ? null : prev));
  };

  const handleDownload = async () => {
    if (!cardRef.current?.firstElementChild || !selectedProduct) {
        console.error("Download preconditions not met: missing card element or selected product.");
        return;
    }

    setIsDownloading(true);
    const nodeToRender = cardRef.current.firstElementChild as HTMLElement;

    try {
        const fontPromise = new Promise<string>(async (resolve, reject) => {
            try {
                const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap';
                const cssResponse = await fetch(fontCssUrl);
                if (!cssResponse.ok) throw new Error(`Failed to fetch font CSS: ${cssResponse.statusText}`);
                let cssText = await cssResponse.text();

                const fontUrlRegex = /url\((https:\/\/[^)]+)\)/g;
                const fontUrls = [...cssText.matchAll(fontUrlRegex)].map(match => match[1]);

                const fontDataURLPromises = fontUrls.map(async url => {
                    const fontResponse = await fetch(url);
                    if (!fontResponse.ok) throw new Error(`Failed to fetch font file: ${url}`);
                    const blob = await fontResponse.blob();
                    return new Promise<[string, string]>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve([url, reader.result as string]);
                        reader.onerror = () => reject(new Error('Failed to read font file as a Data URL.'));
                        reader.readAsDataURL(blob);
                    });
                });
                
                const fontDataURLs = await Promise.all(fontDataURLPromises);
                for (const [originalUrl, dataUrl] of fontDataURLs) {
                    cssText = cssText.replace(originalUrl, dataUrl);
                }
                resolve(cssText);
            } catch (error) {
                reject(error);
            }
        });
        
        const embeddedFontCss = await fontPromise;

        const baseWidth = 500; // Corresponds to sm:w-[500px]
        const targetWidth = 1080; // Ideal Instagram width
        const calculatedPixelRatio = targetWidth / baseWidth;

        const dataUrl = await toJpeg(nodeToRender, {
            cacheBust: true,
            pixelRatio: calculatedPixelRatio,
            fontEmbedCSS: embeddedFontCss,
            quality: 0.95,
        });

        const a = document.createElement('a');
        a.href = dataUrl;
        
        const formatNameMap: Record<AspectRatio, string> = {
            '1:1': 'square',
            '4:5': 'portrait',
            '9:16': 'reel-story',
        };
        const formatName = formatNameMap[aspectRatio];

        a.download = `${selectedProduct.name.replace(/\s+/g, '-').toLowerCase()}-${formatName}.jpg`;
        a.click();

    } catch (e) {
        console.error('Download failed:', e);
        const errorMessage = e instanceof Error ? e.message : String(e);
        alert(
            `Sorry, the download failed.\n\nThis is usually caused by a network issue or a browser security policy (CORS) that prevents loading external resources like the product image or fonts.\n\nRECOMMENDATIONS:\n1. Check your internet connection and try again.\n2. Disable any ad-blocker or privacy extensions and try again.\n3. Use the "Change Image" or "Change Logo" button to upload the image from your computer. This is the most reliable method.\n\nError details: ${errorMessage}`
        );
    } finally {
        setIsDownloading(false);
    }
  };


  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-6">
      {isDownloading && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center gap-4 text-center">
            <svg className="animate-spin h-10 w-10 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-lg font-bold text-slate-900">Generating Image</h3>
            <p className="text-slate-600">Please wait a moment...</p>
          </div>
        </div>
      )}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <EditorPanel
          product={selectedProduct!}
          onUpdate={handleUpdateProduct}
          allProducts={products}
          onSelectProduct={setSelectedProductId}
          onDownload={handleDownload}
          onAddNewProduct={handleAddNewProduct}
          onDeleteProduct={handleDeleteProduct}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
        />

        <div className="lg:col-span-2 flex items-center justify-center p-4">
          {selectedProduct && (
            <div ref={cardRef}>
              <ProductCard 
                product={selectedProduct} 
                aspectRatio={aspectRatio} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
