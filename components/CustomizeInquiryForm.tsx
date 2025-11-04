import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, Check } from 'lucide-react';
import { Product } from '../types/product';

interface CustomizeInquiryFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizeInquiryForm({ product, isOpen, onClose }: CustomizeInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customizationDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', customizationDetails: '' });
      onClose();
    }, 3000);
  };

  if (!product) return null;

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

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 p-8"
              style={{
                background: 'rgba(10, 10, 12, 0.98)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(20, 20, 25, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #00cc00, #00ff00)',
                    }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl mb-4" style={{ color: '#ffffff' }}>
                    Inquiry Sent!
                  </h3>
                  <p style={{ color: '#C0C0C0' }}>
                    Our artisan team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 
                    className="text-3xl mb-2"
                    style={{
                      color: '#ffffff',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Custom Design Inquiry
                  </h2>
                  <p className="mb-8" style={{ color: '#9a9aa5' }}>
                    Customizing: <span style={{ color: '#d4a574' }}>{product.name}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label 
                        className="block mb-2 text-sm uppercase tracking-wider"
                        style={{ color: '#ffffff' }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-lg border-2 outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label 
                        className="block mb-2 text-sm uppercase tracking-wider"
                        style={{ color: '#ffffff' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-lg border-2 outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label 
                        className="block mb-2 text-sm uppercase tracking-wider"
                        style={{ color: '#ffffff' }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-lg border-2 outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Customization Details */}
                    <div>
                      <label 
                        className="block mb-2 text-sm uppercase tracking-wider"
                        style={{ color: '#ffffff' }}
                      >
                        Customization Details *
                      </label>
                      <textarea
                        required
                        value={formData.customizationDetails}
                        onChange={(e) => setFormData({...formData, customizationDetails: e.target.value})}
                        rows={6}
                        className="w-full px-6 py-4 rounded-lg border-2 outline-none transition-all resize-none"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                        placeholder="Please describe your customization requirements in detail..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-4 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-center"
                      style={{
                        background: 'linear-gradient(135deg, #007C7C, #0A9B9D, #C0C0C0)',
                        color: '#ffffff',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: '0 8px 30px rgba(0, 124, 124, 0.3)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Inquiry
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
