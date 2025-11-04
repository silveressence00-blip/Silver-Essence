import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, Star, Hexagon } from 'lucide-react';
import { Logo } from './Logo';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { CustomizeInquiryForm } from './CustomizeInquiryForm';
import { Cart } from './Cart';
import { InteractiveGlobe } from './InteractiveGlobe';
import { ContactUs } from './ContactUs';
import { Checkout } from './Checkout';
import { Footer } from './Footer';
import { AboutUs } from './AboutUs';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';
import { RefundPolicy } from './RefundPolicy';
import { Product, CartItem, MaterialType, SizeType, JewelryCategory } from '../types/product';
import { products } from '../data/products';
import { toast } from 'sonner';

type Section = 'women' | 'men';
type PageView = 'store' | 'about' | 'privacy' | 'terms' | 'refund';

export function Store() {
  const [activeSection, setActiveSection] = useState<Section>('women');
  const [activeCategory, setActiveCategory] = useState<JewelryCategory>('rings');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizeProduct, setCustomizeProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<PageView>('store');

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Get available categories for current section
  const availableCategories: JewelryCategory[] = activeSection === 'women' 
    ? ['rings', 'earrings', 'bracelets', 'necklaces']
    : ['rings', 'bracelets'];

  // Get current products based on section and category
  const currentProducts = products.filter(
    p => p.category === activeSection && p.jewelryType === activeCategory
  );
  
  // Get category display names
  const getCategoryName = (category: JewelryCategory): string => {
    const names: Record<JewelryCategory, string> = {
      'rings': 'Rings',
      'earrings': 'Earrings',
      'bracelets': 'Bracelets',
      'necklaces': 'Necklaces',
    };
    return names[category];
  };

  const handleSectionChange = (newSection: Section) => {
    setActiveSection(newSection);
    // Reset to first available category when switching sections
    setActiveCategory(newSection === 'women' ? 'rings' : 'rings');
  };

  const handleAddToCart = (product: Product, material: MaterialType, size: SizeType) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === product.id && 
        item.selectedMaterial === material && 
        item.selectedSize === size
      );
      if (existing) {
        toast.success('Quantity updated!');
        return prev.map(item =>
          (item.id === product.id && 
           item.selectedMaterial === material && 
           item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('Added to cart!', {
        description: `${product.name} - ${material} (${size})`,
      });
      return [...prev, { 
        ...product, 
        quantity: 1,
        selectedMaterial: material,
        selectedSize: size,
      }];
    });
  };

  const handleUpdateQuantity = (id: string, material: MaterialType, size: SizeType, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => 
        !(item.id === id && item.selectedMaterial === material && item.selectedSize === size)
      ));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          (item.id === id && item.selectedMaterial === material && item.selectedSize === size)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string, material: MaterialType, size: SizeType) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.selectedMaterial === material && item.selectedSize === size)
    ));
  };

  // Show checkout page when button is clicked
  if (showCheckout) {
    return <Checkout items={cartItems} onBack={() => setShowCheckout(false)} />;
  }

  // Show different pages based on currentPage state
  if (currentPage === 'about') {
    return <AboutUs onBack={() => setCurrentPage('store')} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentPage('store')} />;
  }

  if (currentPage === 'terms') {
    return <TermsAndConditions onBack={() => setCurrentPage('store')} />;
  }

  if (currentPage === 'refund') {
    return <RefundPolicy onBack={() => setCurrentPage('store')} />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1c] relative overflow-hidden">
            {/* Metallic background texture */}
            <motion.div
              className="fixed inset-0 metallic-bg"
              style={{ y: backgroundY }}
            />

      {/* Ambient particles */}
      <motion.div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: i % 3 === 0 ? '3px' : '1.5px',
              height: i % 3 === 0 ? '3px' : '1.5px',
              background: i % 4 === 0 ? '#d4a574' : i % 4 === 1 ? '#178B8D' : i % 4 === 2 ? '#C0C0C0' : '#f5a962',
              boxShadow: `0 0 ${i % 2 === 0 ? '15px' : '8px'} ${i % 4 === 0 ? '#d4a574' : i % 4 === 1 ? '#178B8D' : i % 4 === 2 ? '#C0C0C0' : '#f5a962'}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b"
        style={{
          background: 'rgba(26, 26, 28, 0.8)',
          borderColor: 'rgba(23, 139, 141, 0.3)',
          boxShadow: '0 4px 30px rgba(23, 139, 141, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Logo />
          
          <nav className="flex items-center gap-12">
            {(['women', 'men'] as Section[]).map((section) => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className="relative px-6 py-3 tracking-widest transition-all group"
              >
                <span
                  className="relative z-10"
                  style={{
                    color: activeSection === section ? '#ffffff' : '#C0C0C0',
                    textShadow: activeSection === section ? '0 0 25px rgba(23, 139, 141, 1), 0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
                  }}
                >
                  {section.toUpperCase()}
                </span>
                {activeSection === section && (
                  <>
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #178B8D, #ffffff, #178B8D, transparent)',
                        boxShadow: '0 0 25px rgba(23, 139, 141, 0.8), 0 0 15px rgba(255, 255, 255, 0.4)',
                      }}
                    />
                    <Hexagon className="absolute -top-1 -right-1 w-4 h-4 text-[#178B8D]" />
                  </>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-4 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(23, 139, 141, 0.2), rgba(192, 192, 192, 0.1))',
              border: '1px solid rgba(23, 139, 141, 0.3)',
            }}
          >
            <ShoppingCart className="w-6 h-6 text-[#178B8D]" />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #d4a574, #f5a962)',
                  boxShadow: '0 0 20px rgba(212, 165, 116, 0.6)',
                  color: '#1a1a1c',
                }}
              >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </motion.span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-48 pb-32 chrome-shine"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-8xl mb-8 tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #178B8D 30%, #C0C0C0 60%, #d4a574 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 30px rgba(23, 139, 141, 0.6))',
              }}
            >
              SILVER ESSENCE
            </motion.h1>
            <motion.p 
              className="text-2xl tracking-widest mb-12"
              style={{ color: '#C0C0C0' }}
            >
              Italian Craftsmanship • Timeless Elegance
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              className="h-[2px] w-96 mx-auto relative"
              style={{
                background: 'linear-gradient(90deg, transparent, #178B8D, #ffffff, #178B8D, #ffffff, #178B8D, transparent)',
                boxShadow: '0 0 35px rgba(23, 139, 141, 0.7), 0 0 25px rgba(255, 255, 255, 0.5)',
              }}
            >
              {[0, 25, 50, 75, 100].map((pos) => (
                <motion.div
                  key={pos}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{
                    left: `${pos}%`,
                    background: pos === 50 ? '#d4a574' : '#178B8D',
                    boxShadow: pos === 50 ? '0 0 10px #d4a574' : '0 0 10px #178B8D',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: pos * 0.02,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <section className="relative py-12 metallic-bg">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-8 py-4 rounded-lg transition-all duration-300"
                style={{
                  background: activeCategory === category 
                    ? 'linear-gradient(135deg, rgba(23, 139, 141, 0.3), rgba(192, 192, 192, 0.2))'
                    : 'rgba(26, 26, 28, 0.6)',
                  border: activeCategory === category
                    ? '2px solid rgba(23, 139, 141, 0.6)'
                    : '2px solid rgba(192, 192, 192, 0.2)',
                  boxShadow: activeCategory === category
                    ? '0 0 30px rgba(23, 139, 141, 0.4), 0 0 15px rgba(255, 255, 255, 0.2)'
                    : 'none',
                }}
              >
                <span
                  className="tracking-widest uppercase"
                  style={{
                    color: activeCategory === category ? '#ffffff' : '#C0C0C0',
                    textShadow: activeCategory === category 
                      ? '0 0 15px rgba(23, 139, 141, 0.8)'
                      : 'none',
                  }}
                >
                  {getCategoryName(category)}
                </span>
                {activeCategory === category && (
                  <Star 
                    className="absolute -top-2 -right-2 w-5 h-5 text-[#d4a574]"
                    fill="#d4a574"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-20 metallic-bg-reverse">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            key={`${activeSection}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Title */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl tracking-widest mb-8 text-center uppercase"
              style={{
                background: 'linear-gradient(90deg, #ffffff, #d4a574, #178B8D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(23, 139, 141, 0.3))',
              }}
            >
              {getCategoryName(activeCategory)}
            </motion.h2>

            {/* Material Options Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-center"
            >
              <p 
                className="text-lg tracking-wide mb-2"
                style={{ color: '#E0E0E0' }}
              >
                Available in Premium Materials
              </p>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)', boxShadow: '0 0 10px rgba(192, 192, 192, 0.5)' }} />
                  <span style={{ color: '#C0C0C0' }}>925 Sterling Silver</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #d4a574, #f5a962)', boxShadow: '0 0 10px rgba(212, 165, 116, 0.5)' }} />
                  <span style={{ color: '#d4a574' }}>18K Gold Plated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #E8B4B8, #D4A5A8)', boxShadow: '0 0 10px rgba(232, 180, 184, 0.5)' }} />
                  <span style={{ color: '#E8B4B8' }}>Rose Gold Plated</span>
                </div>
              </div>
              <p 
                className="text-sm mt-4 tracking-wide"
                style={{ color: '#9a9aa5', fontStyle: 'italic' }}
              >
                Each piece is crafted in solid 925 sterling silver with options for luxurious 18K gold or rose gold plating
              </p>
            </motion.div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={() => setSelectedProduct(product)}
                      index={index}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-2xl" style={{ color: '#C0C0C0' }}>
                No products available in this category.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Shipping */}
      <section className="relative py-32 metallic-glow">
        {/* Metallic overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(-135deg, rgba(0, 124, 124, 0.25) 0%, rgba(192, 192, 192, 0.2) 50%, rgba(0, 124, 124, 0.25) 100%)',
        }} />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <Hexagon className="w-12 h-12 mx-auto mb-6 text-[#178B8D]" fill="rgba(23, 139, 141, 0.2)" />
            <h2 
              className="text-6xl tracking-widest mb-6"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #178B8D 30%, #C0C0C0 60%, #d4a574 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 25px rgba(23, 139, 141, 0.5))',
              }}
            >
              WORLDWIDE DELIVERY
            </h2>
            <p className="text-xl tracking-wide" style={{ color: '#E0E0E0' }}>
              Luxury delivered to your doorstep across the globe
            </p>
          </motion.div>

          <InteractiveGlobe />
        </div>
      </section>

      {/* Contact Us */}
      <ContactUs />

      {/* Footer */}
      <Footer onNavigate={(page) => setCurrentPage(page)} />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={() => setShowCheckout(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onCustomize={(product) => {
          setSelectedProduct(null);
          setCustomizeProduct(product);
        }}
      />

      {/* Customize Inquiry Form */}
      <CustomizeInquiryForm
        product={customizeProduct}
        isOpen={!!customizeProduct}
        onClose={() => setCustomizeProduct(null)}
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 300% 0; }
          100% { background-position: -300% 0; }
        }
      `}</style>
    </div>
  );
}