'use client';

import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, LayoutDashboard, ShoppingBag, MessageSquare, Loader2, Plus, Trash2, Edit, AlertCircle, Fish } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [myAds, setMyAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      console.error('Error fetching dashboard ads:', err);
      setError('Não foi possível carregar seus anúncios.');
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
        setLoading(false);
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
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1F2A44] font-plus-jakarta">Meus Anúncios</h2>
                <Link 
                  href="/create-ad" 
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e0961b] text-white px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  <Plus size={18} />
                  Novo Anúncio
                </Link>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl flex items-center gap-3 border border-red-100">
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {myAds.length === 0 && !error ? (
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <Fish size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F2A44]">Nenhum anúncio ativo</h2>
                  <p className="text-slate-500 max-w-sm">Você ainda não publicou nenhum anúncio. Comece agora e alcance milhares de compradores!</p>
                  <Link href="/create-ad" className="bg-[#1F2A44] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    Criar Meu Primeiro Anúncio
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myAds.map((ad: any) => (
                    <div 
                      key={ad.id} 
                      className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6"
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
                        <p className="text-[#F5A623] font-black">R$ {typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price}/kg</p>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto relative z-50 pointer-events-auto">
                        <Link 
                          href={`/edit-ad/${ad.id}`}
                          className="flex-1 sm:flex-none px-5 py-3 bg-slate-100 hover:bg-[#F5A623] text-[#1F2A44] hover:text-white rounded-2xl transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-sm active:scale-95"
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
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
