import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const AquaticSports = () => {
  const navigate = useNavigate();

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Swimming", image: "/images/swimming.jpeg" },
    { name: "Water Polo", image: "/images/water-polo.jpeg" },
    { name: "Surfing", image: "/images/surfing.jpeg" },
    { name: "Scuba Diving", image: "/images/scuba-diving.jpeg" },
    { name: "Snorkeling", image: "/images/snorkeling.jpeg" },
    { name: "Freediving", image: "/images/freediving.jpeg" },
    { name: "Kayaking", image: "/images/kayaking.jpeg" },
    { name: "Canoeing", image: "/images/canoeing.jpeg" },
    { name: "Rowing", image: "/images/rowing.jpeg" },
    { name: "Sailing", image: "/images/sailing.jpeg" },
    { name: "Windsurfing", image: "/images/windsurfing.jpeg" },
    { name: "Kite Surfing", image: "/images/kite-surfing.jpeg" },
    { name: "Jet Skiing", image: "/images/jet-skiing.jpeg" },
    { name: "Wakeboarding", image: "/images/wakeboarding.jpeg" },
    { name: "Water Skiing", image: "/images/water-skiing.jpeg" },
    {
      name: "Stand-up Paddleboarding",
      image: "/images/stand-up-paddleboarding.jpeg",
    },
    { name: "Whitewater Rafting", image: "/images/whitewater-rafting.jpeg" },
    { name: "Dragon Boat Racing", image: "/images/dragon-boat-racing.jpeg" },
    { name: "Artistic Swimming", image: "/images/artistic-swimming.jpeg" },
    { name: "Open Water Swimming", image: "/images/open-water-swimming.jpeg" },
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
            placeholder="Search aquatic sports..."
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

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* TITLE */}
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="text-orange-400 font-bold text-sm">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SHEET MODAL */}
      {showChoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-center">
            <h2 className="text-lg font-bold text-center mb-2">
              Aquatic Sports
            </h2>

            <p className="text-center text-gray-500 mb-4">
              What are you looking for?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Aquatic Sports&subCategory=${encodeURIComponent(
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
                    `/viewinstitutes?category=Aquatic Sports&subCategory=${encodeURIComponent(
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

export default AquaticSports;
