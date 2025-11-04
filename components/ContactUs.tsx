import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'sliveressence00@gmail.com',
      subtext: 'We reply within 24 hours',
      color: '#007C7C',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+968 78720330',
      subtext: 'Mon-Fri, 9AM-6PM EST',
      color: '#C0C0C0',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '12.M floor, Al Noor Building',
      subtext: 'Next to KIMS Hospital, Darsait, Muscat, Sultanate of Oman',
      color: '#d4a574',
    },
  ];

  return (
    <section 
      className="relative py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: '#0a0a0c',
      }}
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              top: `${15 + i * 20}%`,
              left: `${10 + i * 20}%`,
              width: `${250 + i * 80}px`,
              height: `${250 + i * 80}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(0, 124, 124, 0.1), transparent)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(192, 192, 192, 0.08), transparent)'
                : 'radial-gradient(circle, rgba(212, 165, 116, 0.06), transparent)',
              filter: 'blur(80px)',
            }}
          />
        ))}
      </div>

      {/* Particle trails */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => 
              `radial-gradient(circle 300px at ${x}px ${y}px, rgba(0, 124, 124, 0.15), transparent)`
          ),
        }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                color: '#007C7C',
                filter: 'drop-shadow(0 0 20px #007C7C) drop-shadow(0 0 40px #C0C0C0)',
              }}
            />
          </motion.div>

          <h2 
            className="text-6xl tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #007C7C 30%, #C0C0C0 60%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
            }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-xl tracking-wide" style={{ color: '#E0E0E0' }}>
            We'd love to hear from you. Let's create something extraordinary together.
          </p>
        </motion.div>

        {/* Floating 3D Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              {/* Holographic glow */}
              <motion.div
                animate={{
                  opacity: hoveredCard === index ? [0.4, 0.7, 0.4] : 0.3,
                  scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -inset-4 rounded-2xl"
                style={{
                  background: `radial-gradient(circle, ${card.color}40, transparent)`,
                  filter: 'blur(30px)',
                }}
              />

              <motion.div
                animate={{
                  rotateY: hoveredCard === index ? [0, 5, -5, 0] : 0,
                  z: hoveredCard === index ? 50 : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredCard === index ? Infinity : 0,
                }}
                className="relative p-8 rounded-2xl border-2 backdrop-blur-xl"
                style={{
                  background: 'rgba(15, 15, 20, 0.95)',
                  borderColor: hoveredCard === index ? card.color : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: hoveredCard === index 
                    ? `0 20px 60px ${card.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                    : '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated particles inside card */}
                {hoveredCard === index && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: card.color,
                      boxShadow: `0 0 10px ${card.color}`,
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}

                {/* Icon with 3D effect */}
                <motion.div
                  animate={{
                    rotateY: hoveredCard === index ? 360 : 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="mb-6 inline-block"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <card.icon 
                    className="w-12 h-12"
                    style={{
                      color: card.color,
                      filter: `drop-shadow(0 0 20px ${card.color})`,
                    }}
                  />
                </motion.div>

                <h3 
                  className="text-2xl mb-3 tracking-wide"
                  style={{ 
                    color: '#ffffff',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {card.title}
                </h3>
                
                <p 
                  className="text-xl mb-2"
                  style={{ 
                    color: card.color,
                    textShadow: `0 0 10px ${card.color}`,
                  }}
                >
                  {card.content}
                </p>
                
                <p className="text-sm" style={{ color: '#C0C0C0' }}>
                  {card.subtext}
                </p>

                {/* Holographic scan line */}
                {hoveredCard === index && (
                  <motion.div
                    animate={{
                      y: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 w-full h-1"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Futuristic Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-3xl mx-auto relative"
        >
          {/* Form glow background */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -inset-8 rounded-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0, 124, 124, 0.3), rgba(192, 192, 192, 0.2), transparent)',
              filter: 'blur(50px)',
            }}
          />

          <div 
            className="relative p-10 rounded-3xl border-2 backdrop-blur-xl"
            style={{
              background: 'rgba(15, 15, 20, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label 
                  className="block mb-3 tracking-wider"
                  style={{ color: '#ffffff' }}
                >
                  YOUR NAME
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(0, 124, 124, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007C7C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
              </div>

              {/* Email Input */}
              <div>
                <label 
                  className="block mb-3 tracking-wider"
                  style={{ color: '#ffffff' }}
                >
                  EMAIL ADDRESS
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(0, 124, 124, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007C7C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
              </div>

              {/* Message Input */}
              <div>
                <label 
                  className="block mb-3 tracking-wider"
                  style={{ color: '#ffffff' }}
                >
                  YOUR MESSAGE
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-6 py-4 rounded-xl border-2 backdrop-blur-sm outline-none transition-all duration-300 resize-none"
                  style={{
                    background: 'rgba(20, 20, 25, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007C7C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
              </div>

              {/* Submit Button with Particle Effect */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full py-5 rounded-xl overflow-hidden group"
                style={{
                  background: submitted 
                    ? 'linear-gradient(135deg, #00cc00 0%, #00ff00 100%)'
                    : 'linear-gradient(135deg, #007C7C 0%, #C0C0C0 50%, #007C7C 100%)',
                  boxShadow: '0 20px 60px rgba(0, 124, 124, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Button particles */}
                {!submitted && !isSubmitting && [...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: ['100%', '-100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute w-1 h-8"
                    style={{
                      left: `${i * 10}%`,
                      background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.5), transparent)',
                    }}
                  />
                ))}

                {/* Button shine */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 w-1/3"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-3 text-white tracking-widest font-bold text-center w-full">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      SENDING...
                    </>
                  ) : submitted ? (
                    <>✓ MESSAGE SENT!</>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 5 }}>
          {contactCards.map((_, i) => (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: 1 + i * 0.3 }}
              x1={`${20 + i * 30}%`}
              y1="30%"
              x2="50%"
              y2="70%"
              stroke="#007C7C"
              strokeWidth="2"
              strokeDasharray="5 5"
              style={{
                filter: 'drop-shadow(0 0 5px #007C7C)',
              }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}