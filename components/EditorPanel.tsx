
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { DownloadIcon, TrashIcon, XCircleIcon } from './icons';

interface EditorPanelProps {
  product: Product;
  onUpdate: (product: Product) => void;
  allProducts: Product[];
  onSelectProduct: (id: number) => void;
  onDownload: () => void;
  onAddNewProduct: () => void;
  onDeleteProduct: (id: number) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ product, onUpdate, allProducts, onSelectProduct, onDownload, onAddNewProduct, onDeleteProduct }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice?.toString() ?? '');
  const [promotionText, setPromotionText] = useState(product.promotionText ?? '');
  const [soldOut, setSoldOut] = useState(product.soldOut);
  const [description, setDescription] = useState(product.description);
  const [descriptionAr, setDescriptionAr] = useState(product.descriptionAr);
  const [images, setImages] = useState(product.images);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setOriginalPrice(product.originalPrice?.toString() ?? '');
      setPromotionText(product.promotionText ?? '');
      setSoldOut(product.soldOut);
      setDescription(product.description);
      setDescriptionAr(product.descriptionAr);
      setImages(product.images);
    }
  }, [product]);

  const handleUpdate = () => {
    onUpdate({
      ...product,
      name,
      price: parseFloat(price) || 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      promotionText: promotionText || null,
      soldOut,
      description,
      descriptionAr,
      images,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSoldOut(checked);
    onUpdate({ ...product, soldOut: checked });
  }

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = reader.result as string;
            const updatedImages = [...images, newImage];
            setImages(updatedImages);
            onUpdate({ ...product, images: updatedImages });
        };
        reader.readAsDataURL(file);
    }
  };
  
  const handleImageDelete = (indexToDelete: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    setImages(updatedImages);
    onUpdate({ ...product, images: updatedImages });
  }

  const inputStyles = "mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150";
  const labelStyles = "block text-sm font-medium text-slate-700";
  const fieldsetStyles = "border border-slate-200 p-4 rounded-lg";
  const legendStyles = "text-sm font-semibold text-indigo-600 px-2";

  if (!product) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Product Selected</h3>
            <p className="text-slate-500 mb-4">Please create a new product to begin.</p>
            <button onClick={onAddNewProduct} className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Create First Product
            </button>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Product Editor</h3>
        
        <div className="mb-4">
            <label htmlFor="product-select" className={`${labelStyles} mb-1`}>Selected Product</label>
            <div className="flex gap-2">
                <select
                    id="product-select"
                    value={product.id}
                    onChange={(e) => onSelectProduct(parseInt(e.target.value))}
                    className={`flex-grow ${inputStyles}`}
                >
                    {allProducts.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <button onClick={onAddNewProduct} className="bg-slate-200 text-slate-800 px-4 rounded-md font-semibold hover:bg-slate-300 transition-colors">New</button>
            </div>
        </div>

        <div className="space-y-6 flex-grow overflow-y-auto pr-2 -mr-2">
            <fieldset className={fieldsetStyles}>
                <legend className={legendStyles}>Details</legend>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className={labelStyles}>Product Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleUpdate} className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="description" className={labelStyles}>Description</label>
                        <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleUpdate} className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="descriptionAr" className={labelStyles}>Description (Arabic)</label>
                        <textarea id="descriptionAr" rows={3} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} onBlur={handleUpdate} className={`${inputStyles} text-right font-arabic`} dir="rtl" />
                    </div>
                    <div>
                        <label className={labelStyles}>Product Images</label>
                        <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {images.map((img, index) => (
                                <div key={index} className="relative group aspect-square">
                                    <img src={img} alt={`Product image ${index + 1}`} className="w-full h-full object-cover rounded-md bg-slate-100 border" />
                                    <button onClick={() => handleImageDelete(index)} className="absolute -top-1 -right-1 bg-white rounded-full text-slate-600 hover:text-red-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Delete image">
                                        <XCircleIcon />
                                    </button>
                                </div>
                            ))}
                            <label htmlFor="image-add" className="cursor-pointer aspect-square flex items-center justify-center border-2 border-dashed border-slate-300 rounded-md text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </label>
                            <input type="file" id="image-add" accept="image/png, image/jpeg, image/webp" onChange={handleImageAdd} className="hidden" />
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetStyles}>
                <legend className={legendStyles}>Pricing</legend>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="price" className={labelStyles}>Price (€)</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} onBlur={handleUpdate} className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="originalPrice" className={labelStyles}>Original Price (optional)</label>
                        <input type="number" id="originalPrice" placeholder="e.g., 10.50" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} onBlur={handleUpdate} className={inputStyles} />
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetStyles}>
                <legend className={legendStyles}>Status</legend>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="promotionText" className={labelStyles}>Promotion Text (optional)</label>
                        <input type="text" id="promotionText" placeholder="e.g., NEW, BEST SELLER" value={promotionText} onChange={(e) => setPromotionText(e.target.value)} onBlur={handleUpdate} className={inputStyles} />
                    </div>
                    <div className="flex items-center pt-2">
                        <input id="soldOut" type="checkbox" checked={soldOut} onChange={(e) => handleCheckboxChange(e.target.checked)} className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="soldOut" className="ml-2 block text-sm text-slate-900">Mark as Sold Out</label>
                    </div>
                </div>
            </fieldset>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <button onClick={onDownload} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2 transition-colors">
                <DownloadIcon />
                Download as JPG
            </button>
            <button onClick={() => onDeleteProduct(product.id)} className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center gap-2 transition-colors">
                <TrashIcon />
                Delete Product
            </button>
        </div>
    </div>
  );
};

export default EditorPanel;