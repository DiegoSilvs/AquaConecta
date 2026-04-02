'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, LogOut, User, MessageSquare, ShoppingBag, Home } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navItems = [
    { name: 'Explorar', href: '/', icon: Home },
    { name: 'Chat', href: '/mensagens', icon: MessageSquare },
    { name: 'Meus Pedidos', href: '/pedidos', icon: ShoppingBag },
    { name: 'Perfil', href: '/profile', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Navbar (Desktop & Mobile Header) */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
<<<<<<< HEAD
              <div className="relative w-8 h-8">
=======
              <div className="w-8 h-8 bg-[#1F2A44] rounded-lg flex items-center justify-center overflow-hidden relative">
>>>>>>> 7e47923afa33488588fc110797411baf3b3d9610
                 <Image 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhJ-NlwF7T2xC-dUIi8uk5HJ2ZHmLjWmdSfNAQ5xzKEAdKbCNEMLjZM9gLUICPTs-5sUkwtLN0wlI7Pbnm1pupaRug2qatjB7CgyBuJwmIsd95pSHjtJD3AA15ABo5dW-qDTIHrzy5Dcpl5biMgNhZThOxIlEhGJjhLOVZNXh18NgzSWdwDPJdCY8dUI8wGkW6WDYFZ3M9EcSwpyVK2Cy_kJau8OrUanOassASvSIJRgx9DrvylRxyVBvsI2BOTc0bwb7z6EJ870A" 
                  alt="AquaConecta" 
                  fill
<<<<<<< HEAD
                  className="object-contain"
=======
                  className="object-contain p-1"
>>>>>>> 7e47923afa33488588fc110797411baf3b3d9610
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1F2A44] font-plus-jakarta">AquaConecta</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 h-full">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`relative h-full flex items-center text-sm font-bold transition-colors ${
                    isActive(item.href) ? 'text-[#F5A623]' : 'text-slate-500 hover:text-[#1F2A44]'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5A623]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              
              {user ? (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/create-ad" 
                    className="bg-[#F5A623] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center gap-2"
                  >
                    <Plus size={18} className="md:hidden" />
                    <span className="hidden md:inline">Criar anúncio</span>
                    <span className="md:hidden">Anunciar</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link 
                    href="/login" 
                    className="text-[#1F2A44] font-bold text-sm px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-[#1F2A44] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-md"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation (Mobile Only) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                isActive(item.href) ? 'text-[#F5A623]' : 'text-slate-400'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive(item.href) ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              {isActive(item.href) && (
                <motion.div 
                  layoutId="activeTabMobile"
                  className="absolute -bottom-3 left-0 right-0 h-1 bg-[#F5A623] rounded-t-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
