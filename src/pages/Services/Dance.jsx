import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Dance = () => {
  const navigate = useNavigate();

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    { name: "Bharatanatyam", image: "/images/bharatanatyam.jpeg" },
    { name: "Kathak", image: "/images/kathak.jpeg" },
    { name: "Kathakali", image: "/images/kathakali.jpeg" },
    { name: "Kuchipudi", image: "/images/kuchipudi.jpeg" },
    { name: "Odissi", image: "/images/odissi.jpeg" },
    { name: "Mohiniyattam", image: "/images/mohiniyattam.jpeg" },
    { name: "Manipuri", image: "/images/manipuri.jpeg" },
    { name: "Sattriya", image: "/images/sattriya.jpeg" },
    { name: "Chhau", image: "/images/chhau.jpeg" },
    { name: "Yakshagana", image: "/images/yakshagana.jpeg" },
    { name: "Lavani", image: "/images/lavani.jpeg" },
    { name: "Ghoomar", image: "/images/ghoomar.jpeg" },
    { name: "Kalbelia", image: "/images/kalbelia.jpeg" },
    { name: "Garba", image: "/images/garba.jpeg" },
    { name: "Dandiya Raas", image: "/images/dandiya-raas.jpeg" },
    { name: "Bhangra", image: "/images/bhangra.jpeg" },
    { name: "Bihu", image: "/images/bihu.jpeg" },
    { name: "Dollu Kunitha", image: "/images/dollu-kunitha.jpeg" },
    { name: "Theyyam", image: "/images/theyyam.jpeg" },
    { name: "Ballet", image: "/images/ballet.jpeg" },
    { name: "Contemporary", image: "/images/contemporary.jpeg" },
    { name: "Hip Hop", image: "/images/hip-hop.jpeg" },
    { name: "Breakdance", image: "/images/breakdance.jpeg" },
    { name: "Jazz Dance", image: "/images/jazz-dance.jpeg" },
    { name: "Tap Dance", image: "/images/tap-dance.jpeg" },
    { name: "Modern Dance", image: "/images/modern-dance.jpeg" },
    { name: "Street Dance", image: "/images/street-dance.jpeg" },
    { name: "House Dance", image: "/images/house-dance.jpeg" },
    { name: "Locking", image: "/images/locking.jpeg" },
    { name: "Popping", image: "/images/popping.jpeg" },
    { name: "Krumping", image: "/images/krumping.jpeg" },
    { name: "Waacking", image: "/images/waacking.jpeg" },
    { name: "Voguing", image: "/images/voguing.jpeg" },
    { name: "Salsa", image: "/images/salsa.jpeg" },
    { name: "Bachata", image: "/images/bachata.jpeg" },
    { name: "Merengue", image: "/images/merengue.jpeg" },
    { name: "Cha-Cha", image: "/images/cha-cha.jpeg" },
    { name: "Rumba", image: "/images/rumba.jpeg" },
    { name: "Samba", image: "/images/samba.jpeg" },
    { name: "Paso Doble", image: "/images/paso-doble.jpeg" },
    { name: "Jive", image: "/images/jive.jpeg" },
    { name: "Tango", image: "/images/tango.jpeg" },
    { name: "Waltz", image: "/images/waltz.jpeg" },
    { name: "Foxtrot", image: "/images/foxtrot.jpeg" },
    { name: "Quickstep", image: "/images/quickstep.jpeg" },
    { name: "Flamenco", image: "/images/flamenco.jpeg" },
    { name: "Irish Stepdance", image: "/images/irish-stepdance.jpeg" },
    {
      name: "Scottish Highland Dance",
      image: "/images/scottish-highland-dance.jpeg",
    },
    { name: "Morris Dance", image: "/images/morris-dance.jpeg" },
    { name: "Hula", image: "/images/hula.jpeg" },
    { name: "Maori Haka", image: "/images/maori-haka.jpeg" },
    {
      name: "African Tribal Dance",
      image: "/images/african-tribal-dance.jpeg",
    },
    { name: "Zumba", image: "/images/zumba.jpeg" },
    { name: "K-Pop Dance", image: "/images/kpop-dance.jpeg" },
    { name: "Shuffle Dance", image: "/images/shuffle-dance.jpeg" },
    { name: "Electro Dance", image: "/images/electro-dance.jpeg" },
    { name: "Pole Dance", image: "/images/pole-dance.jpeg" },
    { name: "Ballroom Dance", image: "/images/ballroom-dance.jpeg" },
    { name: "Line Dance", image: "/images/line-dance.jpeg" },
    { name: "Square Dance", image: "/images/square-dance.jpeg" },
    { name: "Folk Dance", image: "/images/folk-dance.jpeg" },
    { name: "Contra Dance", image: "/images/contra-dance.jpeg" },
  ];

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen px-4 py-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Explore Subcategories</h1>

      {/* SEARCH */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-grow bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search dance styles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

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
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

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
            <h2 className="text-lg font-bold text-center mb-2">Dance</h2>

            <p className="text-center text-gray-500 mb-4">
              What are you looking for?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Dance&subCategory=${encodeURIComponent(selectedSubCategory)}`,
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
                    `/viewinstitutes?category=Dance&subCategory=${encodeURIComponent(selectedSubCategory)}`,
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

export default Dance;
