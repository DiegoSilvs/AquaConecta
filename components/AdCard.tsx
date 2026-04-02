'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Package, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AdCardProps {
  id: string;
  title: string;
  price: string;
  category: string;
  quantity: string;
  location: string;
  image: string;
}

export default function AdCard({ id, title, price, category, quantity, location, image }: AdCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 flex flex-col h-full"
    >
      <Link href={`/product/${id}`} className="relative h-56 overflow-hidden block">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase text-[#1F2A44] border border-white/20 z-10">
          {category}
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <Link href={`/product/${id}`}>
            <h3 className="text-lg font-bold text-[#1F2A44] hover:text-[#F5A623] transition-colors line-clamp-2">{title}</h3>
          </Link>
          <div className="text-right flex-shrink-0">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Preço/kg</span>
            <span className="text-lg font-extrabold text-[#1F2A44]">R$ {price}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Package size={16} className="text-slate-400" />
            <span>Disponível: <strong className="text-[#1F2A44]">{quantity}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={16} className="text-slate-400" />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-3">
          <div className="flex gap-3">
            <Link 
              href={`/product/${id}`}
              className="flex-1 bg-slate-100 text-[#1F2A44] py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors text-center"
            >
              Ver detalhes
            </Link>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
              <Heart size={20} />
            </button>
          </div>
          <button className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <MessageCircle size={18} fill="white" />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
}
