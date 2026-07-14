import { Leaf, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <div>
        <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold text-slate-900">
            Why Choose FarmConnect?
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <Leaf className="mx-auto text-emerald-700" size={45} />
              <h3 className="mt-4 text-xl font-bold text-slate-900">Fresh Products</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Directly sourced from farms.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <ShoppingCart className="mx-auto text-emerald-700" size={45} />
              <h3 className="mt-4 text-xl font-bold text-slate-900">Easy Ordering</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Simple and secure shopping.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <Truck className="mx-auto text-emerald-700" size={45} />
              <h3 className="mt-4 text-xl font-bold text-slate-900">Fast Delivery</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Reliable product delivery.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <ShieldCheck className="mx-auto text-emerald-700" size={45} />
              <h3 className="mt-4 text-xl font-bold text-slate-900">Trusted Platform</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Safe buying and selling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features