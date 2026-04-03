'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Fish, Droplets, Utensils, Camera, Lightbulb, ArrowRight, MapPin, Phone, Package, DollarSign, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function CreateAd() {
  const [selectedType, setSelectedType] = useState('tilapia');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;

    setSubmitting(true);
    
    // Create a title based on type and quantity
    const title = `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Premium`;
    
    const { error } = await supabase
      .from('ads')
      .insert({
        title,
        description: `Contato WhatsApp: ${phone}`,
        price: parseFloat(price.replace(',', '.')),
        category: selectedType,
        quantity: `${quantity}kg`,
        location: location,
        user_id: user.id
      });

    if (error) {
      alert('Erro ao publicar anúncio: ' + error.message);
      setSubmitting(false);
    } else {
      router.push('/profile');
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#F5A623]" size={48} />
        <p className="mt-4 text-[#1F2A44] font-bold">Verificando acesso...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-plus-jakarta text-3xl md:text-4xl font-extrabold text-[#1F2A44] mb-3"
          >
            O que você está vendendo hoje?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium"
          >
            Anuncie sua produção para milhares de compradores no Porto Digital.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Fish Type */}
            <div className="space-y-4">
              <label className="block font-plus-jakarta text-lg font-bold text-[#1F2A44] tracking-tight">
                Tipo de Peixe ou Fruto do Mar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'tilapia', label: 'Tilápia', icon: Fish },
                  { id: 'camarao', label: 'Camarão', icon: Droplets },
                  { id: 'pacu', label: 'Pacu', icon: Utensils },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all group ${
                      selectedType === type.id 
                        ? 'border-[#F5A623] bg-orange-50/30' 
                        : 'border-transparent bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <type.icon 
                      size={32} 
                      className={`mb-2 transition-transform group-hover:scale-110 ${
                        selectedType === type.id ? 'text-[#F5A623]' : 'text-slate-400'
                      }`} 
                    />
                    <span className={`font-semibold text-sm ${
                      selectedType === type.id ? 'text-[#1F2A44]' : 'text-slate-500'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-plus-jakarta text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quantidade disponível (kg)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Ex: 500"
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#F5A623] transition-all font-medium text-[#1F2A44]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">KG</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block font-plus-jakarta text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Preço por quilo (R$)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 15,50"
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 pl-10 focus:ring-2 focus:ring-[#F5A623] transition-all font-medium text-[#1F2A44]"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">R$</div>
                </div>
              </div>
            </div>

            {/* Location and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-plus-jakarta text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Localização (Cidade/Estado)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Petrolina, PE"
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-[#F5A623] transition-all font-medium text-[#1F2A44]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block font-plus-jakarta text-xs font-bold text-slate-400 uppercase tracking-wider">
                  WhatsApp para contato
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-[#F5A623] transition-all font-medium text-[#1F2A44]"
                  />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <label className="block font-plus-jakarta text-lg font-bold text-[#1F2A44] tracking-tight">
                Fotos do Produto (Opcional)
              </label>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-48 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group">
                  <Camera size={32} className="text-slate-300 group-hover:text-[#F5A623] transition-colors" />
                  <span className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ADICIONAR FOTO</span>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="p-4 bg-orange-50/50 rounded-xl flex items-start gap-3 border border-orange-100">
                    <Lightbulb className="text-[#F5A623] flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong className="text-[#1F2A44]">Dica do Porto:</strong> Anúncios com fotos reais dos peixes vendem até 5x mais rápido para produtores rurais.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 h-20 opacity-30">
                    <div className="bg-slate-100 rounded-lg"></div>
                    <div className="bg-slate-100 rounded-lg"></div>
                    <div className="bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F5A623] hover:bg-[#e0961b] active:scale-[0.98] transition-all text-white font-plus-jakarta font-extrabold text-xl py-5 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Publicar anúncio
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-sm text-slate-400 font-medium">
                Ao clicar em publicar, você concorda com nossos termos de uso.
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
