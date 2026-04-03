'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdCard from '@/components/AdCard';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { Search, Filter, SlidersHorizontal, X, ChevronDown, Loader2, Fish, MapPin, DollarSign, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExplorePage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [locationTerm, setLocationTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'peixes', name: 'Peixes' },
    { id: 'camaroes', name: 'Camarões' },
    { id: 'alevinos', name: 'Alevinos' },
    { id: 'equipamentos', name: 'Equipamentos' },
    { id: 'ornamental', name: 'Ornamental' },
    { id: 'outros', name: 'Outros' }
  ];

  const fetchAds = async () => {
    try {
      setLoading(true);
      const supabase = getSupabaseClient();
      const { data, error: sbError } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      setAds(data || []);
    } catch (err: any) {
      console.error('Error fetching ads for explore:', err);
      setError('Não foi possível carregar os anúncios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      const matchSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || ad.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchMinPrice = minPrice === '' || Number(ad.price) >= Number(minPrice);
      const matchMaxPrice = maxPrice === '' || Number(ad.price) <= Number(maxPrice);
      const matchLocation = ad.location.toLowerCase().includes(locationTerm.toLowerCase());
      
      return matchSearch && matchCategory && matchMinPrice && matchMaxPrice && matchLocation;
    });
  }, [ads, searchTerm, selectedCategory, minPrice, maxPrice, locationTerm]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setLocationTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header & Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1F2A44] font-plus-jakarta mb-2">Explorar Mercado</h1>
          <p className="text-slate-500 font-medium mb-6">Encontre as melhores ofertas da aquicultura brasileira e negocie direto.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] transition-all outline-none font-medium text-[#1F2A44]"
              />
            </div>
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-2xl border border-slate-100 font-bold text-[#1F2A44] shadow-sm active:scale-95 transition-all"
            >
              <SlidersHorizontal size={20} />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24 h-fit space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1F2A44] flex items-center gap-2">
                  <Filter size={18} className="text-[#F5A623]" />
                  Filtros
                </h3>
                {(searchTerm || selectedCategory !== 'all' || minPrice || maxPrice || locationTerm) && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-bold text-[#F5A623] hover:underline"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag size={12} />
                  Categoria
                </p>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        selectedCategory === cat.id 
                        ? 'bg-[#1F2A44] text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} />
                  Localização
                </p>
                <input 
                  type="text" 
                  placeholder="Cidade ou Estado"
                  value={locationTerm}
                  onChange={(e) => setLocationTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#F5A623] outline-none transition-all font-medium"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign size={12} />
                  Preço por KG (R$)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    placeholder="Mín"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm outline-none font-medium text-center"
                  />
                  <input 
                    type="number" 
                    placeholder="Máx"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm outline-none font-medium text-center"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse">
                <Loader2 className="animate-spin text-[#F5A623] mb-4" size={48} />
                <p className="text-slate-400 font-bold">Carregando anúncios...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-12 rounded-3xl text-center border border-red-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <X className="text-red-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">{error}</h3>
                <button 
                  onClick={fetchAds}
                  className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg"
                >
                  Tentar Novamente
                </button>
              </div>
            ) : filteredAds.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl border border-slate-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Fish size={40} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-[#1F2A44] mb-2 font-plus-jakarta">Nenhum resultado encontrado</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">Não encontramos anúncios com os filtros aplicados. Tente usar termos mais genéricos.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-[#1F2A44] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredAds.map((ad) => (
                    <motion.div
                      key={ad.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AdCard 
                        id={ad.id}
                        title={ad.title}
                        price={typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price}
                        category={ad.category}
                        quantity={ad.quantity}
                        location={ad.location}
                        image={ad.image_url || 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=400&auto=format&fit=crop'}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-[60] shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[#1F2A44]">Filtros</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-slate-50 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categoria</p>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          selectedCategory === cat.id 
                          ? 'bg-[#1F2A44] text-white shadow-md' 
                          : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Localização</p>
                  <input 
                    type="text" 
                    placeholder="Cidade ou Estado"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#F5A623] outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preço por KG (R$)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="number" 
                      placeholder="Mín"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl text-sm outline-none font-medium text-center"
                    />
                    <input 
                      type="number" 
                      placeholder="Máx"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 border border-transparent rounded-xl text-sm outline-none font-medium text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-[#1F2A44] text-white py-4 rounded-2xl font-bold shadow-lg"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
