import { motion } from 'framer-motion';
const logoImage = '/logo.png';

export function Logo() {
  return (
    <div className="flex items-center gap-4">
      {/* Animated glowing logo icon - Your Actual Logo */}
      <motion.div
        animate={{ 
          filter: [
            'drop-shadow(0 0 10px rgba(23, 139, 141, 0.6)) drop-shadow(0 0 20px rgba(192, 192, 192, 0.4))',
            'drop-shadow(0 0 25px rgba(23, 139, 141, 0.9)) drop-shadow(0 0 40px rgba(192, 192, 192, 0.7))',
            'drop-shadow(0 0 10px rgba(23, 139, 141, 0.6)) drop-shadow(0 0 20px rgba(192, 192, 192, 0.4))'
          ],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 relative"
      >
        {/* Your Actual Silver Essence Logo */}
        <img 
          src={logoImage} 
          alt="Silver Essence Logo" 
          className="w-full h-full object-contain"
          style={{
            filter: 'brightness(1.1) contrast(1.1)',
          }}
        />
        
        {/* Additional glow effect behind logo */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(23, 139, 141, 0.4), transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </motion.div>
      
      {/* Brand name with premium styling */}
      <motion.div
        animate={{
          filter: [
            'drop-shadow(0 0 5px rgba(23, 139, 141, 0.3))',
            'drop-shadow(0 0 15px rgba(23, 139, 141, 0.6))',
            'drop-shadow(0 0 5px rgba(23, 139, 141, 0.3))'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="uppercase tracking-[0.25em]"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: '1.5rem',
            fontWeight: '300',
            letterSpacing: '0.25em',
            textShadow: '0 0 20px rgba(23, 139, 141, 0.5), 0 0 40px rgba(192, 192, 192, 0.3)',
          }}
        >
          <span style={{ color: '#C0C0C0' }}>SILVER </span>
          <span style={{ color: '#008080' }}>ESSENCE</span>
        </div>
      </motion.div>
    </div>
  );
}
