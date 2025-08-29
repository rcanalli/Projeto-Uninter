
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {TrendingUp, Users, Package, Heart} from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import SearchAndFilter from '../components/SearchAndFilter';

const HomePage: React.FC = () => {
  const { products, residents, selectedCategory, searchTerm } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const stats = [
    {
      icon: Package,
      label: 'Produtos Ativos',
      value: products.length,
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Users,
      label: 'Moradores Cadastrados',
      value: residents.length,
      color: 'from-green-400 to-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Transações Este Mês',
      value: 12,
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Heart,
      label: 'Doações Realizadas',
      value: 8,
      color: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Conecte-se com seus
              <span className="gradient-text block">vizinhos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra produtos incríveis para venda, doação ou troca no seu condomínio. 
              Uma plataforma moderna que conecta vizinhos e fortalece a comunidade.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SearchAndFilter />

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Produtos Recentes
            </h2>
            <div className="text-sm text-gray-600">
              {filteredProducts.length} produto(s) encontrado(s)
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Não encontramos produtos que correspondam aos seus filtros. 
                Tente ajustar os critérios de busca.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
