import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative"
    >
      {/* Metallic pulsing glow - Optimized */}
      <motion.div 
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "easeInOut"
        }}
        className="absolute -inset-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(0, 124, 124, 0.3) 0%, rgba(192, 192, 192, 0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'opacity, transform',
        }}
      />
      
      <div className="relative rounded-xl overflow-hidden border group-hover:border-[#ffffff]/80 transition-all duration-500 chrome-shine"
           style={{
             background: 'linear-gradient(135deg, rgba(0, 124, 124, 0.25) 0%, rgba(192, 192, 192, 0.15) 50%, rgba(232, 232, 232, 0.2) 100%)',
             borderColor: 'rgba(255, 255, 255, 0.3)',
             boxShadow: '0 8px 40px rgba(0, 124, 124, 0.3), 0 4px 20px rgba(192, 192, 192, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
           }}>
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-black">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Metallic shimmer overlay - Optimized */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 30%, rgba(0, 124, 124, 0.2) 50%, rgba(192, 192, 192, 0.2) 70%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Chrome sweep on hover - Optimized */}
          <motion.div
            animate={{ x: ['-100%', '300%'] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/3 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15), transparent)',
              transform: 'skewX(-20deg)',
              willChange: 'transform',
            }}
          />

          {/* Stock badge */}
          {!product.inStock && (
            <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs tracking-wider text-white">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-6 relative" style={{
          background: 'linear-gradient(180deg, rgba(0, 124, 124, 0.15) 0%, rgba(192, 192, 192, 0.1) 100%)',
        }}>
          <div className="flex items-start justify-between mb-3">
            <h3 
              className="text-xl tracking-wide flex-1"
              style={{
                color: '#ffffff',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              }}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-[#178B8D]">
              <Star className="w-4 h-4 fill-current" style={{ filter: 'drop-shadow(0 0 5px #178B8D)' }} />
              <span className="text-sm">4.8</span>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span 
                className="text-2xl tracking-wide"
                style={{
                  background: 'linear-gradient(90deg, #ffffff, #178B8D, #C0C0C0, #d4a574)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">USD</span>
            </div>

            <motion.button
              whileHover={{ scale: product.inStock ? 1.05 : 1 }}
              whileTap={{ scale: product.inStock ? 0.95 : 1 }}
              onClick={() => product.inStock && onAddToCart(product)}
              disabled={!product.inStock}
              className="relative px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: product.inStock 
                  ? 'linear-gradient(135deg, #007C7C 0%, #0A9B9D 50%, #C0C0C0 100%)'
                  : 'linear-gradient(135deg, #3a3a42 0%, #25252a 100%)',
                boxShadow: product.inStock 
                  ? '0 0 15px rgba(0, 124, 124, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : 'none',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white tracking-wide font-bold text-center w-full">
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </span>
              

            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
