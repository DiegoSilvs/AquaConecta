'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { MapPin, Clock, Verified, Package, Scale, Droplets, Truck, MessageCircle, Phone, Star, ChevronRight, ArrowRight, Zap, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ProductDetail() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-[#1F2A44] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/" className="hover:text-[#1F2A44] transition-colors">Explorar Peixes</Link>
          <ChevronRight size={14} />
          <span className="text-[#1F2A44] font-semibold">Detalhes do Produto</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-[16/9] shadow-sm"
            >
              <Image 
                src="https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=1200&auto=format&fit=crop" 
                alt="Tilápia" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/20 z-10">
                <Verified size={16} className="text-[#F5A623]" />
                <span className="text-[10px] font-bold text-[#1F2A44] tracking-tight uppercase">VENDEDOR VERIFICADO</span>
              </div>
            </motion.div>

            {/* Product Header */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-50">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md tracking-wider uppercase">TILÁPIA PREMIUM</span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F2A44] leading-tight font-plus-jakarta">Tilápia do Nilo Fresca - Produção Própria</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 pt-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={18} className="text-[#F5A623]" />
                      <span className="text-sm font-medium">Paulo Afonso, Bahia - Região dos Cânions</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-slate-200 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Clock size={18} />
                      <span className="text-sm">Postado há 2 horas</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center md:items-end justify-center min-w-[200px] border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Preço Sugerido</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#1F2A44]">R$</span>
                    <span className="text-5xl font-black text-[#1F2A44]">12,50</span>
                    <span className="text-lg font-bold text-slate-400">/kg</span>
                  </div>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <Package className="text-slate-400 mx-auto mb-2" size={20} />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disponível</p>
                  <p className="text-lg font-bold text-[#1F2A44]">2.500 kg</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <Scale className="text-slate-400 mx-auto mb-2" size={20} />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Peso Médio</p>
                  <p className="text-lg font-bold text-[#1F2A44]">850g - 1kg</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <Droplets className="text-slate-400 mx-auto mb-2" size={20} />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cultivo</p>
                  <p className="text-lg font-bold text-[#1F2A44]">Tanque Rede</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <Truck className="text-slate-400 mx-auto mb-2" size={20} />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Entrega</p>
                  <p className="text-lg font-bold text-[#1F2A44]">A combinar</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-50 space-y-4">
              <h2 className="text-xl font-bold text-[#1F2A44] font-plus-jakarta">Descrição do Produto</h2>
              <p className="text-slate-500 leading-relaxed">
                Tilápia produzida com os mais altos padrões de qualidade nas águas correntes do Rio São Francisco. Peixes alimentados com ração de alta performance, garantindo uma carne firme, clara e sem sabor residual (off-flavor). 
                <br/><br/>
                Ideal para distribuidores e redes de supermercados que buscam regularidade e qualidade premium. Temos logística própria para grandes volumes na região Nordeste.
              </p>
              <div className="pt-4 flex flex-wrap gap-2">
                {['#PisciculturaSustentavel', '#TilapiaDoNilo', '#Atacado'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-[#1F2A44] hover:bg-slate-200 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-50 sticky top-[100px]">
              <h3 className="text-lg font-bold text-[#1F2A44] mb-6 flex items-center gap-2 font-plus-jakarta">
                <Zap className="text-[#F5A623]" size={20} fill="#F5A623" />
                Interesse no Lote?
              </h3>
              <div className="space-y-4">
                <button className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-5 rounded-2xl font-extrabold text-lg transition-transform active:scale-[0.98] shadow-lg shadow-green-100">
                  <MessageCircle size={24} fill="white" />
                  Falar no WhatsApp
                </button>
                <button className="flex items-center justify-center gap-3 w-full bg-[#1F2A44] text-white py-4 rounded-2xl font-bold transition-colors hover:bg-slate-800">
                  <Phone size={20} />
                  (75) 9****-****
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">
                Segurança AquaConecta: Nunca pague adiantado sem ver o produto.
              </p>

              {/* Seller Profile */}
              <div className="mt-10 pt-10 border-t border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Sobre o Produtor</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-50 shadow-sm relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                      alt="Produtor" 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1F2A44] leading-tight font-plus-jakarta">Fazenda Águas Claras</h4>
                    <p className="text-sm text-slate-400">Membro desde Out 2021</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Reputação</span>
                    <div className="flex items-center gap-1 text-[#F5A623]">
                      <Star size={14} fill="#F5A623" />
                      <Star size={14} fill="#F5A623" />
                      <Star size={14} fill="#F5A623" />
                      <Star size={14} fill="#F5A623" />
                      <Star size={14} fill="#F5A623" className="opacity-50" />
                      <span className="ml-1 text-[#1F2A44] font-bold">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Vendas Concluídas</span>
                    <span className="text-[#1F2A44] font-bold">142 lotes</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Tempo de Resposta</span>
                    <span className="text-[#1F2A44] font-bold">&lt; 15 min</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="w-full text-[#1F2A44] font-bold text-sm hover:underline flex items-center justify-center gap-2 transition-all">
                    Ver todos os anúncios deste produtor
                    <ArrowRight size={14} />
                  </button>
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
