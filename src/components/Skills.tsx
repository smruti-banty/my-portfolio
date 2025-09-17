// components/Skills.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Category = {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
  techs: string[];
  accent: string;
};

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "User interfaces, accessibility & performance",
    highlights: ["React", "Next.js", "TypeScript", "Tailwind"],
    techs: [
      "React (component design, hooks, context)",
      "Next.js (SSR, SSG, routing, data fetching)",
      "TypeScript (typed components & tooling)",
      "Tailwind CSS (design systems, responsive UI)",
      "HTML5 / CSS3 (semantic markup & accessibility)",
      "Performance optimization (lazy loading, code-splitting)",
      "Cross-browser testing & responsive design",
    ],
    accent: "#a855f7",
  },
  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Microservices, API design & scalable systems",
    highlights: ["Java", "Spring Boot", "Microservices", "APIs"],
    techs: [
      "Java & Spring Boot (microservices, REST APIs)",
      "API design (REST, gRPC, GraphQL)",
      "Service design (domain-driven, modular services)",
      "Authentication & authz (OAuth2, JWT)",
      "Integration with relational & NoSQL stores",
      "Performance tuning, caching & pagination",
    ],
    accent: "#f97316",
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Data modelling, reliability & migrations",
    highlights: ["Postgres", "Redis", "MongoDB"],
    techs: [
      "PostgreSQL (schema design, indexing, queries)",
      "MySQL / MariaDB (OLTP workloads)",
      "MongoDB (document stores & flexible schemas)",
      "Redis (caching, rate-limiting, sessions)",
      "Database migrations (Flyway, Liquibase)",
    ],
    accent: "#22c55e",
  },
  {
    id: "aws",
    title: "AWS",
    subtitle: "Cloud deployment, managed services & infra",
    highlights: ["S3", "ECS/Fargate", "RDS"],
    techs: [
      "S3 (assets, static hosting & lifecycle rules)",
      "ECS / Fargate (containerized deployments)",
      "EC2 & Auto Scaling (compute + scaling)",
      "RDS (Postgres) & backups",
      "Lambda & API Gateway (serverless micro-tasks)",
      "CloudWatch (logs, metrics & alarms)",
      "IAM (least-privilege, roles & policies)",
    ],
    accent: "#06b6d4",
  },
  {
    id: "gcp",
    title: "GCP",
    subtitle: "Serverless & container platforms",
    highlights: ["Cloud Run", "Cloud SQL"],
    techs: [
      "Cloud Run (serverless containers)",
      "Cloud SQL (managed Postgres)",
      "GKE (Kubernetes workloads)",
      "GCS (object storage)",
      "Pub/Sub (event-driven messaging)",
      "Cloud Build & CI integrations",
      "Cloud Monitoring / Stackdriver",
    ],
    accent: "#60a5fa",
  },
  {
    id: "devops",
    title: "DevOps & Observability",
    subtitle: "CI/CD, infra-as-code & production quality",
    highlights: ["Docker", "Kubernetes", "Terraform"],
    techs: [
      "Docker & containerization best practices",
      "Kubernetes (deployments, services, ingress)",
      "GitHub Actions / Jenkins (CI/CD pipelines)",
      "Terraform (IaC, reproducible environments)",
      "Prometheus & Grafana (metrics & dashboards)",
      "Logging & tracing (ELK, OpenTelemetry concepts)",
      "Security & SRE practices (alerts, runbooks)",
    ],
    accent: "#f43f5e",
  },
];

export default function Skills() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const hexToRgba = (hex: string, alpha = 0.18) => {
    const h = hex.replace("#", "");
    const normalized =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Bullet component
  const Bullet = ({ accent }: { accent: string }) => {
    const glow = hexToRgba(accent, 0.14);
    const borderColor = hexToRgba(accent, 0.95);
    return (
      <span
        className="flex-shrink-0"
        aria-hidden
        style={{
          width: 16, // slightly bigger
          height: 16,
          borderRadius: "50%",
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 6px ${glow}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
      </span>
    );
  };

  return (
    <section id="skills" className="w-full bg-midnight-500/80 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            🛠️ Skills & Specialties
          </h2>
          <p className="text-sm text-slate-300/70 mt-2">
            What I work with — tools, platforms & practices
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={cat.id} style={{ perspective: 1200 }}>
                <motion.div
                  animate={{ rotateY: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full h-80 lg:h-96" // responsive card height
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {cat.title}
                      </h3>
                      <p
                        className="text-sm md:text-base text-slate-300/80 mt-1 overflow-hidden"
                        style={{ lineHeight: "1.25rem", height: "2.5rem" }}
                      >
                        {cat.subtitle}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cat.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs md:text-sm font-medium px-2.5 py-1 rounded-md border"
                            style={{
                              background: hexToRgba(cat.accent, 0.06),
                              color: cat.accent,
                              borderColor: hexToRgba(cat.accent, 0.08),
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Tech preview */}
                      <div className="mt-4 space-y-4">
                        {cat.techs.slice(0, 2).map((t) => (
                          <div key={t} className="flex items-center gap-3">
                            <Bullet accent={cat.accent} />
                            <span className="text-sm md:text-base text-slate-200/90">
                              {t}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="h-12 mt-4 flex items-center justify-end">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="whitespace-nowrap text-sm md:text-base text-slate-200/85 bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        {isOpen ? "Close" : "Show more"}
                      </button>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-2xl p-6 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md flex flex-col"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-3">
                      <h4
                        className="text-sm md:text-base font-semibold"
                        style={{ color: cat.accent }}
                      >
                        {cat.title} — Details
                      </h4>
                    </div>
                    <div className="flex-1 overflow-auto pr-2 space-y-4 custom-scrollbar">
                      {cat.techs.map((t) => (
                        <div key={t} className="flex items-center gap-3">
                          <Bullet accent={cat.accent} />
                          <span className="text-sm md:text-base text-slate-200/90">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="h-12 mt-4 flex items-center justify-end">
                      <button
                        onClick={() => setOpenIndex(null)}
                        className="whitespace-nowrap text-sm md:text-base text-slate-200/85 bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
