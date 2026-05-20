import React, { useState } from "react";
import {
  Leaf,
  Wheat,
  Milk,
  Apple,
  LayoutGrid
} from "lucide-react";

const Categories = ({ setSelectedCategory }) => {

  const [activeCategory, setActiveCategory] = useState("All");

  const categoryData = [
    {
      id: 1,
      name: "All",
      icon: <LayoutGrid size={32} />,
      bg: "bg-green-100",
      text: "text-green-700",
      hover: "hover:bg-green-200"
    },

    {
      id: 2,
      name: "Vegetables",
      icon: <Leaf size={32} />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      hover: "hover:bg-emerald-200"
    },

    {
      id: 3,
      name: "Grains",
      icon: <Wheat size={32} />,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      hover: "hover:bg-yellow-200"
    },

    {
      id: 4,
      name: "Dairy",
      icon: <Milk size={32} />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      hover: "hover:bg-blue-200"
    },

    {
      id: 5,
      name: "Fruits",
      icon: <Apple size={32} />,
      bg: "bg-red-100",
      text: "text-red-700",
      hover: "hover:bg-red-200"
    }
  ];

  const handleCategory = (name) => {

    setActiveCategory(name);

    if (setSelectedCategory) {
      setSelectedCategory(name);
    }
  };

  return (

    <div className="p-4 sm:p-6">

      {/* TITLE */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-emerald-700">
            Categories
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Browse products by category
          </p>

        </div>

      </div>

      {/* CATEGORY GRID */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">

        {categoryData.map((item) => (

          <div
            key={item.id}
            onClick={() => handleCategory(item.name)}
            className={`
              ${item.bg}
              ${item.hover}
              rounded-3xl
              p-6
              flex
              flex-col
              items-center
              justify-center
              shadow-md
              cursor-pointer
              transition-all
              duration-300
              hover:scale-105
              border-2
              ${
                activeCategory === item.name
                  ? "border-emerald-600 scale-105"
                  : "border-transparent"
              }
            `}
          >

            {/* ICON */}

            <div
              className={`
                ${item.text}
                bg-white
                p-4
                rounded-2xl
                shadow-sm
              `}
            >
              {item.icon}
            </div>

            {/* NAME */}

            <h3
              className={`
                mt-4
                font-bold
                text-lg
                ${item.text}
              `}
            >
              {item.name}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Categories;