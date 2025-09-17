import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function HomePage() {
  return (
    <main>
      <Header />
      <section id="home"><Hero /></section>
      <section id="skills"><Skills /></section>
      <section id="experience"><Experience /></section>

      {/* Mascot client wrapper */}
      {/* <MascotClient /> */}
    </main>
  );
}
