'use client'

import Link from 'next/link'
import { useState } from 'react'
// import Footer from '@/components/Footer'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GA</span>
          </div>
          <span className="text-white font-semibold text-lg">Green Arch</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-400 hover:text-white transition">Features</Link>
          <Link href="#how-it-works" className="text-gray-400 hover:text-white transition">How it Works</Link>
          <Link href="/upload" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition font-medium">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
          <Link href="#features" className="text-gray-400 hover:text-white transition">Features</Link>
          <Link href="#how-it-works" className="text-gray-400 hover:text-white transition">How it Works</Link>
          <Link href="/upload" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition font-medium text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}