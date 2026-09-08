import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/taliasplace.png'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="fixed top-4 left-0 z-50 w-full px-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between rounded-full bg-white p-3 shadow-md">

        {/* Logo */}
        <div className="logo cursor-pointer" onClick={() => window.location.href = '/'}>
          <img
            src={logo}
            alt="TaliasPlace Logo"
            className="h-10 w-auto rounded-full sm:h-12"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <a
            href="#about"
            className="text-sm font-medium transition hover:text-pink-500"
          >
            About
          </a>

          <a
            href="#services"
            className="text-sm font-medium transition hover:text-pink-500"
          >
            Services
          </a>

          <a
            href="#portfolio"
            className="text-sm font-medium transition hover:text-pink-500"
          >
            Portfolio
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium transition hover:text-pink-500"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="text-sm font-medium transition hover:text-pink-500"
          >
            Contact
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/book-me"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600 sm:px-5 sm:py-2.5"
          >
            Book Me
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl lg:hidden"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-2 rounded-3xl bg-white p-6 shadow-lg lg:hidden">
          <div className="flex flex-col gap-5 text-center">

            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>

            <a
              href="#portfolio"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>

            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            <Link
              to="/book-me"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white"
            >
              Book Me
            </Link>

          </div>
        </div>
      )}
    </div>
  )
}

export default Nav