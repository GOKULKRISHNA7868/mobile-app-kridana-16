import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import {
  Table,
  Circle,
  Target,
  Zap,
  Activity,
  Layers,
  CircleDot,
  Move,
} from "lucide-react";
const Racket = () => {
  const navigate = useNavigate();
  const category = "Racket Sports";
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Tennis", icon: Circle },
    { name: "Table Tennis", icon: Table },
    { name: "Badminton", icon: Activity },
    { name: "Squash", icon: Move },
    { name: "Racquetball", icon: Target },
    { name: "Padel", icon: Circle },
    { name: "Pickleball", icon: Circle },
    { name: "Platform Tennis", icon: Layers },
    { name: "Real Tennis", icon: CircleDot },
    { name: "Soft Tennis", icon: Circle },

    { name: "Frontenis", icon: Target },
    { name: "Speedminton (Crossminton)", icon: Zap },
    { name: "Paddle Tennis (POP Tennis)", icon: Circle },
    { name: "Speed-ball", icon: Zap },
    { name: "Chaza", icon: Activity },

    { name: "Totem Tennis (Swingball)", icon: Move },
    { name: "Matkot", icon: Activity },
    { name: "Jombola", icon: Circle },
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
            className="h-[120px] rounded-2xl bg-white shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition"
          >
            <item.icon size={26} className="text-[#FF6A00]" />

            <p className="mt-2 text-xs text-gray-700 text-center px-1 font-medium">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showChoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <p className="text-gray-600 mb-6">What are you looking for?</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Racket&subCategory=${encodeURIComponent(
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
                    `/viewinstitutes?category=Racket&subCategory=${encodeURIComponent(
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

export default Racket;
