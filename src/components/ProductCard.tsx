
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Heart, MapPin, Clock, Tag, Trash2, X} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const removeProduct = useStore(state => state.removeProduct);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'venda':
        return {
          color: 'bg-gradient-to-r from-green-400 to-green-600',
          text: 'Venda',
          textColor: 'text-green-700'
        };
      case 'doacao':
        return {
          color: 'bg-gradient-to-r from-blue-400 to-blue-600',
          text: 'Doação',
          textColor: 'text-blue-700'
        };
      case 'troca':
        return {
          color: 'bg-gradient-to-r from-purple-400 to-purple-600',
          text: 'Troca',
          textColor: 'text-purple-700'
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-400 to-gray-600',
          text: 'Outro',
          textColor: 'text-gray-700'
        };
    }
  };

  const categoryConfig = getCategoryConfig(product.category);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDeleteConfirm = () => {
    removeProduct(product.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group relative"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <span className={`${categoryConfig.color} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
              {categoryConfig.text}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-red-500/90 rounded-full shadow-lg hover:bg-red-500 transition-colors"
            >
              <Trash2 size={18} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1">
              {product.title}
            </h3>
            {product.price && (
              <div className="ml-3">
                <span className="text-2xl font-bold text-green-600">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                >
                  <Tag size={12} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Owner Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span>{product.owner.apartment}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>

          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Entrar em Contato
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Confirmar Exclusão</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir o produto "{product.title}"? 
                Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Excluir
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
