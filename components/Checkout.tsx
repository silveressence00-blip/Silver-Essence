import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Shield, Lock, ArrowLeft, Check } from 'lucide-react';
import { CartItem } from '../types/product';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
}

export function Checkout({ items, onBack }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, color: '#007C7C' },
    { id: 'applepay', name: 'Apple Pay', icon: Smartphone, color: '#000000' },
    { id: 'googlepay', name: 'Google Pay', icon: Wallet, color: '#4285F4' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, color: '#0070BA' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProcessing(false);
    setCompleted(true);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
    return formatted.substring(0, 19);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden metallic-bg">
        {/* Success animation background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 3],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 500],
              y: [0, (Math.random() - 0.5) * 500],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
            }}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: i % 3 === 0 ? '#007C7C' : i % 3 === 1 ? '#C0C0C0' : '#d4a574',
              boxShadow: `0 0 20px ${i % 3 === 0 ? '#007C7C' : i % 3 === 1 ? '#C0C0C0' : '#d4a574'}`,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            }}
            className="mx-auto mb-8 w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #007C7C, #C0C0C0)',
              boxShadow: '0 0 80px rgba(0, 124, 124, 0.8)',
            }}
          >
            <Check className="w-16 h-16 text-white" />
          </motion.div>

          <h2 
            className="text-6xl tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #007C7C, #C0C0C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ORDER CONFIRMED!
          </h2>
          <p className="text-xl mb-8" style={{ color: '#E0E0E0' }}>
            Thank you for your purchase. Your order is being prepared.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-8 py-4 rounded-xl font-bold text-center flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #007C7C, #C0C0C0)',
              color: '#ffffff',
              boxShadow: '0 10px 40px rgba(0, 124, 124, 0.4)',
            }}
          >
            CONTINUE SHOPPING
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0c' }}>
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '0, 124, 124' : '192, 192, 192'}, 0.08), transparent)`,
              filter: 'blur(80px)',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-center"
            style={{
              background: 'rgba(20, 20, 25, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </motion.button>

          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: step >= s ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: step >= s 
                      ? 'linear-gradient(135deg, #007C7C, #C0C0C0)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                  }}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div 
                    className="w-16 h-1"
                    style={{
                      background: step > s ? '#007C7C' : 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Contact & Shipping */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="space-y-6"
                  >
                    <h3 
                      className="text-3xl tracking-wider mb-6"
                      style={{
                        background: 'linear-gradient(90deg, #ffffff, #007C7C)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      CONTACT INFORMATION
                    </h3>

                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                      style={{
                        background: 'rgba(20, 20, 25, 0.9)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                      }}
                    />

                    <h3 
                      className="text-3xl tracking-wider mb-6 mt-8"
                      style={{
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      SHIPPING ADDRESS
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      />
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                      style={{
                        background: 'rgba(20, 20, 25, 0.9)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                      }}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      />
                      <input
                        type="text"
                        required
                        placeholder="ZIP"
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                        style={{
                          background: 'rgba(20, 20, 25, 0.9)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      />
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="w-full py-5 rounded-xl mt-8 font-bold text-center flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #007C7C, #C0C0C0)',
                        color: '#ffffff',
                        boxShadow: '0 10px 40px rgba(0, 124, 124, 0.3)',
                      }}
                    >
                      CONTINUE TO PAYMENT
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="space-y-6"
                  >
                    <h3 
                      className="text-3xl tracking-wider mb-6"
                      style={{
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      PAYMENT METHOD
                    </h3>

                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {paymentMethods.map((method) => (
                        <motion.button
                          key={method.id}
                          type="button"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPaymentMethod(method.id)}
                          className="relative p-6 rounded-xl border-2 flex flex-col items-center justify-center"
                          style={{
                            background: paymentMethod === method.id
                              ? 'rgba(20, 20, 25, 0.95)'
                              : 'rgba(15, 15, 20, 0.8)',
                            borderColor: paymentMethod === method.id
                              ? method.color
                              : 'rgba(255, 255, 255, 0.2)',
                            boxShadow: paymentMethod === method.id
                              ? `0 10px 40px ${method.color}30, inset 0 0 20px ${method.color}10`
                              : 'none',
                          }}
                        >
                          <method.icon 
                            className="w-8 h-8 mx-auto mb-2"
                            style={{ 
                              color: paymentMethod === method.id ? method.color : '#C0C0C0',
                              filter: paymentMethod === method.id ? `drop-shadow(0 0 10px ${method.color})` : 'none',
                            }}
                          />
                          <p className="text-sm font-bold text-center" style={{ color: '#ffffff' }}>
                            {method.name}
                          </p>
                          {paymentMethod === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                              style={{
                                background: method.color,
                                boxShadow: `0 0 15px ${method.color}`,
                              }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Holographic Credit Card */}
                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                        {/* 3D Credit Card Preview */}
                        <div className="perspective-1000 mb-8">
                          <motion.div
                            animate={{
                              rotateY: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                            }}
                            className="relative p-8 rounded-2xl"
                            style={{
                              background: 'linear-gradient(135deg, #007C7C, #0A9B9D, #C0C0C0)',
                              boxShadow: '0 30px 80px rgba(0, 124, 124, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            {/* Holographic overlay */}
                            <motion.div
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                              className="absolute inset-0 rounded-2xl opacity-30"
                              style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
                                backgroundSize: '200% 200%',
                              }}
                            />

                            <div className="relative z-10">
                              <div className="flex justify-between items-start mb-12">
                                <CreditCard className="w-12 h-12 text-white opacity-60" />
                                <Shield className="w-8 h-8 text-white opacity-80" />
                              </div>
                              <p className="text-2xl tracking-widest mb-6 text-white">
                                {formData.cardNumber || '•••• •••• •••• ••••'}
                              </p>
                              <div className="flex justify-between items-end">
                                <div>
                                  <p className="text-xs text-white/60 mb-1">CARDHOLDER</p>
                                  <p className="text-white tracking-wider">
                                    {formData.cardName || 'YOUR NAME'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-white/60 mb-1">EXPIRES</p>
                                  <p className="text-white tracking-wider">
                                    {formData.expiry || 'MM/YY'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Card number"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
                          maxLength={19}
                          className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                          style={{
                            background: 'rgba(20, 20, 25, 0.9)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                          }}
                        />

                        <input
                          type="text"
                          required
                          placeholder="Cardholder name"
                          value={formData.cardName}
                          onChange={(e) => setFormData({...formData, cardName: e.target.value.toUpperCase()})}
                          className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                          style={{
                            background: 'rgba(20, 20, 25, 0.9)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                          }}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                              }
                              setFormData({...formData, expiry: value});
                            }}
                            maxLength={5}
                            className="px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                            style={{
                              background: 'rgba(20, 20, 25, 0.9)',
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: '#ffffff',
                            }}
                          />
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="CVV"
                              value={formData.cvv}
                              onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                              maxLength={3}
                              className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all"
                              style={{
                                background: 'rgba(20, 20, 25, 0.9)',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#ffffff',
                              }}
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007C7C]" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod !== 'card' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-xl" style={{ color: '#C0C0C0' }}>
                          You will be redirected to complete your payment
                        </p>
                      </motion.div>
                    )}

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="flex-1 py-5 rounded-xl font-bold text-center flex items-center justify-center"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      >
                        BACK
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        className="flex-1 py-5 rounded-xl font-bold text-center flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #007C7C, #C0C0C0)',
                          color: '#ffffff',
                          boxShadow: '0 10px 40px rgba(0, 124, 124, 0.3)',
                        }}
                      >
                        REVIEW ORDER
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Submit */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="space-y-6"
                  >
                    <h3 
                      className="text-3xl tracking-wider mb-6"
                      style={{
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      REVIEW YOUR ORDER
                    </h3>

                    {/* Security Badge */}
                    <div 
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{
                        background: 'rgba(20, 20, 25, 0.8)',
                        border: '1px solid rgba(0, 124, 124, 0.4)',
                      }}
                    >
                      <Shield className="w-6 h-6 text-[#007C7C]" />
                      <p className="text-sm" style={{ color: '#C0C0C0' }}>
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="flex-1 py-5 rounded-xl font-bold text-center flex items-center justify-center"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                        }}
                      >
                        BACK
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={processing}
                        whileHover={{ scale: processing ? 1 : 1.02 }}
                        whileTap={{ scale: processing ? 1 : 0.98 }}
                        className="flex-1 py-5 rounded-xl relative overflow-hidden font-bold text-center flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #007C7C, #C0C0C0)',
                          color: '#ffffff',
                          boxShadow: '0 10px 40px rgba(0, 124, 124, 0.3)',
                        }}
                      >
                        {processing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            PROCESSING...
                          </>
                        ) : (
                          `PAY $${grandTotal.toFixed(2)}`
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="sticky top-8 p-8 rounded-3xl border-2 backdrop-blur-xl"
              style={{
                background: 'rgba(15, 15, 20, 0.95)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 
                className="text-2xl tracking-wider mb-6"
                style={{
                  background: 'linear-gradient(90deg, #ffffff, #007C7C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ORDER SUMMARY
              </h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-3 rounded-xl"
                    style={{
                      background: 'rgba(0, 124, 124, 0.05)',
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-white mb-1">{item.name}</p>
                      <p className="text-sm" style={{ color: '#C0C0C0' }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-6" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex justify-between">
                  <span style={{ color: '#C0C0C0' }}>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#C0C0C0' }}>Shipping</span>
                  <span className="text-[#007C7C]">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#C0C0C0' }}>Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div 
                  className="flex justify-between pt-4 border-t"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <span className="text-xl text-white">Total</span>
                  <span 
                    className="text-2xl"
                    style={{
                      background: 'linear-gradient(90deg, #ffffff, #007C7C)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
