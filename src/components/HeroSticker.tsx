"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSticker() {
  return (
    <motion.div
      className="
        relative w-40 h-40 md:w-52 md:h-52
        rounded-full overflow-hidden
        border-4 border-[rgba(90,178,255,0.5)]
        shadow-[0_0_25px_rgba(90,178,255,0.35)]
        bg-[rgba(255,255,255,0.06)] backdrop-blur-md
        flex items-center justify-center
      "
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.04, rotate: 1.5 }}
    >
      <Image
        src="/my-sticker.png"
        alt="Smruti sticker"
        fill
        className="object-cover"
        style={{ objectPosition: "50% 58%" }} // 👈 push image slightly downward
        priority
      />
    </motion.div>
  );
}
