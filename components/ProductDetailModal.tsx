import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import { Product, MaterialType, SizeType } from '../types/product';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, material: MaterialType, size: SizeType) => void;
  onCustomize: (product: Product) => void;
}

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onCustomize }: ProductDetailModalProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('silver');
  const [selectedSize, setSelectedSize] = useState<SizeType>('m');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedMaterial, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border-2"
              style={{
                background: 'rgba(10, 10, 12, 0.98)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(20, 20, 25, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Column - Images */}
                <div className="space-y-4">
                  {/* Main Product Image with Hover Zoom */}
                  <div 
                    className="relative aspect-square overflow-hidden rounded-xl border-2 cursor-zoom-in"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      background: '#0a0a0c',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{
                        transform: isZoomed ? `scale(2.5)` : 'scale(1)',
                        transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center',
                      }}
                    />
                    {!isZoomed && (
                      <div className="absolute top-4 right-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Model Shot (if available) */}
                  {product.modelImage && (
                    <div 
                      className="aspect-[4/3] overflow-hidden rounded-xl border-2"
                      style={{
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                        background: '#0a0a0c',
                      }}
                    >
                      <img
                        src={product.modelImage}
                        alt={`${product.name} on model`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div className="flex flex-col">
                  {/* Italian Craftsmanship Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <Sparkles 
                      className="w-5 h-5"
                      style={{ color: '#d4a574' }}
                    />
                    <span 
                      className="text-sm tracking-widest uppercase"
                      style={{ color: '#d4a574' }}
                    >
                      Italian Craftsmanship
                    </span>
                  </motion.div>

                  {/* Product Name */}
                  <h2 
                    className="text-4xl tracking-wide mb-4"
                    style={{
                      color: '#ffffff',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="mb-6">
                    <span 
                      className="text-3xl tracking-wider"
                      style={{
                        color: '#ffffff',
                        fontWeight: 300,
                      }}
                    >
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm ml-2" style={{ color: '#9a9aa5' }}>USD</span>
                  </div>

                  {/* Description */}
                  <p 
                    className="mb-6 leading-relaxed"
                    style={{
                      color: '#C0C0C0',
                      fontSize: '0.95rem',
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Craftsmanship Details */}
                  {product.craftsmanship && (
                    <div 
                      className="mb-6 p-4 rounded-lg"
                      style={{
                        background: 'rgba(212, 165, 116, 0.05)',
                        border: '1px solid rgba(212, 165, 116, 0.2)',
                      }}
                    >
                      <p 
                        className="text-sm italic"
                        style={{ color: '#d4a574' }}
                      >
                        {product.craftsmanship}
                      </p>
                    </div>
                  )}

                  {/* Material Selector */}
                  <div className="mb-6">
                    <label 
                      className="block mb-3 text-sm tracking-wider uppercase"
                      style={{ color: '#ffffff' }}
                    >
                      Material
                    </label>
                    <div className="flex gap-3">
                      {product.materials.map((material) => {
                        const getMaterialColor = (mat: MaterialType) => {
                          if (mat === 'silver') return '#C0C0C0';
                          if (mat === 'gold') return '#d4a574';
                          if (mat === 'rose-gold') return '#E8B4B8';
                          return '#C0C0C0';
                        };
                        
                        const getMaterialLabel = (mat: MaterialType) => {
                          if (mat === 'silver') return 'Silver';
                          if (mat === 'gold') return 'Gold';
                          if (mat === 'rose-gold') return 'Rose Gold';
                          return mat;
                        };

                        return (
                          <button
                            key={material}
                            onClick={() => setSelectedMaterial(material)}
                            className="flex-1 py-3 px-6 rounded-lg border-2 transition-all"
                            style={{
                              background: selectedMaterial === material 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(20, 20, 25, 0.8)',
                              borderColor: selectedMaterial === material 
                                ? getMaterialColor(material)
                                : 'rgba(255, 255, 255, 0.2)',
                              color: selectedMaterial === material 
                                ? '#ffffff' 
                                : '#9a9aa5',
                              boxShadow: selectedMaterial === material 
                                ? `0 0 20px ${getMaterialColor(material)}50`
                                : 'none',
                            }}
                          >
                            {getMaterialLabel(material)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-8">
                    <label 
                      className="block mb-3 text-sm tracking-wider uppercase"
                      style={{ color: '#ffffff' }}
                    >
                      Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className="py-3 px-4 rounded-lg border-2 transition-all text-sm"
                          style={{
                            background: selectedSize === size 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'rgba(20, 20, 25, 0.8)',
                            borderColor: selectedSize === size 
                              ? '#007C7C'
                              : 'rgba(255, 255, 255, 0.2)',
                            color: selectedSize === size 
                              ? '#ffffff' 
                              : '#9a9aa5',
                          }}
                        >
                          {size === 'not-applicable' ? 'N/A' : size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="w-full py-4 rounded-lg transition-all font-bold text-center flex items-center justify-center"
                      style={{
                        background: product.inStock 
                          ? 'linear-gradient(135deg, #007C7C, #0A9B9D, #C0C0C0)'
                          : 'rgba(60, 60, 65, 0.5)',
                        color: '#ffffff',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: product.inStock 
                          ? '0 8px 30px rgba(0, 124, 124, 0.3)'
                          : 'none',
                      }}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        onCustomize(product);
                      }}
                      className="w-full py-4 rounded-lg border-2 transition-all font-bold text-center flex items-center justify-center"
                      style={{
                        background: 'rgba(212, 165, 116, 0.1)',
                        borderColor: '#d4a574',
                        color: '#d4a574',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Customize This Jewelry
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
