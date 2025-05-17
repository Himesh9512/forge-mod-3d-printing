import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import QueryProvider from '@/components/providers/query-provider';

export const metadata: Metadata = {
  title: 'Forge Mod 3D Printing',
  description:
    'Forge Mod 3D Printing specializes in premium 3D printed models and custom design services. Browse, customize, and buy physical 3D models delivered to your door, or request personalized prints. Perfect for hobbyists, collectors, and professionals who value precision and creativity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <QueryProvider>{children}</QueryProvider>
          <Footer />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
