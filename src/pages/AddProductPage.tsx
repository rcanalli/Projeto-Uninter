
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Upload, Plus, X, Tag, DollarSign, Package} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types';

const AddProductPage: React.FC = () => {
  const { addProduct, residents } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'venda' as 'venda' | 'doacao' | 'troca',
    images: [''],
    ownerName: '',
    apartment: '',
    contact: '',
    tags: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : undefined,
        category: formData.category,
        images: formData.images.filter(img => img.trim() !== ''),
        owner: {
          name: formData.ownerName,
          apartment: formData.apartment,
          contact: formData.contact
        },
        createdAt: new Date().toISOString(),
        status: 'disponivel',
        tags: formData.tags.filter(tag => tag.trim() !== '')
      };

      addProduct(newProduct);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'venda',
        images: [''],
        ownerName: '',
        apartment: '',
        contact: '',
        tags: ['']
      });

      // Show success message (you can implement toast notification here)
      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addTagField = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTagField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTagField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const categoryOptions = [
    { value: 'venda', label: 'Venda', color: 'from-green-400 to-green-600', icon: DollarSign },
    { value: 'doacao', label: 'Doação', color: 'from-blue-400 to-blue-600', icon: Package },
    { value: 'troca', label: 'Troca', color: 'from-purple-400 to-purple-600', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Adicionar Novo Produto
          </h1>
          <p className="text-gray-600">
            Compartilhe seus produtos com a comunidade do condomínio
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações Básicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Produto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ex: Sofá 3 lugares em couro"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Descreva detalhadamente o produto, seu estado de conservação, características importantes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {categoryOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, category: option.value as any })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.category === option.value
                            ? `bg-gradient-to-r ${option.color} text-white border-transparent`
                            : 'border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <Icon size={20} className="mx-auto mb-2" />
                        <div className="text-sm font-medium">{option.label}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {formData.category === 'venda' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (R$)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Imagens
            </h3>
            
            <div className="space-y-4">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="URL da imagem (ex: https://images.pexels.com/...)"
                    />
                  </div>
                  {formData.images.length > 1 && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </div>
              ))}
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addImageField}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                <Plus size={18} />
                <span>Adicionar mais uma imagem</span>
              </motion.button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Upload size={20} className="text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Dica para imagens:</p>
                  <p>Use URLs de imagens do Pexels ou outros sites de imagens gratuitas. Certifique-se de que as URLs terminam com extensões como .jpg, .png ou .webp.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Tags (opcional)
            </h3>
            
            <div className="space-y-4">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTagField(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Ex: móveis, eletrônicos, roupas..."
                    />
                  </div>
                  {formData.tags.length > 1 && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTagField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </div>
              ))}
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addTagField}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                <Tag size={18} />
                <span>Adicionar mais uma tag</span>
              </motion.button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações de Contato
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartamento *
                </label>
                <input
                  type="text"
                  required
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ex: Apto 301"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contato *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Produto'}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddProductPage;
