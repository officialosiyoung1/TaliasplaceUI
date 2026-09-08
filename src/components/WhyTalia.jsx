import React from 'react'

const WhyTalia = () => {
  const reasons = [
    {
      number: '01',
      title: 'Personalized Looks',
      description:
        'Every face is different. Talia takes the time to create a look that complements your features, style and occasion.',
    },
    {
      number: '02',
      title: 'Attention to Detail',
      description:
        'From skin preparation to the final touch, every detail matters when creating a polished makeup look.',
    },
    {
      number: '03',
      title: 'Quality Experience',
      description:
        'Professional service, quality products and a comfortable experience from the moment you arrive.',
    },
    {
      number: '04',
      title: 'Confidence First',
      description:
        'The goal is to enhance your natural beauty and leave you feeling confident, beautiful and ready for your moment.',
    },
  ]

  return (
    <section className="bg-black py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-400">
            Why Talia
          </p>

         <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
            More than makeup.
            <span className="block text-pink-400">
              It's your moment.
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg">
            Talia believes makeup should do more than complete your look.
            It should help you feel confident, comfortable and completely
            yourself.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="rounded-3xl border border-white/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-pink-500/5"
            >
              <span className="text-sm font-medium text-pink-400">
                {reason.number}
              </span>

              <h3 className="mt-8 text-xl font-semibold">
                {reason.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyTalia