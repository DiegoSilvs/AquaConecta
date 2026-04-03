'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, ChevronRight, Clock, MapPin, CheckCircle2, AlertCircle, Trash2, Edit, Plus, Fish, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Pedidos() {
  const [activeTab, setActiveTab] = useState<'compras' | 'anuncios'>('compras');
  const [user, setUser] = useState<any>(null);
  const [myAds, setMyAds] = useState<any[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const orders = [
    {
      id: 'ORD-2024-001',
      title: 'Tilápia Premium G3',
      quantity: '200kg',
      price: 'R$ 2.400,00',
      status: 'Em Trânsito',
      date: '28 Mar 2024',
      seller: 'Fazenda Águas Claras',
      image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'ORD-2024-002',
      title: 'Camarão Cinza 40/60',
      quantity: '50kg',
      price: 'R$ 1.425,00',
      status: 'Concluído',
      date: '15 Mar 2024',
      seller: 'Mariscos do Nordeste',
      image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const fetchMyAds = async (userId: string) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error: sbError } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      setMyAds(data || []);
    } catch (err: any) {
      console.error('Error fetching ads in pedidos:', err);
      setError('Não foi possível carregar seus anúncios.');
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        await fetchMyAds(user.id);
      }
    };
    getSession();
  }, [router]);

  const handleDeleteAd = async (adId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este anúncio?')) return;
    
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }

      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', adId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setMyAds(prevAds => prevAds.filter(ad => ad.id !== adId));
    } catch (err: any) {
      console.error('Erro ao excluir anúncio:', err);
      alert('Erro ao excluir anúncio: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1F2A44] font-plus-jakarta mb-2">Central de Pedidos</h1>
          <p className="text-slate-500 font-medium">Acompanhe suas compras e gerencie sua própria produção.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 mb-8 max-w-fit overflow-hidden">
          <button 
            onClick={() => setActiveTab('compras')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'compras' ? 'bg-[#1F2A44] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Compras & Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('anuncios')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'anuncios' ? 'bg-[#1F2A44] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Meus Anúncios
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'compras' ? (
            <motion.div 
              key="compras-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden relative flex-shrink-0">
                      <Image
                        src={order.image}
                        alt={order.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{order.id}</span>
                          <h3 className="text-xl font-bold text-[#1F2A44] font-plus-jakarta">{order.title}</h3>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit ${
                          order.status === 'Concluído' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {order.status === 'Concluído' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                          {order.status}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Quantidade</p>
                          <p className="text-sm font-bold text-[#1F2A44]">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total</p>
                          <p className="text-sm font-bold text-[#1F2A44]">{order.price}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Vendedor</p>
                          <p className="text-sm font-bold text-[#1F2A44] truncate">{order.seller}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Data</p>
                          <p className="text-sm font-bold text-[#1F2A44]">{order.date}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                      <button className="flex-1 md:flex-none px-6 py-3 bg-[#1F2A44] text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors active:scale-95">
                        Detalhes
                      </button>
                      <button className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-[#1F2A44] rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors active:scale-95">
                        Ajuda
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {orders.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package className="text-slate-300" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2A44] mb-2">Nenhum pedido encontrado</h3>
                  <p className="text-slate-500 mb-8">Navegue pelas ofertas e realize sua primeira compra!</p>
                  <Link href="/" className="inline-flex items-center gap-2 bg-[#F5A623] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95 shadow-md">
                    Explorar Ofertas
                    <ChevronRight size={18} />
                  </Link>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="anuncios-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1F2A44] font-plus-jakarta">Meus Anúncios Publicados</h2>
                <Link 
                  href="/create-ad" 
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e0961b] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  <Plus size={18} />
                  Anunciar
                </Link>
              </div>

              {loadingAds ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100">
                  <Loader2 className="animate-spin text-[#F5A623] mb-4" size={32} />
                  <p className="text-slate-500 font-bold">Carregando seus anúncios...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myAds.map((ad: any) => (
                    <div 
                      key={ad.id} 
                      className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                    >
                      <div className="relative w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                        <Image 
                          src={ad.image_url || 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=400&auto=format&fit=crop'} 
                          alt={ad.title} 
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left space-y-1">
                        <h3 className="text-lg font-bold text-[#1F2A44]">{ad.title}</h3>
                        <p className="text-sm text-slate-500 font-medium">{ad.location} • {ad.quantity}</p>
                        <p className="text-[#F5A623] font-black text-xl">R$ {typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price}/kg</p>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto relative z-50 pointer-events-auto">
                        <Link 
                          href={`/edit-ad/${ad.id}`}
                          className="flex-1 sm:flex-none px-5 py-3 bg-slate-50 hover:bg-[#F5A623] text-[#1F2A44] hover:text-white rounded-2xl transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-sm active:scale-95"
                        >
                          <Edit size={16} />
                          <span>Editar</span>
                        </Link>
                        <button 
                          onClick={() => handleDeleteAd(ad.id)}
                          className="flex-1 sm:flex-none px-4 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all flex items-center justify-center gap-2 font-bold text-sm active:scale-95"
                        >
                          <Trash2 size={16} />
                          <span>Excluir</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {myAds.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                        <Fish className="text-slate-300" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2A44] mb-2">Você não possui anúncios</h3>
                      <p className="text-slate-500 mb-8">Comece agora a anunciar sua produção para compradores de todo o país.</p>
                      <Link href="/create-ad" className="inline-flex items-center gap-2 bg-[#1F2A44] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
                        Criar Meu Primeiro Anúncio
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
