import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div>
        <section id="contact" className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Start Buying & Selling Today
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Join thousands of farmers and buyers using FarmConnect.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/farmer"
              className="rounded-xl bg-emerald-700 px-8 py-4 font-semibold text-white transition hover:bg-emerald-800"
            >
              Create Account
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-emerald-700 px-8 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Buyer Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact