import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem, MaterialType, SizeType } from '../types/product';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, material: MaterialType, size: SizeType, quantity: number) => void;
  onRemove: (id: string, material: MaterialType, size: SizeType) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md border-l z-50 flex flex-col"
            style={{
              background: 'linear-gradient(to bottom, #25252a, #1a1a1c)',
              borderColor: 'rgba(212, 165, 116, 0.3)',
              boxShadow: '-10px 0 60px rgba(212, 165, 116, 0.3), -5px 0 30px rgba(23, 139, 141, 0.2)',
            }}
          >
            {/* Header */}
            <div className="p-6 border-b" style={{ borderColor: 'rgba(212, 165, 116, 0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #178B8D 0%, #1DA5A7 50%, #d4a574 100%)',
                      boxShadow: '0 0 25px rgba(212, 165, 116, 0.5), 0 0 40px rgba(23, 139, 141, 0.3)',
                    }}
                  >
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 
                      className="text-2xl tracking-wide"
                      style={{
                        background: 'linear-gradient(90deg, #d4a574, #178B8D, #C0C0C0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Shopping Cart
                    </h2>
                    <p className="text-sm text-gray-400">{items.length} items</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 text-center">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="relative rounded-lg p-4 border"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(0, 124, 124, 0.15) 0%, rgba(192, 192, 192, 0.1) 100%)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 15px rgba(0, 124, 124, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white mb-1" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}>{item.name}</h3>
                          <p 
                            className="text-lg"
                            style={{
                              color: '#ffffff',
                              textShadow: '0 0 10px rgba(23, 139, 141, 0.4)',
                            }}
                          >
                            ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(item.id, item.selectedMaterial, item.selectedSize)}
                          className="self-start text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedMaterial, item.selectedSize, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-[#178B8D]/20 hover:bg-[#178B8D]/30 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4 text-[#178B8D]" />
                        </button>
                        <span className="text-white min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedMaterial, item.selectedSize, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#178B8D]/20 hover:bg-[#178B8D]/30 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-[#178B8D]" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: 'rgba(212, 165, 116, 0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 tracking-wide">Total</span>
                  <span 
                    className="text-3xl tracking-wide"
                    style={{
                      background: 'linear-gradient(90deg, #d4a574, #178B8D, #C0C0C0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-4 rounded-lg relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #007C7C 0%, #0A9B9D 50%, #C0C0C0 100%)',
                    boxShadow: '0 0 20px rgba(0, 124, 124, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span className="relative z-10 text-white tracking-widest font-bold text-center flex items-center justify-center w-full">
                    PROCEED TO CHECKOUT
                  </span>
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    }}
                  />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
