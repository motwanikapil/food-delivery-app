import { ArrowRight } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <main className="grid place-items-center min-h-screen bg-[url(/homepage.jpg)] bg-center bg-cover">
      <section className="backdrop-brightness-50 bg-black/50 w-full h-full flex items-center justify-center flex-col text-center p-5">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-bold text-[#f5f5f5] drop-shadow-md leading-tight max-w-4xl">
          Craving Delicious Food? We've Got You Covered!
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-2xl mt-4 text-[#f5f5f5] max-w-3xl drop-shadow-sm">
          Your favorite meals, delivered fresh to your doorstep in just a few
          clicks. Discover a world of flavors and start your food journey with
          us today!
        </p>

        {/* Call to Action */}
        <NavLink
          to="/menu"
          className="mt-8 text-lg sm:text-2xl font-semibold bg-[#f5f5f5] text-[#1f1f1f] px-6 py-3 flex gap-2 items-center rounded-lg shadow-lg hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-300 transform hover:scale-105"
        >
          Go to Menu <ArrowRight size={24} />
        </NavLink>
      </section>
    </main>
  )
}
