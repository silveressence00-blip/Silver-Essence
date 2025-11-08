import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, Award, Users } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every piece crafted from 925 sterling silver with options for 18K gold or rose gold plating.',
      color: '#178B8D',
    },
    {
      icon: Heart,
      title: 'Passionate Craftsmanship',
      description: 'Italian-inspired designs that blend traditional techniques with modern elegance.',
      color: '#d4a574',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated to providing exceptional service and creating jewelry that tells your story.',
      color: '#C0C0C0',
    },
  ];

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
            <Sparkles 
              className="w-16 h-16"
              style={{
                color: '#178B8D',
                filter: 'drop-shadow(0 0 20px #178B8D) drop-shadow(0 0 40px #C0C0C0)',
              }}
            />
          </motion.div>

          <h1 
            className="text-7xl tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #178B8D 30%, #C0C0C0 60%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
            }}
          >
            ABOUT US
          </h1>
          <p className="text-xl tracking-wide" style={{ color: '#E0E0E0' }}>
            Crafting Timeless Elegance Since Our Beginning
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20"
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
              <p className="text-xl mb-6 leading-relaxed" style={{ color: '#E0E0E0' }}>
                Welcome to <span style={{ color: '#178B8D', fontWeight: '600' }}>Silver Essence</span>, 
                where luxury meets craftsmanship. We are dedicated to creating exquisite jewelry pieces 
                that embody elegance, sophistication, and timeless beauty.
              </p>

              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#C0C0C0' }}>
               We believe that jewelry shouldn't be reserved for special occasions—it should be a part of your 
               daily life. At Silver essence, our philosophy is simple: create elegant, durable silver jewelry that
               tells your story and can be cherished for decades
              </p>

              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#C0C0C0' }}>
                Our Founder, <span style={{ color: '#178B8D', fontWeight: '600' }}>Danish Riaz</span>, started this store after realizing that the best pieces in their personal
                collection were those made of solid, time-tested silver. They were inspired to design a line that
                combined the heirloom quality of classic silver with modern, minimalist sensibilities.
                We choose to work exclusively with Silver (.925) because it is the "forever metal". It's naturally
                brilliant, hypoallergenic, and uniquely capable of taking on the soft patina of time, making each
                piece truly unique to its wearer.
              </p>

              <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                Lead Designer <span style={{ color: '#178B8D', fontWeight: '600' }}>Furqan</span>, 
                The establisher and lead designer here at Silver Essence. This store is
                truly a labor of love, driven by my fascination with how simple lines and quality metals can transform an outfit and boost confidence
                Thank you for visiting, and for supporting a small business built on passion and lasting quality. 
                hope our jewelry helps you celebrate the big moments and find joy in the everyday moments, too.
                Explore our newest collection of everyday Silver Essence.
            
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 
            className="text-4xl tracking-widest mb-12 text-center"
            style={{
              background: 'linear-gradient(90deg, #ffffff, #178B8D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            WHY CHOOSE US
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border-2 backdrop-blur-xl text-center"
                style={{
                  background: 'rgba(15, 15, 20, 0.95)',
                  borderColor: `${feature.color}40`,
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="mb-6 inline-block"
                >
                  <feature.icon 
                    className="w-12 h-12"
                    style={{
                      color: feature.color,
                      filter: `drop-shadow(0 0 20px ${feature.color})`,
                    }}
                  />
                </motion.div>

                <h3 
                  className="text-2xl mb-4 tracking-wide"
                  style={{ color: '#ffffff' }}
                >
                  {feature.title}
                </h3>

                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: '#C0C0C0' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="h-[2px] w-96 mx-auto my-20"
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
