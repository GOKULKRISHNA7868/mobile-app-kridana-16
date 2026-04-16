import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

const EquestrianSports = () => {
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const category = "Equestrian Sports";

  const categories = [
    { name: "Horse Racing", image: "/images/horse-racing.jpeg" },
    { name: "Polo", image: "/images/polo.jpg" },
    { name: "Barrel Racing", image: "/images/barrel-racing.jpeg" },
    { name: "Rodeo", image: "/images/rodeo.jpeg" },
    { name: "Mounted Archery", image: "/images/mounted-archery.jpeg" },
    { name: "Tent Pegging", image: "/images/tent-pegging.jpeg" },
  ];

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen font-sans px-4 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/categories")}
          className="text-orange-500 text-sm mb-3"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-extrabold">Explore Subcategories</h1>

        {/* SEARCH + PROFILE */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-grow flex items-center bg-white border border-gray-200 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedSubCategory(item.name);
              setShowChoice(true);
            }}
            className="relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* TEXT */}
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="text-orange-400 font-bold text-sm">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showChoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-center">
            <h2 className="text-lg font-bold mb-2">{category}</h2>

            <p className="text-gray-500 mb-6 text-sm">
              What are you looking for?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=${category}&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="bg-orange-500 text-white py-3 rounded-md font-semibold"
              >
                Find Trainers
              </button>

              <button
                onClick={() => {
                  navigate(
                    `/viewinstitutes?category=${category}&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="border border-orange-500 text-orange-500 py-3 rounded-md font-semibold"
              >
                Find Institutes
              </button>
            </div>

            <button
              onClick={() => setShowChoice(false)}
              className="mt-4 text-xs text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquestrianSports;
