// src/pages/TrainerDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Calendar,
  Award,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { setDoc, serverTimestamp } from "firebase/firestore";
import { Phone, Mail, MessageCircle } from "lucide-react";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function TrainerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const loadTrainer = async () => {
      const snap = await getDoc(doc(db, "trainers", id));
      if (snap.exists()) setTrainer({ id: snap.id, ...snap.data() });
    };
    loadTrainer();
  }, [id]);

  if (!trainer) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Trainer Profile...
      </div>
    );
  }

  const stats = [
    { label: "Students", value: trainer.students?.length || 0 },
    { label: "Achieve", value: trainer.achievements?.length || 0 },
    { label: "Exp", value: trainer.experience || "0yrs" },
    { label: "Foll", value: trainer.followers || 0 },
  ];
  const startTrainerChat = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to chat with trainer");
      navigate("/login");
      return;
    }

    const chatId = [user.uid, trainer.id].sort().join("_");

    await setDoc(
      doc(db, "chats", chatId),
      {
        type: "individual",
        members: [user.uid, trainer.id],
        trainerId: trainer.id,
        createdAt: serverTimestamp(),
        lastAt: serverTimestamp(),
        lastMessage: "",
      },
      { merge: true },
    );

    navigate(`/chat/${chatId}`, {
      state: {
        chatName:
          trainer.trainerName ||
          `${trainer.firstName || ""} ${trainer.lastName || ""}` ||
          "Trainer",
        chatType: "trainer",
      },
    });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <div className="relative w-full h-64 md:h-80">
        {/* BACK SIDE IMAGE */}
        <img
          src={trainer.coverImage || trainer.profileImageUrl}
          className="w-full h-full object-cover"
          alt="Cover"
        />

        {/* Overlay to make white text/buttons pop */}
        <div className="absolute inset-0 bg-black/30" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-[#FF6A00] font-semibold z-20"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* OVERLAPPING CARD WITH GLASS EFFECT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          /* Change: bg-white -> bg-white/70 
       Change: added backdrop-blur-md 
       Change: added border for better glass definition 
    */
          className="-mt-20 relative z-10 bg-white/70 backdrop-blur-md mx-4 rounded-3xl p-5 shadow-xl border border-white/30"
        >
          {/* PROFILE IMAGE SECTION */}
          <div className="flex flex-col items-center">
            <img
              src={trainer.profileImageUrl}
              /* Increased size slightly and shadow to pop against the glass */
              className="w-24 h-24 rounded-full object-cover border-4 border-[#FF6A00] -mt-16 shadow-md"
              alt="Profile"
            />

            <h1 className="text-xl font-bold mt-3 text-gray-900 text-center">
              {trainer.trainerName ||
                `${trainer.firstName || ""} ${trainer.lastName || ""}`}
            </h1>

            <p className="text-gray-600 text-sm font-medium">
              {trainer.designation || "Cricketer"}
            </p>
          </div>

          {/* ================= STATS CIRCLES ================= */}
          <div className="grid grid-cols-4 gap-2 text-center mt-6">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Circle styling matches your orange brand exactly */}
                <div className="bg-[#FF6A00] text-white w-14 h-14 flex items-center justify-center rounded-full text-xs font-bold shadow-lg shadow-orange-500/30">
                  {s.value}
                </div>
                <p className="text-[10px] font-bold text-gray-700 mt-2 uppercase tracking-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          {/* ================= ACTION BUTTONS ================= */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {/* CALL */}
            {trainer.phoneNumber && (
              <a
                href={`tel:${trainer.phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-[#ff7a00] text-white py-3 rounded-xl font-semibold shadow-md active:scale-95 transition"
              >
                <Phone size={16} />
                Call
              </a>
            )}

            {/* EMAIL */}
            {trainer.email && (
              <a
                href={`mailto:${trainer.email}`}
                className="flex items-center justify-center gap-2 border border-[#ff7a00] text-[#ff7a00] py-3 rounded-xl font-semibold active:scale-95 transition"
              >
                <Mail size={16} />
                Email
              </a>
            )}

            {/* CHAT */}
            <button
              onClick={startTrainerChat}
              className="flex items-center justify-center gap-2 border border-[#ff7a00] text-[#ff7a00] py-3 rounded-xl font-semibold active:scale-95 transition"
            >
              <MessageCircle size={16} />
              Chat
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= ABOUT ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        className="px-4 md:px-12 mt-20"
      >
        <h2 className="font-bold text-lg mb-2">About</h2>
        <div className="bg-[#FFF7F2] p-4 rounded-2xl text-gray-700 text-sm">
          {trainer.about ||
            "Experienced trainer dedicated to improving student performance with structured training programs."}
        </div>
      </motion.div>

      {/* ================= DETAILS ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        className="px-4 md:px-12 mt-10"
      >
        <h2 className="font-bold text-lg mb-4">Details</h2>

        <div className="space-y-4">
          <Detail
            icon={MapPin}
            label="Location"
            value={trainer.locationName || trainer.city}
          />
          <Detail
            icon={FileText}
            label="License"
            value={trainer.license || "—"}
          />
          <Detail
            icon={CheckCircle}
            label="Designation"
            value={trainer.designation}
          />

          {/* EXTRA FIELDS */}
          {showMore && (
            <>
              <Detail
                icon={Award}
                label="Organization"
                value={trainer.organization}
              />
              <Detail
                icon={Users}
                label="Institute"
                value={trainer.instituteName}
              />
              <Detail
                icon={Calendar}
                label="Year Experience"
                value={trainer.yearExperience}
              />
              <Detail
                icon={FileText}
                label="Category"
                value={trainer.category}
              />
              <Detail
                icon={FileText}
                label="Sub Category"
                value={trainer.subCategory}
              />
              <Detail icon={FileText} label="Email" value={trainer.email} />
              <Detail
                icon={FileText}
                label="Phone"
                value={trainer.phoneNumber}
              />
              <Detail icon={FileText} label="State" value={trainer.state} />
              <Detail icon={FileText} label="City" value={trainer.city} />
              <Detail icon={FileText} label="Country" value={trainer.country} />
            </>
          )}
        </div>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-[#FF6A00] font-semibold"
        >
          {showMore ? "Show Less" : "View More"}
        </button>
      </motion.div>

      {/* ================= GALLERY ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        className="px-4 md:px-12 mt-10 mb-10"
      >
        <h2 className="font-bold text-lg mb-4">Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(trainer.images || trainer.certifications || []).map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl w-full h-32 object-cover"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ================= DETAIL COMPONENT ================= */
function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border">
      <div className="bg-[#FF6A00] p-2 rounded-full text-white">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-sm text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}
