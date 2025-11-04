import { motion } from 'framer-motion';
import { Star, Facebook, Instagram, Music, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: 'about' | 'privacy' | 'terms' | 'refund') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = [
    { label: 'About Us', action: () => onNavigate('about') },
    { label: 'Privacy Policy', action: () => onNavigate('privacy') },
    { label: 'Terms & Conditions', action: () => onNavigate('terms') },
    { label: 'Refund Policy', action: () => onNavigate('refund') },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1GHYhkBNzm/' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/silver_essences?igsh=NjNiM3FreWRmZzhz' },
    { icon: Music, label: 'TikTok', href: 'https://www.tiktok.com/@silver.essences?_t=ZS-90QqJlxcJUY&_r=1' },
  ];

  return (
    <footer 
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(26, 26, 28, 0.9) 0%, rgba(10, 10, 12, 1) 100%)',
        borderTop: '2px solid rgba(23, 139, 141, 0.3)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: i % 2 === 0 ? '#178B8D' : '#d4a574',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#178B8D' : '#d4a574'}`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <div>
            <Logo />
            <p className="mt-6 text-lg tracking-wide" style={{ color: '#C0C0C0' }}>
              Italian craftsmanship meets modern elegance. Each piece tells a story of luxury and timeless beauty.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(23, 139, 141, 0.2), rgba(192, 192, 192, 0.1))',
                    border: '1px solid rgba(23, 139, 141, 0.3)',
                  }}
                >
                  <social.icon className="w-5 h-5" style={{ color: '#178B8D' }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-2xl mb-6 tracking-widest"
              style={{
                color: '#ffffff',
                textShadow: '0 0 20px rgba(23, 139, 141, 0.5)',
              }}
            >
              QUICK LINKS
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={link.action}
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-2 tracking-wide transition-all"
                    style={{ color: '#C0C0C0' }}
                  >
                    <Star 
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#d4a574' }}
                      fill="#d4a574"
                    />
                    <span className="group-hover:text-[#ffffff] transition-colors">
                      {link.label}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="text-2xl mb-6 tracking-widest"
              style={{
                color: '#ffffff',
                textShadow: '0 0 20px rgba(23, 139, 141, 0.5)',
              }}
            >
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1" style={{ color: '#178B8D' }} />
                <div>
                  <p className="text-sm" style={{ color: '#9a9aa5' }}>Email</p>
                  <a 
                    href="mailto:sliveressence00@gmail.com"
                    className="tracking-wide hover:text-[#178B8D] transition-colors"
                    style={{ color: '#C0C0C0' }}
                  >
                    sliveressence00@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1" style={{ color: '#178B8D' }} />
                <div>
                  <p className="text-sm" style={{ color: '#9a9aa5' }}>Phone</p>
                  <a 
                    href="tel:+96878720330"
                    className="tracking-wide hover:text-[#178B8D] transition-colors"
                    style={{ color: '#C0C0C0' }}
                  >
                    +968 78720330
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" style={{ color: '#178B8D' }} />
                <div>
                  <p className="text-sm" style={{ color: '#9a9aa5' }}>Location</p>
                  <p className="tracking-wide" style={{ color: '#C0C0C0' }}>
                    12.M floor, Al Noor Building<br />
                    Next to KIMS Hospital, Darsait<br />
                    Muscat, Sultanate of Oman
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t"
          style={{
            borderColor: 'rgba(23, 139, 141, 0.2)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="tracking-wide" style={{ color: '#9a9aa5' }}>
              © 2025 Silver Essence. All rights reserved.
            </p>
            
            {/* Decorative Elements */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: i === 2 ? '#d4a574' : '#178B8D',
                    boxShadow: `0 0 10px ${i === 2 ? '#d4a574' : '#178B8D'}`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <p className="tracking-widest" style={{ color: '#9a9aa5' }}>
              Crafted with ✨ Excellence
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
