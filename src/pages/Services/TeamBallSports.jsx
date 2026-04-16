import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const TeamBallPage = () => {
  const navigate = useNavigate();
  const category = "Team Ball Sports";

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Football / Soccer", image: "/images/football.jpg" },
    { name: "Basketball", image: "/images/basketball.jpg" },
    { name: "Handball", image: "/images/handball.jpg" },
    { name: "Rugby", image: "/images/rugby.jpg" },
    { name: "Futsal", image: "/images/futsal.jpg" },
    { name: "Field Hockey", image: "/images/field-hockey.jpg" },
    { name: "Lacrosse", image: "/images/lacrosse.jpg" },
    { name: "Gaelic Football", image: "/images/gaelic-football.jpg" },
    { name: "Volleyball", image: "/images/volleyball.jpg" },
    { name: "Beach Volleyball", image: "/images/beach-volleyball.jpg" },
    { name: "Sepak Takraw", image: "/images/sepak-takraw.jpg" },
    { name: "Roundnet (Spikeball)", image: "/images/roundnet-spikeball.jpg" },
    { name: "Netball", image: "/images/netball.jpg" },
    { name: "Cricket", image: "/images/cricket.jpg" },
    { name: "Baseball", image: "/images/baseball.jpg" },
    { name: "Softball", image: "/images/softball.jpg" },
    { name: "Wheelchair Rugby", image: "/images/wheelchair-rugby.jpg" },
    { name: "Dodgeball", image: "/images/dodgeball.jpg" },
    { name: "Korfball", image: "/images/korfball.jpg" },
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

      {/* GRID (same as martial) */}
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
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="text-orange-400 font-bold text-base">
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

export default TeamBallPage;
