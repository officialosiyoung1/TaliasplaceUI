import React from 'react'


const Footer = () => {
  return (
    <footer className="bg-black px-6 pb-8 pt-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">

        {/* Main Footer */}
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Talias<span className="text-pink-500">.</span>Place
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Professional makeup artistry designed to make you feel
              confident, beautiful and unforgettable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
              <a
                href="#about"
                className="w-fit transition-colors duration-300 hover:text-pink-400"
              >
                About
              </a>

              <a
                href="#services"
                className="w-fit transition-colors duration-300 hover:text-pink-400"
              >
                Services
              </a>

              <a
                href="#portfolio"
                className="w-fit transition-colors duration-300 hover:text-pink-400"
              >
                Portfolio
              </a>

              <a
                href="#pricing"
                className="w-fit transition-colors duration-300 hover:text-pink-400"
              >
                Pricing
              </a>

              <a
                href="#contact"
                className="w-fit transition-colors duration-300 hover:text-pink-400"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <p className="transition-colors duration-300 hover:text-white">
                perpetualasadueze@gmail.com
              </p>

              <p className="transition-colors duration-300 hover:text-white">
                +234 8165827008
              </p>

              <p className="transition-colors duration-300 hover:text-white">
                Abuja, Nigeria
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 pt-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Talias.Place. All rights reserved.
          </p>

          <p>
            Made with care by{' '}
            <span className="text-gray-400">
              Talias.Place
            </span>
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer