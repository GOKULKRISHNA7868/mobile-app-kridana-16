import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const MartialArtsPage = () => {
  const navigate = useNavigate();
  const category = "Martial Arts";
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const categories = [
    {
      name: "Karate",
      desc: "Traditional Japanese striking martial art.",
      image: "/images/karate.jpeg",
    },
    {
      name: "Kung Fu",
      desc: "Ancient Chinese martial art emphasizing fluid movements.",
      image: "/images/kung-fu.jpeg",
    },
    {
      name: "Krav Maga",
      desc: "Israeli self-defense system focused on real-world scenarios.",
      image: "/images/krav-maga.jpeg",
    },
    {
      name: "Muay Thai",
      desc: "Thai martial art known as the art of eight limbs.",
      image: "/images/muay-thai.jpeg",
    },
    {
      name: "Taekwondo",
      desc: "Korean martial art known for powerful kicks.",
      image: "/images/taekwondo.jpeg",
    },
    {
      name: "Judo",
      desc: "Japanese grappling art focusing on throws and submissions.",
      image: "/images/judo.jpeg",
    },
    {
      name: "Brazilian Jiu-Jitsu",
      desc: "Ground fighting martial art focused on submissions.",
      image: "/images/brazilian-jiu-jitsu.jpeg",
    },
    {
      name: "Aikido",
      desc: "Japanese defensive martial art using opponent's energy.",
      image: "/images/aikido.jpeg",
    },
    {
      name: "Jeet Kune Do",
      desc: "Philosophy-based martial art developed by Bruce Lee.",
      image: "/images/jeet-kune-do.jpeg",
    },
    {
      name: "Capoeira",
      desc: "Brazilian martial art combining dance and acrobatics.",
      image: "/images/capoeira.jpeg",
    },
    {
      name: "Sambo",
      desc: "Russian martial art blending wrestling and submissions.",
      image: "/images/sambo.jpeg",
    },
    {
      name: "Silat",
      desc: "Southeast Asian martial art focusing on joint manipulation.",
      image: "/images/silat.jpeg",
    },
    {
      name: "Kalaripayattu",
      desc: "Ancient Indian martial art emphasizing agility and weapons.",
      image: "/images/kalaripayattu.jpeg",
    },
    {
      name: "Hapkido",
      desc: "Korean martial art using strikes and joint locks.",
      image: "/images/hapkido.jpeg",
    },
    {
      name: "Wing Chun",
      desc: "Chinese close-combat martial art focused on quick strikes.",
      image: "/images/wing-chun.jpeg",
    },
    {
      name: "Shaolin",
      desc: "Chinese martial art combining meditation and combat.",
      image: "/images/shaolin.jpeg",
    },
    {
      name: "Ninjutsu",
      desc: "Japanese martial art focused on stealth and strategy.",
      image: "/images/ninjutsu.jpeg",
    },
    {
      name: "Kickboxing",
      desc: "Combat sport combining punches and kicks.",
      image: "/images/kickboxing.jpeg",
    },
    {
      name: "Boxing",
      desc: "Western combat sport focused on punches and footwork.",
      image: "/images/boxing.jpeg",
    },
    {
      name: "Wrestling",
      desc: "Grappling sport focused on takedowns and control.",
      image: "/images/wrestling.jpeg",
    },

    {
      name: "Shorinji Kempo",
      desc: "Japanese martial art blending self-defense and philosophy.",
      image: "/images/shorinji-kempo.jpeg",
    },
    {
      name: "Kyokushin",
      desc: "Full-contact style of karate known for toughness.",
      image: "/images/kyokushin.jpeg",
    },
    {
      name: "Goju-ryu",
      desc: "Karate style combining hard and soft techniques.",
      image: "/images/goju-ryu.jpeg",
    },
    {
      name: "Shotokan",
      desc: "Traditional karate style emphasizing powerful linear strikes.",
      image: "/images/shotokan.jpeg",
    },
    {
      name: "Wushu",
      desc: "Modern Chinese martial art focused on performance and combat.",
      image: "/images/wushu.jpeg",
    },
    {
      name: "Savate",
      desc: "French kickboxing martial art using precise kicks.",
      image: "/images/savate.jpeg",
    },
    {
      name: "Lethwei",
      desc: "Burmese bare-knuckle boxing with head strikes.",
      image: "/images/lethwei.jpeg",
    },
    {
      name: "Bajiquan",
      desc: "Chinese martial art known for explosive power.",
      image: "/images/bajiquan.jpeg",
    },
    {
      name: "Hung Gar",
      desc: "Southern Chinese martial art with strong stances.",
      image: "/images/hung-gar.jpeg",
    },
    {
      name: "Praying Mantis Kung Fu",
      desc: "Chinese martial art inspired by mantis movements.",
      image: "/images/praying-mantis-kung-fu.jpeg",
    },
  ];
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FFF9F5] px-4 py-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Explore Subcategories</h1>

      {/* SEARCH + PROFILE */}
      <div className="flex items-center gap-3 mb-6">
        {/* SEARCH BAR */}
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

        {/* PROFILE AVATAR */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">👤</span>
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

            {/* DARK OVERLAY */}
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
                    `/viewtrainers?category=${category}&subCategory=${encodeURIComponent(selectedSubCategory)}`,
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
                    `/viewinstitutes?category=${category}&subCategory=${encodeURIComponent(selectedSubCategory)}`,
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

export default MartialArtsPage;
