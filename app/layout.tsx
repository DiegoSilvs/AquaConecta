import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'AquaConecta | O Porto Digital do Produtor',
  description: 'Conectando a piscicultura brasileira de ponta a ponta.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body suppressHydrationWarning className="font-inter antialiased bg-[#F8F9FA] text-[#1F2A44]">
        {children}
      </body>
    </html>
  );
}
