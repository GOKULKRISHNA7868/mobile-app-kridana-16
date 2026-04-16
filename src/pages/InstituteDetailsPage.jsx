// src/pages/InstituteDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Users,
  UserCheck,
  Calendar,
  Building2,
  Star,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function InstituteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inst, setInst] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showMore, setShowMore] = useState(false);

  /* ================= LOAD INSTITUTE ================= */
  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "institutes", id));
      if (snap.exists()) setInst({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  /* ================= LOAD FEEDBACKS ================= */
  useEffect(() => {
    const loadFeedbacks = async () => {
      const q = query(
        collection(db, "feedbacks"),
        where("instituteId", "==", id),
      );
      const snap = await getDocs(q);
      setFeedbacks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    loadFeedbacks();
  }, [id]);

  if (!inst) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Institute...
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${inst.city}, ${inst.state}, ${inst.country}`,
  )}&output=embed`;

  /* ================= CHAT ================= */
  const startChat = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Login required");

    const chatId = [user.uid, inst.id].sort().join("_");
    await setDoc(
      doc(db, "chats", chatId),
      {
        type: "institute",
        members: [user.uid, inst.id],
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );

    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={inst.coverImage || inst.profileImageUrl}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 text-[#FF6A00] flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* ================= GLASS CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-20 mx-4 relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border p-5"
        >
          {/* LOGO */}
          <div className="flex flex-col items-center">
            <img
              src={inst.profileImageUrl}
              className="w-24 h-24 rounded-full border-4 border-[#FF6A00] -mt-14 shadow-lg"
            />

            <h1 className="text-xl font-bold mt-3 text-center">
              {inst.instituteName}
            </h1>

            <p className="text-gray-600 text-sm">
              {inst.city}, {inst.state}
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-4 gap-2 mt-5 text-center">
            <Stat label="Students" value={inst.customers?.length || 0} />
            <Stat label="Trainers" value={inst.trainers?.length || 0} />
            <Stat label="Rating" value={inst.rating?.toFixed(1) || "0"} />
            <Stat label="Year" value={inst.yearFounded || "-"} />
          </div>

          {/* ================= ACTIONS (MOBILE FRIENDLY) ================= */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <a href={`tel:${inst.phoneNumber}`} className="btn">
              Call
            </a>

            <a href={`mailto:${inst.email}`} className="btn-outline">
              Email
            </a>

            <button onClick={startChat} className="btn-outline">
              Chat
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= ABOUT ================= */}
      <Section title="About Institute">
        <p className="bg-[#FFF7F2] p-4 rounded-2xl text-gray-700">
          {inst.description || "No description available"}
        </p>
      </Section>

      {/* ================= DETAILS ================= */}
      <Section title="Details">
        <GridItem icon={MapPin} label="Location" value={inst.city} />
        <GridItem
          icon={Users}
          label="Students"
          value={inst.customers?.length}
        />
        <GridItem
          icon={UserCheck}
          label="Trainers"
          value={inst.trainers?.length}
        />
        <GridItem icon={Calendar} label="Founded" value={inst.yearFounded} />
      </Section>

      {/* ================= MORE ================= */}
      <div className="px-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#FF6A00] font-semibold"
        >
          {showMore ? "Show Less" : "View More"}
        </button>
      </div>

      {showMore && (
        <Section title="Additional Info">
          <GridItem icon={Building2} label="Founder" value={inst.founderName} />
          <GridItem icon={Star} label="Designation" value={inst.designation} />
          <GridItem icon={Mail} label="Email" value={inst.email} />
          <GridItem icon={Phone} label="Phone" value={inst.phoneNumber} />
        </Section>
      )}

      {/* ================= MAP ================= */}
      <Section title="Location">
        <iframe src={mapSrc} className="w-full h-64 rounded-2xl" />
      </Section>

      {/* ================= FEEDBACK ================= */}
      <Section title="Reviews">
        <div className="grid md:grid-cols-2 gap-4">
          {feedbacks.map((f) => (
            <div key={f.id} className="p-4 border rounded-2xl">
              <p className="font-semibold">{f.name}</p>
              <p className="text-gray-600 text-sm">{f.message}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="px-4 md:px-10 mt-10">
    <h2 className="text-xl font-bold text-[#FF6A00] mb-4">{title}</h2>
    {children}
  </div>
);

const Stat = ({ label, value }) => (
  <div>
    <div className="w-12 h-12 mx-auto bg-[#FF6A00] text-white rounded-full flex items-center justify-center text-xs font-bold">
      {value}
    </div>
    <p className="text-[10px] mt-1 text-gray-700">{label}</p>
  </div>
);

const GridItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 border rounded-xl">
    <div className="bg-[#FF6A00] p-2 rounded-full text-white">
      <Icon size={14} />
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-sm">{value || "-"}</p>
    </div>
  </div>
);

/* ================= BUTTON STYLE ================= */
const style = document.createElement("style");
style.innerHTML = `
.btn{
  background:#ff6a00;
  color:white;
  padding:10px;
  border-radius:12px;
  text-align:center;
  font-weight:600;
}
.btn-outline{
  border:1px solid #ff6a00;
  color:#ff6a00;
  padding:10px;
  border-radius:12px;
  text-align:center;
  font-weight:600;
}
`;
document.head.appendChild(style);
