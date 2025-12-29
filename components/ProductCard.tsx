
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [product.id]);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} Dhs`;
  };
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl flex flex-col p-6 sm:p-8 relative overflow-hidden font-sans shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      {product.soldOut && (
        <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden">
            <span className="text-white text-5xl sm:text-7xl font-extrabold tracking-widest border-4 border-white px-8 py-4 -rotate-12 bg-black/20 backdrop-blur-sm">
                SOLD OUT
            </span>
        </div>
      )}
      
      {product.logo && (
        <div className="flex-shrink-0 flex justify-start items-center pb-4">
          <img
            src={product.logo}
            alt="Brand Logo"
            className="max-h-8 sm:max-h-10 object-contain"
            crossOrigin="anonymous"
          />
        </div>
      )}

      <div className="relative flex-grow grid grid-cols-2 gap-6 items-center overflow-hidden">
        {/* Left column for Image */}
        <div className="relative flex items-center justify-center group h-full">
            <img 
                src={product.images[currentIndex] || 'https://via.placeholder.com/300'} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain drop-shadow-lg"
                crossOrigin="anonymous"
            />
             {hasMultipleImages && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 left-0 -translate-y-1/2 p-1 bg-white/50 text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 focus:opacity-100 focus:outline-none z-10 shadow-md">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={goToNext} className="absolute top-1/2 right-0 -translate-y-1/2 p-1 bg-white/50 text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 focus:opacity-100 focus:outline-none z-10 shadow-md">
                        <ChevronRightIcon />
                    </button>
                </>
            )}
        </div>
        {/* Right column for Text */}
        <div className="flex flex-col justify-center h-full">
            {product.promotionText && !product.soldOut && (
                <span className="bg-indigo-600 text-white text-[10px] sm:text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">{product.promotionText}</span>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{product.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">{product.description}</p>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 text-right font-arabic" dir="rtl">{product.descriptionAr}</p>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="flex-shrink-0 mt-6">
        {hasMultipleImages && (
            <div className="flex justify-center gap-2 mb-4">
                {product.images.map((_, index) => (
                    <div 
                        key={index} 
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === index ? 'bg-indigo-600 w-4' : 'bg-slate-400/70 hover:bg-indigo-400'}`}
                    />
                ))}
            </div>
        )}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex justify-end items-center">
             {product.originalPrice && !product.soldOut ? (
                <div className="flex items-baseline gap-3 flex-wrap justify-end">
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{formatPrice(product.price)}</p>
                    <p className="text-md sm:text-lg text-slate-500 line-through">{formatPrice(product.originalPrice)}</p>
                    <span className="bg-orange-100 text-orange-600 text-xs sm:text-sm font-bold px-2 py-1 rounded-md">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                </div>
            ) : (
                <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
                    <p className="text-xl sm:text-2xl font-bold">{formatPrice(product.price)}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;