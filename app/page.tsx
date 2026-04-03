'use client';

import React, { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdCard from '@/components/AdCard';
import Image from 'next/image';
import { MapPin, Fish, DollarSign, ArrowRight, ShieldCheck, TrendingUp, Grid, List, ChevronDown, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = getSupabaseClient();
      const { data, error: sbError } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (sbError) throw sbError;
      setAds(data || []);
    } catch (err: any) {
      console.error('Error fetching ads:', err);
      setError('Não foi possível carregar os anúncios no momento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full mb-6 shadow-sm border border-slate-100"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-600 tracking-wider uppercase">MERCADO ATIVO HOJE</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1F2A44] leading-tight mb-4 font-plus-jakarta"
              >
                Conectando a <span className="text-[#F5A623]">Piscicultura</span> de ponta a ponta.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg max-w-md mb-8 leading-relaxed"
              >
                O porto seguro para o produtor rural negociar sua produção de forma direta, rápida e com valor justo.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">TILÁPIA MÉDIA</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#1F2A44]">R$ 9,80/kg</span>
                    <span className="text-green-500 text-xs font-bold">↑ 2.4%</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">CAMARÃO CINZA</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#1F2A44]">R$ 24,50/kg</span>
                    <span className="text-red-500 text-xs font-bold">↓ 0.8%</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=1200&auto=format&fit=crop" 
                alt="Piscicultura" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/40 to-transparent"></div>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mb-12 sticky top-[80px] md:top-[100px] z-40">
          <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col md:flex-row gap-2 items-center border border-slate-100">
            <div className="flex-1 w-full flex items-center gap-3 px-4 border-r-0 md:border-r border-slate-100 py-2 md:py-0">
              <MapPin className="text-[#F5A623]" size={20} />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Localização</label>
                <input 
                  type="text" 
                  placeholder="Cidade ou Estado" 
                  className="w-full border-none p-0 text-sm focus:ring-0 placeholder:text-slate-300 font-medium text-[#1F2A44]"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-3 px-4 border-r-0 md:border-r border-slate-100 py-2 md:py-0">
              <Fish className="text-[#F5A623]" size={20} />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tipo de Peixe</label>
                <div className="relative">
                  <select className="w-full border-none p-0 text-sm focus:ring-0 font-medium appearance-none bg-transparent text-[#1F2A44] pr-6">
                    <option>Todos os tipos</option>
                    <option>Tilápia</option>
                    <option>Camarão</option>
                    <option>Tambaqui</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 md:py-0">
              <DollarSign className="text-[#F5A623]" size={20} />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preço Máximo</label>
                <input 
                  type="text" 
                  placeholder="R$ por kg" 
                  className="w-full border-none p-0 text-sm focus:ring-0 placeholder:text-slate-300 font-medium text-[#1F2A44]"
                />
              </div>
            </div>
            
            <button className="w-full md:w-auto bg-[#1F2A44] text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Filtrar Resultados
            </button>
          </div>
        </section>

        {/* Listings */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1F2A44] font-plus-jakarta">Anúncios Recentes</h2>
              <p className="text-slate-500 text-sm">Mostrando as melhores ofertas da sua região</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#1F2A44] transition-colors">
                <Grid size={20} />
              </button>
              <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#1F2A44] transition-colors">
                <List size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-[400px] animate-pulse">
                  <div className="h-56 bg-slate-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="space-y-2 mt-4">
                      <div className="h-4 bg-slate-200 rounded w-full" />
                      <div className="h-4 bg-slate-200 rounded w-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error State
              <div className="col-span-full py-12 flex flex-col items-center text-center">
                <div className="bg-red-50 text-red-500 p-4 rounded-full mb-4">
                  <Plus className="rotate-45" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1F2A44] mb-2">Ops! Algo deu errado</h3>
                <p className="text-slate-500 mb-6">{error}</p>
                <button 
                  onClick={() => fetchAds()}
                  className="bg-[#1F2A44] text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : ads.length === 0 ? (
              // Empty State
              <div className="col-span-full py-20 flex flex-col items-center text-center">
                <div className="bg-slate-100 text-slate-400 p-6 rounded-full mb-6">
                  <Fish size={48} className="opacity-20" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1F2A44] mb-2 font-plus-jakarta">Nenhum anúncio encontrado</h3>
                <p className="text-slate-500 max-w-sm mb-8">Parece que ainda não temos ofertas nesta categoria ou região. Seja o primeiro a anunciar!</p>
                <Link 
                  href="/create-ad"
                  className="bg-[#F5A623] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Criar Anúncio
                </Link>
              </div>
            ) : (
              // Real Data
              ads.map((ad: any) => (
                <AdCard 
                  key={ad.id} 
                  id={ad.id}
                  title={ad.title}
                  price={typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price}
                  category={ad.category}
                  quantity={ad.quantity}
                  location={ad.location}
                  image={ad.image_url || 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=800&auto=format&fit=crop'}
                />
              ))
            )}
          </div>
          
          {!loading && !error && ads.length > 0 && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-2xl border border-slate-200 font-bold text-[#1F2A44] hover:bg-slate-50 transition-colors shadow-sm">
                Ver mais ofertas
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </section>

        {/* Bento Grid Benefits */}
        <section className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#1F2A44] text-white p-10 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10 max-w-sm">
                <h2 className="text-3xl font-extrabold mb-4 font-plus-jakarta">Venda sem atravessadores.</h2>
                <p className="text-slate-300 mb-8">Nossa plataforma garante que o lucro da produção fique no bolso de quem realmente produz.</p>
                <Link 
                  href="/create-ad"
                  className="inline-block bg-[#F5A623] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-900/20"
                >
                  Começar Agora
                </Link>
              </div>
              <TrendingUp size={200} className="absolute -bottom-10 -right-10 text-white opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>
            
            <div className="bg-slate-200 p-8 rounded-3xl flex flex-col justify-between">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-[#1F2A44]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1F2A44] mb-2 font-plus-jakarta">Segurança Total</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Verificação completa de produtores e compradores para sua tranquilidade.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile FAB */}
      <Link 
        href="/create-ad"
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-[#F5A623] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
