"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/Logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-white font-bold text-lg">Forge Mod 3D Printing</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <div className="bg-[#2B2B2B] rounded-full px-6 py-2 flex gap-6">
            <a href="" className="bg-yellow-400 text-black font-bold px-4 py-1 rounded-full">
              Home
            </a>
            <a href="#" className="font-semibold hover:text-yellow-400">Services</a>
            <a href="#" className="underline hover:text-yellow-400">Shop</a>
            <a href="#" className="hover:text-yellow-400">Process</a>
            <a href="#" className="hover:text-yellow-400">About</a>
          </div>
          <a href="/login" className="underline font-semibold hover:text-yellow-400">Login</a>
          <a href="#" className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full">Contact Us</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4 text-center">
          <a href="#" className="block text-lg font-bold bg-yellow-400 text-black py-2 rounded">Home</a>
          <a href="#" className="block">Services</a>
          <a href="#" className="block underline">Shop</a>
          <a href="#" className="block">Process</a>
          <a href="#" className="block">About</a>
          <a href="#" className="block underline">Login</a>
          <a href="#" className="block bg-yellow-400 text-black font-semibold py-2 rounded">Contact Us</a>
        </div>
      )}
    </header>
  );
}
