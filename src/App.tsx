
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ResidentsPage from './pages/ResidentsPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'residents':
        return <ResidentsPage />;
      case 'add-product':
        return <AddProductPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/10 backdrop-blur-lg border-t border-white/20 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Condo-Ecommerce</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Conectando vizinhos através de uma plataforma moderna para vendas, 
                doações e trocas no condomínio.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="hover:text-purple-600 transition-colors"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('residents')}
                    className="hover:text-purple-600 transition-colors"
                  >
                    Moradores
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('add-product')}
                    className="hover:text-purple-600 transition-colors"
                  >
                    Adicionar Produto
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-4">Contato</h4>
              <p className="text-sm text-gray-600">
                Para suporte técnico ou dúvidas sobre a plataforma, 
                entre em contato com a administração do condomínio.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Condo-Ecommerce. Desenvolvido com ❤️ para nossa comunidade.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
