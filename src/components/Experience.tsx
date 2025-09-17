"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const experiences = [
  {
    company: "SupplyHouse.com",
    role: "Full Stack Developer",
    period: "Jul 2024 – Present",
    details: [
      "Leveraged Amazon S3 for efficient storage and retrieval of large-scale data.",
      "Developed scalable microservices architectures enabling modular functionality.",
      "Collaborated in Agile teams to deliver production-ready features.",
    ],
  },
  {
    company: "Glorzient Technology",
    role: "Software Developer",
    period: "Sep 2022 – Jul 2024",
    details: [
      "Led microservices development using Spring Boot.",
      "Built React-based admin portals and dashboards.",
      "Integrated MongoDB & Elasticsearch for reliable search functionality.",
    ],
  },
  {
    company: "Mindtree",
    role: "Software Engineer",
    period: "Oct 2021 – Sep 2022",
    details: [
      "Worked on backend APIs using Core Java and Spring.",
      "Participated in CI/CD pipeline enhancements and containerization.",
      "Collaborated across teams to deliver client projects on schedule.",
    ],
  },
  {
    company: "Oditek Solutions",
    role: "Software Engineer",
    period: "Apr 2021 – Sep 2021",
    details: [
      "Implemented unit & integration tests for Spring Boot apps.",
      "Improved build automation and release processes.",
      "Contributed to design and code reviews to raise quality.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.28 && !firedRef.current) {
            window.dispatchEvent(new CustomEvent("mascotMove", { detail: { sectionIndex: 2 } }));
            firedRef.current = true;
          } else if (!entry.isIntersecting && firedRef.current) {
            firedRef.current = false;
          }
        });
      },
      { threshold: [0.15, 0.28, 0.6], root: null, rootMargin: "-14% 0px -14% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-ink-500/70 py-16 px-6"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="experience-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <div className="relative">
          {/* center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full border-l border-slategraph-500/30 transform -translate-x-1/2 z-0" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`relative flex w-full md:items-center ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* desktop dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="block w-5 h-5 bg-cerulean-500 rounded-full ring-4 ring-ink-500 shadow-md" />
                </div>

                <motion.article
                  className={`relative w-full md:w-1/2
                    bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.06)]
                    rounded-2xl p-6 z-10 shadow-[0_8px_30px_rgba(2,6,23,0.6)]
                    ${idx % 2 === 0 ? "md:pr-10 md:pl-6" : "md:pl-10 md:pr-6"}`}
                  initial={reduced ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-platinum-500 font-medium">{exp.company}</p>
                      <span className="text-sm text-slate-200/70">{exp.period}</span>
                    </div>
                    {/* small badge for current role */}
                    {idx === 0 && (
                      <div className="ml-4 text-sm inline-flex items-center px-3 py-1 rounded-full bg-cerulean-500 text-midnight-500 font-semibold">
                        Present
                      </div>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2 list-disc list-inside text-slate-200/80">
                    {exp.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>

                  {/* mobile connector line (hide for last) */}
                  {idx !== experiences.length - 1 && (
                    <div className="md:hidden absolute left-1/2 top-full transform -translate-x-1/2 mt-4 w-0.5 h-8 bg-slategraph-500/30" />
                  )}
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
