import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <Image 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhJ-NlwF7T2xC-dUIi8uk5HJ2ZHmLjWmdSfNAQ5xzKEAdKbCNEMLjZM9gLUICPTs-5sUkwtLN0wlI7Pbnm1pupaRug2qatjB7CgyBuJwmIsd95pSHjtJD3AA15ABo5dW-qDTIHrzy5Dcpl5biMgNhZThOxIlEhGJjhLOVZNXh18NgzSWdwDPJdCY8dUI8wGkW6WDYFZ3M9EcSwpyVK2Cy_kJau8OrUanOassASvSIJRgx9DrvylRxyVBvsI2BOTc0bwb7z6EJ870A" 
                  alt="AquaConecta" 
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-bold text-[#1F2A44] font-plus-jakarta">AquaConecta</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs text-center md:text-left">
              O Porto Digital do Produtor. Conectando a aquicultura brasileira com transparência e eficiência.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <Link href="/sobre" className="text-sm text-slate-500 hover:text-[#F5A623] transition-colors">Sobre</Link>
            <Link href="/ajuda" className="text-sm text-slate-500 hover:text-[#F5A623] transition-colors">Ajuda</Link>
            <Link href="/termos" className="text-sm text-slate-500 hover:text-[#F5A623] transition-colors">Termos</Link>
            <Link href="/privacidade" className="text-sm text-slate-500 hover:text-[#F5A623] transition-colors">Privacidade</Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-sm text-slate-500">© 2024 AquaConecta.</p>
            <div className="flex gap-4">
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#F5A623] hover:text-white transition-all">
                <Share2 size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#F5A623] hover:text-white transition-all">
                <Globe size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
