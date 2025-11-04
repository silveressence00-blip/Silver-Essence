import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { MapPin } from 'lucide-react';

export function InteractiveGlobe() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const shippingLocations = [
    { name: 'United States', top: '38%', left: '22%', delay: 0 },
    { name: 'Canada', top: '28%', left: '24%', delay: 0.15 },
    { name: 'Pakistan', top: '36%', left: '62%', delay: 0.3 },
    { name: 'India', top: '40%', left: '68%', delay: 0.45 },
    { name: 'Bangladesh', top: '42%', left: '72%', delay: 0.6 },
    { name: 'Saudi Arabia', top: '42%', left: '56%', delay: 0.7 },
    { name: 'UAE', top: '43%', left: '58%', delay: 0.8 },
    { name: 'Oman', top: '44%', left: '59%', delay: 0.85 },
    { name: 'Qatar', top: '42.5%', left: '57%', delay: 0.9 },
    { name: 'Kuwait', top: '40%', left: '56%', delay: 0.95 },
    { name: 'Bahrain', top: '42.5%', left: '57.5%', delay: 1.0 },
    { name: 'Iran', top: '38%', left: '58%', delay: 1.05 },
    { name: 'United Kingdom', top: '32%', left: '48%', delay: 1.1 },
    { name: 'France', top: '34%', left: '50%', delay: 1.2 },
    { name: 'Germany', top: '31%', left: '52%', delay: 1.3 },
    { name: 'Italy', top: '36%', left: '52%', delay: 1.4 },
    { name: 'Spain', top: '37%', left: '47%', delay: 1.5 },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-20">
      {/* Globe container with 3D perspective */}
      <div className="relative perspective-1000">
        <motion.div
          animate={{
            rotateY: rotation.y,
            rotateX: rotation.x,
          }}
          transition={{ type: 'spring', damping: 20 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main globe sphere */}
          <div className="relative w-full aspect-square max-w-2xl mx-auto">
            {/* Metallic outer glow - Optimized */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 124, 124, 0.4) 0%, rgba(192, 192, 192, 0.3) 40%, transparent 70%)',
                filter: 'blur(50px)',
                willChange: 'opacity, transform',
              }}
            />

            {/* Globe sphere with grid */}
            <div className="relative w-full h-full rounded-full overflow-hidden"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(0, 124, 124, 0.35), rgba(192, 192, 192, 0.18), rgba(0, 0, 0, 0.6) 70%)',
                   boxShadow: 'inset -30px -30px 80px rgba(0, 0, 0, 0.7), inset 30px 30px 80px rgba(0, 124, 124, 0.4), 0 0 80px rgba(0, 124, 124, 0.4), 0 0 50px rgba(192, 192, 192, 0.3)',
                 }}>
              
              {/* Latitude lines */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`lat-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0.3] }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="absolute left-1/2 -translate-x-1/2 border-t border-[#178B8D]/30"
                  style={{
                    top: `${(i + 1) * 11}%`,
                    width: `${Math.sin(((i + 1) / 9) * Math.PI) * 100}%`,
                  }}
                />
              ))}

              {/* Longitude lines */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`lon-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0.3] }}
                  transition={{ delay: i * 0.08, duration: 1 }}
                  className="absolute top-0 h-full border-l border-[#178B8D]/30"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              ))}

              {/* Animated dots pattern */}
              {[...Array(50)].map((_, i) => {
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                return (
                  <motion.div
                    key={`dot-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.5, 1, 0],
                      scale: [0, 1, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute w-1 h-1 rounded-full bg-[#178B8D]"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      boxShadow: '0 0 10px rgba(23, 139, 141, 0.8)',
                    }}
                  />
                );
              })}

              {/* Shipping location markers */}
              {shippingLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + location.delay, duration: 0.5 }}
                  className="absolute group"
                  style={{
                    top: location.top,
                    left: location.left,
                  }}
                >
                  {/* Pulsing marker */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: location.delay,
                    }}
                    className="absolute -inset-2 rounded-full bg-[#178B8D]"
                    style={{
                      filter: 'blur(4px)',
                    }}
                  />
                  
                  <MapPin className="w-5 h-5 text-[#C0C0C0] relative z-10" fill="#178B8D" />
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gradient-to-br from-[#178B8D] to-[#1DA5A7] px-3 py-1 rounded-lg text-white text-xs whitespace-nowrap"
                         style={{
                           boxShadow: '0 0 20px rgba(23, 139, 141, 0.6)',
                         }}>
                      {location.name}
                    </div>
                  </div>

                  {/* Connection lines */}
                  {index % 2 === 0 && (
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ delay: 1.5 + location.delay, duration: 1.5 }}
                      className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                      style={{ overflow: 'visible' }}
                    >
                      <motion.path
                        d={`M 0 0 Q ${Math.random() * 50 - 25} ${Math.random() * 50 - 25}, ${Math.random() * 100 - 50} ${Math.random() * 100 - 50}`}
                        stroke="#178B8D"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="4 4"
                        style={{
                          filter: 'drop-shadow(0 0 3px rgba(23, 139, 141, 0.8))',
                        }}
                      />
                    </motion.svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Highlight effect */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-1/2 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 60%)',
                filter: 'blur(20px)',
              }}
            />
          </div>

          {/* Orbital ring */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full border-2 border-dashed border-[#178B8D]/30"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(75deg)',
            }}
          />
        </motion.div>
      </div>

      {/* Shipping info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-center mt-12 space-y-4"
      >
        <p className="text-sm" style={{ color: '#E0E0E0' }}>
          Drag to rotate • Hover locations for details
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {['USA', 'Canada', 'Pakistan', 'India', 'Bangladesh', 'Saudi Arabia', 'UAE', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Iran', 'UK', 'France', 'Germany', 'Italy', 'Spain', 'All Europe'].map((country, i) => (
            <motion.span
              key={country}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 + i * 0.08, duration: 0.4 }}
              className="px-4 py-2 rounded-full text-xs tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(23, 139, 141, 0.25), rgba(255, 255, 255, 0.1))',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                boxShadow: '0 0 15px rgba(23, 139, 141, 0.2)',
              }}
            >
              {country}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
