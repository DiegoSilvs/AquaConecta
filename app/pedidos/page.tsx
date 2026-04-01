'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, ChevronRight, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Pedidos() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#1F2A44] font-plus-jakarta mb-2">Meus Pedidos</h1>
          <p className="text-slate-500">Acompanhe suas negociações e histórico de compras.</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                      <p className="text-sm font-bold text-[#1F2A44]">{order.seller}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Data</p>
                      <p className="text-sm font-bold text-[#1F2A44]">{order.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                  <button className="flex-1 md:flex-none px-6 py-3 bg-[#1F2A44] text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                    Detalhes
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-[#1F2A44] rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                    Ajuda
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Package className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1F2A44] mb-2">Nenhum pedido encontrado</h3>
            <p className="text-slate-500 mb-8">Você ainda não realizou nenhuma compra ou venda.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#F5A623] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Explorar Ofertas
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
