'use client';

import React, { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Fish, ShoppingBasket, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'produtor' | 'comprador' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Por favor, escolha se você quer comprar ou vender peixe.');
      return;
    }
    if (!fullName) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const supabase = getSupabaseClient();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message === 'User already registered' 
        ? 'Este e-mail já está cadastrado.' 
        : error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      // Se não houver necessidade de confirmação de e-mail, podemos redirecionar
      if (data?.session) {
        router.push('/dashboard');
        router.refresh();
      } else {
        // Caso precise confirmar e-mail
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#1F2A44] font-plus-jakarta mb-2">Criar Conta</h1>
            <p className="text-slate-500">Junte-se à maior rede de piscicultura do Brasil.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium border border-emerald-100">
                Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Como você quer usar o AquaConecta?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('produtor')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    role === 'produtor' 
                      ? 'border-[#F5A623] bg-orange-50 text-[#F5A623]' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-400'
                  }`}
                >
                  <Fish size={32} />
                  <span className="text-xs font-bold uppercase">Quero Vender</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('comprador')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    role === 'comprador' 
                      ? 'border-[#F5A623] bg-orange-50 text-[#F5A623]' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-400'
                  }`}
                >
                  <ShoppingBasket size={32} />
                  <span className="text-xs font-bold uppercase">Quero Comprar</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Nome Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1F2A44] uppercase tracking-wider">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-[#F5A623]/20 transition-all font-medium text-[#1F2A44]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F2A44] text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Criar minha conta
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#F5A623] font-bold hover:underline">
                Fazer Login
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
