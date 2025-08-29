
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Menu, X, Home, Users, Plus, Search} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'residents', label: 'Moradores', icon: Users },
    { id: 'add-product', label: 'Adicionar Produto', icon: Plus },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-effect sticky top-0 z-50 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#983CEC] to-[#7C2CBF] flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 rounded-full bg-white/90 shadow-inner"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#983CEC] drop-shadow-lg">Condo-Ecommerce</h1>
              <p className="text-xs text-[#983CEC]/80">Conectando vizinhos</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-[#983CEC]/30 text-[#983CEC] shadow-lg border border-[#983CEC]/50'
                      : 'text-[#983CEC]/70 hover:text-[#983CEC] hover:bg-[#983CEC]/20 border border-transparent hover:border-[#983CEC]/30'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#983CEC]/20 text-[#983CEC] border border-[#983CEC]/30"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#983CEC]/30"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-[#983CEC]/30 text-[#983CEC] border border-[#983CEC]/50'
                      : 'text-[#983CEC]/70 hover:text-[#983CEC] hover:bg-[#983CEC]/20 border border-transparent hover:border-[#983CEC]/30'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
