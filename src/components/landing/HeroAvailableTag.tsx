
import { motion } from "framer-motion";

// Green dot and text: "Available now, only 3 spots left"
export default function HeroAvailableTag() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.22 }}
      className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#111111] border border-neutral-800 text-xs md:text-sm font-medium text-gray-200 mb-7 mx-auto"
      style={{ fontFamily: "Inter, Poppins, Satoshi, sans-serif" }}
      >
      <span className="block w-2 h-2 rounded-full bg-green-500 shadow-sm ring-1 ring-green-400"></span>
      <span>
        <span className="opacity-90">Available now,</span>{" "}
        <span className="font-semibold text-white">only 3 spots left</span>
      </span>
    </motion.div>
  );
}
