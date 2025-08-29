
import React from 'react';
import { motion } from 'framer-motion';
import {Search, Filter, ShoppingBag, Gift, RefreshCw} from 'lucide-react';
import { useStore } from '../store/useStore';

const SearchAndFilter: React.FC = () => {
  const { selectedCategory, searchTerm, setSelectedCategory, setSearchTerm } = useStore();

  const categories = [
    { id: 'todos', label: 'Todos', icon: Filter, color: 'from-gray-400 to-gray-600' },
    { id: 'venda', label: 'Vendas', icon: ShoppingBag, color: 'from-green-400 to-green-600' },
    { id: 'doacao', label: 'Doações', icon: Gift, color: 'from-blue-400 to-blue-600' },
    { id: 'troca', label: 'Trocas', icon: RefreshCw, color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative flex items-center justify-center space-x-2 p-4 rounded-xl transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{category.label}</span>
              
              {isSelected && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== 'todos') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Filtros ativos:</span>
            {searchTerm && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">
                "{searchTerm}"
              </span>
            )}
            {selectedCategory !== 'todos' && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">
                {categories.find(c => c.id === selectedCategory)?.label}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todos');
              }}
              className="text-purple-600 hover:text-purple-800 underline"
            >
              Limpar filtros
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchAndFilter;
