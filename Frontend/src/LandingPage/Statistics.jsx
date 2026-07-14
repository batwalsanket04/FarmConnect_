import React from 'react'

const Statistics = () => {
  return (
    <div>
        <section id="statistics" className="bg-emerald-700 py-20 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4">
          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="mt-2 text-emerald-100">Farmers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">2000+</h2>
            <p className="mt-2 text-emerald-100">Products</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">1500+</h2>
            <p className="mt-2 text-emerald-100">Orders</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">99%</h2>
            <p className="mt-2 text-emerald-100">Happy Customers</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Statistics