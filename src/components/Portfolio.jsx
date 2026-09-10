import React from 'react'
import birthdayGlam01 from '../assets/portfolio/Birthdayglam01.jpeg'
import birthdayGlam02 from '../assets/portfolio/birthday glam 02.jpeg'
import birthdayGlam03 from '../assets/portfolio/birthdayglam 03.jpeg'
import modelGlam from '../assets/portfolio/Modelglam-dark1.jpeg'
import photoshootGlam from '../assets/portfolio/photoshoot glam01.jpeg'
import weddingGlam from '../assets/portfolio/Wedding glam 01.jpeg'
import newTradPhoto from '../assets/portfolio/new tradphoto.jpeg'
import photoshopImage from '../assets/portfolio/Photoshop.jpeg'

const Portfolio = () => {
  const portfolio = [
    {
      image: birthdayGlam01,
      category: 'Birthday Glam',
    },
    {
      image: birthdayGlam02,
      category: 'Birthday Glam',
    },
    {
      image: birthdayGlam03,
      category: 'Birthday Glam',
    },
    {
      image: modelGlam,
      category: 'Full Glam',
    },
    {
      image: photoshootGlam,
      category: 'Photoshoot',
    },
    {
      image: weddingGlam,
      category: 'Wedding Glam',
    },
    {
      image: newTradPhoto,
      category: 'New Traditional',
    },
    {
      image: photoshopImage,
      category: 'Photoshoot',
    },
  ]

  return (
    <section id="portfolio" className="bg-white py-24 text-black">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-500">
            Portfolio
          </p>

          <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
            A look at
            <span className="block text-pink-500">
              Talia's work.
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
            Explore a selection of makeup looks created for different
            occasions, styles and personalities.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {portfolio.map((item) => (
            <div
                key={item.image}
                className="group overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.category}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                  {item.category}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Portfolio