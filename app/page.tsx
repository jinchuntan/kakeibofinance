import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import UploadSection from "@/components/UploadSection";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <Hero />

      <div className="section-divider" />

      {/* Problem */}
      <ProblemSection />

      <div className="section-divider" />

      {/* Upload */}
      <UploadSection />
    </main>
  );
}
