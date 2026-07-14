import React from 'react'

const Pegination = ({
  setCurrentpage,
  itemCount = 0
}) => {

  const Page_size = 4;
  const no_of_pages = Math.ceil(itemCount / Page_size);

  const handlePage = (n) => {
    setCurrentpage(n)
  }

  return (
    <div className='flex justify-center gap-3 my-6 flex-wrap'>

      {[...Array(no_of_pages).keys()].map((n) => (

        <button
          key={n}
          onClick={() => handlePage(n)}
          className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'
        >
         {n}
        </button>

      ))}

    </div>
  )
}

export default Pegination