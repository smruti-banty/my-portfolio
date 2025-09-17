// components/ScrollToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`fixed right-6 bottom-8 z-50 rounded-full p-3 shadow-lg transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-white text-blue-600`}
    >
      <FaArrowUp />
    </button>
  );
}
