'use client';

import React, { useState, useEffect, use } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { MapPin, Package, Fish, ChevronRight, ArrowLeft, AlertCircle, Loader2, DollarSign, Tag, Info, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function AdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAd = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = getSupabaseClient();
      const { data, error: sbError } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .single();

      if (sbError) throw sbError;
      if (!data) {
        setError('Anúncio não encontrado.');
      } else {
        setAd(data);
      }
    } catch (err: any) {
      console.error('Error fetching ad detail:', err);
      setError('Não foi possível carregar os detalhes do anúncio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-16 px-4 animate-pulse max-w-7xl mx-auto w-full">
          <div className="h-6 bg-slate-200 rounded w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="aspect-[4/3] bg-slate-200 rounded-3xl" />
            <div className="space-y-6">
              <div className="h-10 bg-slate-200 rounded w-3/4" />
              <div className="h-6 bg-slate-200 rounded w-1/4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-slate-200 rounded-2xl" />
                <div className="h-20 bg-slate-200 rounded-2xl" />
              </div>
              <div className="h-40 bg-slate-200 rounded-3xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-16 px-4 flex flex-col items-center justify-center text-center">
          <div className="bg-red-50 text-red-500 p-6 rounded-full mb-6">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2A44] mb-2">{error || 'Ops! Ocorreu um erro'}</h2>
          <p className="text-slate-500 mb-8 max-w-md">Não conseguimos encontrar o anúncio que você está procurando ou houve uma falha na conexão.</p>
          <div className="flex gap-4">
            <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-[#1F2A44] rounded-xl font-bold hover:bg-slate-200 transition-colors">
              <ArrowLeft size={18} />
              Voltar para Início
            </Link>
            <button onClick={() => fetchAd()} className="bg-[#1F2A44] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Tentar novamente
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-[#1F2A44] transition-colors">Início</Link>
          <ChevronRight size={14} />
          <span className="text-[#1F2A44] font-semibold">Detalhes do Anúncio</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Ad Image & Description */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100"
            >
              <Image 
                src={ad.image_url || 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=1200&auto=format&fit=crop'} 
                alt={ad.title} 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#F5A623] text-white px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase z-10 shadow-lg">
                {ad.category || 'Peixaria'}
              </div>
            </motion.div>

            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-2xl font-bold text-[#1F2A44] font-plus-jakarta flex items-center gap-2">
                <Info size={24} className="text-[#F5A623]" />
                Descrição
              </h2>
              <p className="text-slate-500 leading-relaxed whitespace-pre-wrap">
                {ad.description || 'Nenhuma descrição fornecida para este anúncio.'}
              </p>
            </div>
          </div>

          {/* Sidebar - Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#1F2A44] leading-tight mb-4 font-plus-jakarta">
                    {ad.title}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={18} className="text-[#F5A623]" />
                    <span className="font-medium">{ad.location}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Preço Sugerido / KG</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#1F2A44]">R$</span>
                      <span className="text-5xl font-black text-[#1F2A44]">
                        {typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 py-6 border-y border-slate-100">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#F5A623]">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quantidade</p>
                      <p className="text-lg font-bold text-[#1F2A44]">{ad.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#F5A623]">
                      <Tag size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Categoria</p>
                      <p className="text-lg font-bold text-[#1F2A44] capitalize">{ad.category}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {ad.phone && (
                    <a 
                      href={`https://wa.me/${ad.phone.replace(/\D/g, '')}`} 
                      className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg active:scale-95"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={20} />
                      Falar com Produtor
                    </a>
                  )}
                  <div className="p-4 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100">
                    <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Este anúncio foi publicado em {new Date(ad.created_at).toLocaleDateString('pt-BR')}. Entre em contato para verificar disponibilidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
