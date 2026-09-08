import React from 'react'

const Services = () => {
  const services = [
    {
      title: 'Bridal Makeup',
      description:
        'Elegant, long-lasting makeup designed to make you feel beautiful and confident on your special day.',
    },
    {
      title: 'Birthday & Events',
      description:
        'Beautiful makeup looks for birthdays, parties, celebrations and other special occasions.',
    },
    {
      title: 'Photoshoot Makeup',
      description:
        'Camera-ready makeup created to enhance your features and photograph beautifully.',
    },
    {
      title: 'Natural Makeup',
      description:
        'Soft, fresh and effortless looks that enhance your natural beauty.',
    },
    {
      title: 'Full Glam',
      description:
        'Bold, polished and glamorous makeup for when you want to make a statement.',
    },
    {
      title: 'Makeup Training',
      description:
        'Learn professional makeup techniques and build your confidence with personalized training.',
    },
    {
      title: 'Home Service',
      description:
        'Enjoy a professional makeup experience from the comfort and convenience of your home.',
    },
    {
      title: 'Studio Appointment',
      description:
        'Visit the studio for a comfortable and professional makeup experience tailored to you.',
    },
   
  ]

  return (
    <section id="services" className="bg-black py-24 text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-400">
            Services
          </p>

          <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
            Beauty looks made
            <span className="block text-pink-400">
              for every occasion.
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg">
            From soft and natural to bold and glamorous, choose a makeup
            experience designed around your style and occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-pink-500/5"
            >
              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Services