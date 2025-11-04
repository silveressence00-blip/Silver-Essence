import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#178B8D' : i % 3 === 1 ? '#d4a574' : '#C0C0C0',
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#178B8D' : i % 3 === 1 ? '#d4a574' : '#C0C0C0'}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-8 py-20 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 mb-12 px-6 py-3 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(23, 139, 141, 0.2), rgba(192, 192, 192, 0.1))',
            border: '1px solid rgba(23, 139, 141, 0.3)',
            color: '#178B8D',
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="tracking-wider">BACK TO STORE</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-6"
          >
            <FileText 
              className="w-16 h-16"
              style={{
                color: '#178B8D',
                filter: 'drop-shadow(0 0 20px #178B8D) drop-shadow(0 0 40px #C0C0C0)',
              }}
            />
          </motion.div>

          <h1 
            className="text-6xl tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #178B8D 30%, #C0C0C0 60%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
            }}
          >
            TERMS & CONDITIONS
          </h1>
          <p className="text-xl tracking-wide" style={{ color: '#E0E0E0' }}>
            Please Read Our Terms Carefully
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div 
            className="p-10 rounded-3xl border-2 backdrop-blur-xl"
            style={{
              background: 'rgba(15, 15, 20, 0.95)',
              borderColor: 'rgba(23, 139, 141, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#E0E0E0' }}>
                <strong style={{ color: '#178B8D' }}>Last Updated:</strong> [Date to be added]
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Terms and conditions content will be added here. This section explains the agreement 
                    between Silver Essence and its customers.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    2. Product Information
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Content about product descriptions, materials, and specifications will be added here.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    3. Ordering and Payment
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Content about ordering process and payment terms will be added here.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    4. Shipping and Delivery
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Content about shipping policies and delivery times will be added here.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    5. Returns and Exchanges
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Content about return and exchange policies will be added here.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    6. Warranty
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    [Content about product warranty will be added here.]
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    7. Contact Information
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    For questions regarding these Terms and Conditions, please contact us:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li style={{ color: '#178B8D' }}>
                      Email: sliveressence00@gmail.com
                    </li>
                    <li style={{ color: '#178B8D' }}>
                      Phone: +968 78720330
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[2px] w-96 mx-auto my-20 relative"
          style={{
            background: 'linear-gradient(90deg, transparent, #178B8D, #ffffff, #178B8D, transparent)',
            boxShadow: '0 0 20px rgba(23, 139, 141, 0.5)',
          }}
        >
          {[0, 50, 100].map((pos) => (
            <motion.div
              key={pos}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `${pos}%`,
                background: pos === 50 ? '#d4a574' : '#178B8D',
                boxShadow: `0 0 10px ${pos === 50 ? '#d4a574' : '#178B8D'}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: pos * 0.01,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
