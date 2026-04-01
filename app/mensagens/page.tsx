'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Send, Phone, MoreVertical, CheckCheck, MapPin, Fish } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function Mensagens() {
  const [activeChat, setActiveChat] = useState(0);

  const chats = [
    {
      id: 0,
      name: 'Fazenda Águas Claras',
      lastMessage: 'O lote de 500kg está disponível para retirada amanhã?',
      time: '14:20',
      unread: 2,
      online: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 1,
      name: 'Mariscos do Nordeste',
      lastMessage: 'Pagamento confirmado. Iniciando logística.',
      time: 'Ontem',
      unread: 0,
      online: false,
      image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Piscicultura Vale do Sol',
      lastMessage: 'Qual o peso médio da tilápia?',
      time: 'Segunda',
      unread: 0,
      online: true,
      image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const messages = [
    { id: 1, text: 'Olá, vi seu anúncio da Tilápia Premium G3.', sender: 'me', time: '14:05' },
    { id: 2, text: 'Boa tarde! Sim, ainda temos disponível.', sender: 'them', time: '14:10' },
    { id: 3, text: 'Qual a quantidade mínima para entrega em Toledo?', sender: 'me', time: '14:12' },
    { id: 4, text: 'Para Toledo entregamos a partir de 200kg.', sender: 'them', time: '14:15' },
    { id: 5, text: 'O lote de 500kg está disponível para retirada amanhã?', sender: 'them', time: '14:20' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex-grow flex overflow-hidden min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h1 className="text-2xl font-extrabold text-[#1F2A44] font-plus-jakarta mb-4">Mensagens</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar conversas..." 
                  className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              {chats.map((chat) => (
                <button 
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full p-4 flex items-center gap-4 transition-all border-b border-slate-50 hover:bg-slate-50 ${
                    activeChat === chat.id ? 'bg-slate-50 border-l-4 border-l-[#F5A623]' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 relative">
                      <Image 
                        src={chat.image} 
                        alt={chat.name} 
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-[#1F2A44] truncate text-sm">{chat.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-[#F5A623] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 relative">
                  <Image 
                    src={chats[activeChat].image} 
                    alt={chats[activeChat].name} 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1F2A44] text-sm">{chats[activeChat].name}</h4>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online agora</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-[#1F2A44] hover:bg-slate-50 rounded-lg transition-all">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-[#1F2A44] hover:bg-slate-50 rounded-lg transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-[#1F2A44] text-white rounded-tr-none' 
                      : 'bg-white text-[#1F2A44] rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 justify-end ${
                      msg.sender === 'me' ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      <span className="text-[10px] font-bold">{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck size={12} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2">
                <input 
                  type="text" 
                  placeholder="Digite sua mensagem..." 
                  className="flex-1 bg-transparent border-none py-2 px-4 text-sm focus:ring-0 font-medium text-[#1F2A44]"
                />
                <button className="w-10 h-10 bg-[#F5A623] text-white rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-orange-100">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
