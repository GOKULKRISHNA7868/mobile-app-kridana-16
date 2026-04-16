import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Adventure = () => {
  const navigate = useNavigate();

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Rock Climbing", image: "/images/rock-climbing.jpeg" },
    { name: "Mountaineering", image: "/images/mountaineering.jpeg" },
    { name: "Trekking", image: "/images/trekking.jpeg" },
    { name: "Hiking", image: "/images/hiking.jpeg" },
    { name: "Mountain Biking", image: "/images/mountain-biking.jpeg" },
    { name: "Sandboarding", image: "/images/sandboarding.jpeg" },
    { name: "Orienteering", image: "/images/orienteering.jpeg" },
    {
      name: "Obstacle Course Racing",
      image: "/images/obstacle-course-racing.jpeg",
    },
    { name: "Skydiving", image: "/images/skydiving.jpeg" },
    { name: "Paragliding", image: "/images/paragliding.jpeg" },
    { name: "Hang Gliding", image: "/images/hang-gliding.jpeg" },
    { name: "Parachuting", image: "/images/parachuting.jpeg" },
    { name: "Hot-air Ballooning", image: "/images/hot-air-ballooning.jpeg" },
    { name: "Skiing", image: "/images/skiing.jpeg" },
    { name: "Snowboarding", image: "/images/snowboarding.jpeg" },
    { name: "Ice Climbing", image: "/images/ice-climbing.jpeg" },
    { name: "Heli-skiing", image: "/images/heli-skiing.jpeg" },
    { name: "Bungee Jumping", image: "/images/bungee-jumping.jpeg" },
    { name: "BASE Jumping", image: "/images/base-jumping.jpeg" },
    { name: "Canyoning", image: "/images/canyoning.jpeg" },
    { name: "Kite Buggy", image: "/images/kite-buggy.jpeg" },
    { name: "Zorbing", image: "/images/zorbing.jpeg" },
    { name: "Zip Lining", image: "/images/zip-lining.jpeg" },
  ];

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen px-4 py-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Explore Subcategories</h1>

      {/* SEARCH + PROFILE */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-grow bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search disciplines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* PROFILE ICON */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          👤
        </div>
      </div>

      {/* COUNT */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredCategories.length} Subcategories
      </p>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
        {filteredCategories.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedSubCategory(item.name);
              setShowChoice(true);
            }}
            className="relative h-[160px] rounded-2xl overflow-hidden cursor-pointer"
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

      {/* MODAL */}
      {showChoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-center">
            <h2 className="text-lg font-bold text-center mb-2">
              Adventure & Outdoor Sports
            </h2>

            <p className="text-center text-gray-500 mb-4">
              What are you looking for?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Adventure & Outdoor Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="bg-[#FF6A00] text-white py-3 rounded-md font-semibold"
              >
                Find Trainers
              </button>

              <button
                onClick={() => {
                  navigate(
                    `/viewinstitutes?category=Adventure & Outdoor Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="border border-[#FF6A00] text-[#FF6A00] py-3 rounded-md font-semibold"
              >
                Find Institutes
              </button>
            </div>

            <button
              onClick={() => setShowChoice(false)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adventure;
