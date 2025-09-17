"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", idx: 0 },
  { name: "Skills", href: "#skills", idx: 1 },
  { name: "Experience", href: "#experience", idx: 2 },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent, href: string, idx: number) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      // smooth scroll
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: navigate normally
      window.location.href = href;
    }

    // tell mascot to move to that section
    const ev = new CustomEvent("mascotMove", { detail: { sectionIndex: idx } });
    window.dispatchEvent(ev);

    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-4 z-40 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all backdrop-blur-md bg-midnight-500/40 rounded-lg">
      <div className="flex items-center justify-between py-3">
        <a href="#home" onClick={(e) => handleNavClick(e, "#home", 0)} className="text-2xl font-bold text-cerulean-500 tracking-tight">
          Smruti.dev
        </a>

        <nav className="hidden md:flex items-center gap-8 text-slate-200/90 font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href, link.idx)} className="hover:text-cerulean-500 transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Open menu" className="text-cerulean-500 p-2 rounded-md hover:bg-midnight-500/25">
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2 pb-3 border-t border-slategraph-500/10 pt-3">
          <nav className="flex flex-col gap-3 px-2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href, link.idx)} className="px-3 py-2 rounded-md hover:bg-midnight-500/30 transition text-slate-200/90">
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
