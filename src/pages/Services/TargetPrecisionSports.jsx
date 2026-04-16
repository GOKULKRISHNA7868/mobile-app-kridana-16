import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

const TargetPrecisionPage = () => {
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const category = "Precision Sports";
  const categories = [
    { name: "Archery", image: "/images/archery.jpeg" },
    { name: "Golf", image: "/images/golf.jpeg" },
    { name: "Bowling", image: "/images/bowling.jpeg" },
    { name: "Darts", image: "/images/darts.jpeg" },
    { name: "Snooker", image: "/images/snooker.jpeg" },
    { name: "Pool", image: "/images/pool.jpeg" },
    { name: "Billiards", image: "/images/billiards.jpeg" },
    { name: "Target Shooting", image: "/images/target-shooting.jpeg" },
    {
      name: "Clay Pigeon Shooting",
      image: "/images/clay-pigeon-shooting.jpeg",
    },
    { name: "Air Rifle Shooting", image: "/images/air-rifle-shooting.jpeg" },
    { name: "Air Pistol Shooting", image: "/images/air-pistol-shooting.jpeg" },
    { name: "Croquet", image: "/images/croquet.jpeg" },
    { name: "Petanque", image: "/images/petanque.jpeg" },
    { name: "Bocce", image: "/images/bocce.jpeg" },
    { name: "Lawn Bowls", image: "/images/lawn-bowls.jpeg" },
    { name: "Carom Billiards", image: "/images/carom-billiards.jpeg" },
    { name: "Nine-Pin Bowling", image: "/images/nine-pin-bowling.jpeg" },
    { name: "Disc Golf", image: "/images/disc-golf.jpeg" },
    { name: "Kubb", image: "/images/kubb.jpeg" },
    { name: "Pitch and Putt", image: "/images/pitch-and-putt.jpeg" },
    { name: "Shove Ha’penny", image: "/images/shove-hapenny.jpeg" },
    { name: "Toad in the Hole", image: "/images/toad-in-the-hole.jpeg" },
    { name: "Bat and Trap", image: "/images/bat-and-trap.jpeg" },
    { name: "Boccia", image: "/images/boccia.jpg" },
    { name: "Gateball", image: "/images/gateball.jpg" },
  ];

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen px-4 py-6">
      {/* TITLE */}
      <h1 className="text-2xl font-extrabold mb-4">Explore Subcategories</h1>

      {/* SEARCH + PROFILE */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-grow flex items-center bg-white border border-gray-200 rounded-full px-4 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search disciplines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="text-gray-600" size={20} />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCategories.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedSubCategory(item.name);
              setShowChoice(true);
            }}
            className="relative rounded-2xl overflow-hidden cursor-pointer h-44"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* TEXT */}
            <div className="absolute top-3 left-0 right-0 text-center px-1">
              <span className="text-orange-500 font-bold text-xs sm:text-sm leading-tight">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showChoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <p className="text-gray-600 mb-6">What are you looking for?</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Precision Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="bg-orange-500 text-white py-2 rounded-lg"
              >
                Trainers
              </button>

              <button
                onClick={() => {
                  navigate(
                    `/viewinstitutes?category=Precision Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory,
                    )}`,
                  );
                  setShowChoice(false);
                }}
                className="border border-orange-500 text-orange-500 py-2 rounded-lg"
              >
                Institutes
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

export default TargetPrecisionPage;
