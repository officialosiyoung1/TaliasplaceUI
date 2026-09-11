import React from 'react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const prices = [
    {
      service: 'Bridal Makeup',
      price: '₦150,000',
      description: 'Elegant and long-lasting makeup for your special day, note that outside abuja will attract extra charges depending on the location.',
    },
    {
      service: 'Birthday & Events',
      price: '₦30,000',
      description: 'Beautiful makeup for birthdays, parties and celebrations.',
    },
    {
      service: 'Photoshoot Makeup',
      price: '₦30,000',
      description: 'Camera-ready makeup designed for your photoshoot.',
    },
    {
      service: 'Natural Makeup',
      price: '₦30,000',
      description: 'Soft and effortless makeup that enhances your natural beauty.',
    },
    {
      service: 'Full Glam',
      price: '₦30,000',
      description: 'A polished, glamorous look for your special occasion.',
    },
    {
      service: 'Makeup Training',
      price: '₦100,000',
      description: 'Personalized training to help you improve your makeup skills.',
    },
  ]

  return (
    <section
        id="pricing"
        className="bg-black py-20 text-white sm:py-24 lg:py-28"
        >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-400">
            Pricing
          </p>

          <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
            Simple pricing.
            <span className="block text-pink-400">
              Beautiful results.
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg">
            Choose the service that fits your occasion. Every appointment is
            tailored to your individual needs.
          </p>
        </div>

        {/* Pricing List */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {prices.map((item) => (
           <Link
                key={item.service}
                to={`/book-me?service=${encodeURIComponent(item.service)}`}
                className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-pink-500/5 sm:flex-row sm:items-center"
              >
            <div>
              <h3 className="text-xl font-semibold">
                {item.service}
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                {item.description}
              </p>
            </div>

            <p className="whitespace-nowrap text-2xl font-semibold text-pink-400">
              {item.price}
            </p>
          </Link>
          ))}
        </div>

        {/* Booking Note */}
        <div className="mt-10 rounded-3xl border border-pink-400/20 bg-pink-400/5 p-6 sm:p-7">
          <p className="text-sm leading-6 text-gray-300">
            Home service and special bookings may have additional charges.
            Contact Talia for availability and a personalized quote.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Pricing