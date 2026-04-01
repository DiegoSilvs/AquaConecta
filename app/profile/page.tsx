'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { MapPin, Calendar, Star, Edit, Trash2, Camera, Grid, List, Plus, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [myAds, setMyAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        
        // Fetch profile data from CRUD table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }

        // Fetch user ads
        const { data: adsData } = await supabase
          .from('ads')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (adsData) {
          setMyAds(adsData);
        }
        
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    location: '',
    phone: ''
  });

  const startEditing = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        location: profile.location || '',
        phone: profile.phone || ''
      });
    }
    setIsEditing(true);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editForm.full_name,
        location: editForm.location,
        phone: editForm.phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      alert('Erro ao atualizar perfil: ' + error.message);
    } else {
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    }
  };

  const handleDeleteAd = async (adId: string) => {
    if (!supabase) return;
    if (!confirm('Tem certeza que deseja excluir este anúncio?')) return;

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', adId);

    if (error) {
      alert('Erro ao excluir anúncio: ' + error.message);
    } else {
      setMyAds(myAds.filter(ad => ad.id !== adId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#F5A623]" size={48} />
        <p className="mt-4 text-[#1F2A44] font-bold">Carregando perfil...</p>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md text-center">
            <h1 className="text-2xl font-bold text-[#1F2A44] mb-4">Configuração Necessária</h1>
            <p className="text-slate-500 mb-6">
              Supabase não está configurado. Por favor, adicione as chaves <code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> e <code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no painel de segredos.
            </p>
            <Link href="/" className="text-[#F5A623] font-bold hover:underline">
              Voltar para o Início
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const role = user?.user_metadata?.role === 'produtor' ? 'Produtor Rural' : 'Comprador';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24">
        {/* Profile Header */}
        <header className="bg-white px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-slate-100 relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                    alt={user?.email || 'Usuário'} 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-[#1F2A44] transition-colors border border-slate-100">
                  <Camera size={18} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F2A44] tracking-tight font-plus-jakarta truncate max-w-md">
                    {profile?.full_name || user?.email?.split('@')[0]}
                  </h1>
                  <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-[#F5A623] text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {profile?.role === 'produtor' ? 'Produtor Rural' : 'Comprador'}
                  </span>
                </div>
                <p className="text-slate-500 max-w-lg mb-6 leading-relaxed">
                  {user?.email}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                    <MapPin size={16} className="text-[#F5A623]" />
                    <span className="text-sm font-medium text-[#1F2A44]">{profile?.location || 'Localização não definida'}</span>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                    <Calendar size={16} className="text-[#F5A623]" />
                    <span className="text-sm font-medium text-[#1F2A44]">
                      Desde {new Date(user?.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => isEditing ? setIsEditing(false) : startEditing()}
                  className={`px-6 py-3 font-bold rounded-xl transition-colors ${
                    isEditing ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-[#1F2A44] hover:bg-slate-200'
                  }`}
                >
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors" 
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>

            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100"
              >
                <h3 className="text-xl font-bold text-[#1F2A44] mb-6 font-plus-jakarta">Atualizar Informações</h3>
                <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
                    <input 
                      type="text" 
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                      className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Localização</label>
                    <input 
                      type="text" 
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      placeholder="Ex: Toledo / PR"
                      className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Telefone</label>
                    <input 
                      type="text" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="(00) 00000-0000"
                      className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-[#F5A623] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-orange-100"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </header>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Anúncios Ativos', value: '08' },
              { label: 'Vendas Totais', value: '124' },
              { label: 'Avaliação Média', value: '4.9', icon: true },
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col gap-1 ${idx === 2 ? 'border-l-4 border-l-[#F5A623]' : ''}`}>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-black text-[#1F2A44] font-plus-jakarta">{stat.value}</p>
                  {stat.icon && <Star size={24} className="text-[#F5A623]" fill="#F5A623" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Ads Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1F2A44] font-plus-jakarta">Seus Anúncios</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-100 rounded-lg text-slate-400">
                  <Grid size={20} />
                </button>
                <button className="p-2 text-[#1F2A44]">
                  <List size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {myAds.length === 0 ? (
                <div className="md:col-span-2 py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">Você ainda não publicou nenhum anúncio.</p>
                  <Link href="/create-ad" className="text-[#F5A623] font-bold mt-2 inline-block hover:underline">
                    Criar meu primeiro anúncio
                  </Link>
                </div>
              ) : (
                myAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl border border-slate-50">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={ad.image_url || 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=400&auto=format&fit=crop'} 
                        alt={ad.title} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                          Ativo
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1F2A44] mb-1 font-plus-jakarta">{ad.title}</h3>
                          <p className="text-sm text-slate-400 font-medium">{ad.quantity} • {ad.location}</p>
                        </div>
                        <span className="text-xl font-black text-[#1F2A44]">R$ {ad.price}/kg</span>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-slate-50">
                        <button className="flex-1 py-3 bg-slate-100 text-[#1F2A44] font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Edit size={16} />
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteAd(ad.id)}
                          className="px-4 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
