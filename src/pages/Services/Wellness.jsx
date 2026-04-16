import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Wellness = () => {
  const navigate = useNavigate();
  const category = "Wellness";

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Yoga & Meditation", image: "/images/yoga-meditation.jpeg" },
    { name: "Spa & Relaxation", image: "/images/spa-relaxation.jpeg" },
    { name: "Mental Wellness", image: "/images/mental-wellness.jpeg" },
    { name: "Fitness", image: "/images/fitness.jpg" },
    { name: "Nutrition", image: "/images/nutrition.jpeg" },
    {
      name: "Traditional & Alternative Therapies",
      image: "/images/traditional-therapies.jpeg",
    },
    { name: "Rehabilitation", image: "/images/rehabilitation.jpeg" },
    { name: "Lifestyle Coaching", image: "/images/lifestyle-coaching.jpeg" },
  ];

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FFF9F5] px-4 py-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Explore Subcategories</h1>

      {/* SEARCH */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center flex-grow bg-white border border-gray-200 rounded-full px-4 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search disciplines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>

        {/* PROFILE ICON */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          👤
        </div>
      </div>

      {/* COUNT */}
      <p className="text-sm text-gray-600 mb-4">
        {filteredCategories.length} Disciplines Available
      </p>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
        {filteredCategories.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedSubCategory(item.name);
              setShowChoice(true);
            }}
            className="relative rounded-2xl overflow-hidden h-40 cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30" />

            {/* TEXT */}
            <div className="absolute top-3 left-0 right-0 text-center px-1">
              <span className="text-orange-400 font-bold text-sm leading-tight">
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
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <p className="text-gray-600 mb-6">What are you looking for?</p>

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
                className="bg-[#FF6A00] text-white py-3 rounded-md font-semibold active:scale-95"
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
                className="border border-[#FF6A00] text-[#FF6A00] py-3 rounded-md font-semibold active:scale-95"
              >
                Find Institutes
              </button>
            </div>

            <button
              onClick={() => setShowChoice(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
