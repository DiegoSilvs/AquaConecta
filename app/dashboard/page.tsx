'use client';

import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, LayoutDashboard, ShoppingBag, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    getSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#F5A623]" size={48} />
        <p className="mt-4 text-[#1F2A44] font-bold">Acessando Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#1F2A44] font-plus-jakarta">Dashboard</h1>
            <p className="text-slate-500">Bem-vindo de volta, <span className="font-bold text-[#F5A623]">{user.email}</span></p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Actions Side Bar */}
            <aside className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full">
                <nav className="space-y-2">
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 bg-orange-50 text-[#F5A623] rounded-xl font-bold text-sm transition-all">
                    <LayoutDashboard size={20} />
                    Visão Geral
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                    <User size={20} />
                    Meu Perfil
                  </Link>
                  <Link href="/pedidos" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                    <ShoppingBag size={20} />
                    Meus Pedidos
                  </Link>
                  <Link href="/mensagens" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                    <MessageSquare size={20} />
                    Mensagens
                  </Link>
                  <hr className="my-4 border-slate-100" />
                  <LogoutButton />
                </nav>
              </div>
            </aside>

            {/* Dashboard Content Area */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                  <LayoutDashboard size={40} />
                </div>
                <h2 className="text-2xl font-bold text-[#1F2A44]">Sua atividade aparecerá aqui</h2>
                <p className="text-slate-500 max-w-sm">Você está logado como {user.email}. Em breve você poderá gerenciar seus negócios por aqui.</p>
                <Link href="/" className="bg-[#1F2A44] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                  Explorar Mercado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
