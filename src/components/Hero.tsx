import HeroSticker from "@/components/HeroSticker";

export default function Hero() {
  return (
    <section
      id="home"
      // custom padding top: 88px (instead of 80px) for ~8px more space on all devices
      className="min-h-[70vh] flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16"
    >
      {/* Left side: Sticker */}
      <HeroSticker />

      {/* Right side: Intro text */}
      <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Hi, I’m Smruti 👋
        </h1>
        <p className="text-lg md:text-xl text-slate-200/90 max-w-2xl leading-relaxed">
          Full-Stack Developer with strong{" "}
          <span className="font-semibold text-cerulean-400">
            Backend expertise
          </span>{" "}
          — designing scalable{" "}
          <span className="font-semibold">microservices</span>, APIs, and
          cloud-native systems using{" "}
          <span className="font-semibold">Java & Spring Boot</span>. Experienced
          in modern{" "}
          <span className="font-semibold">React, Next.js & Node.js</span> with
          <span className="font-semibold"> Tailwind CSS</span> for sleek design,
          skilled at writing efficient{" "}
          <span className="font-semibold">Python scripts</span>, and exploring{" "}
          <span className="font-semibold">AI-driven solutions</span> to bring
          intelligence into applications.
        </p>
      </div>
    </section>
  );
}
