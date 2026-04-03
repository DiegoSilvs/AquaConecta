'use client';

import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.refresh(); // Refresh the page to trigger redirect from server
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all"
    >
      <LogOut size={20} />
      Sair da Conta
    </button>
  );
}
