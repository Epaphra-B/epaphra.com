// app/page.tsx or app/layout.tsx (for background persistence)

import OrbParticles from "@/app/components/OrbParticles";
import { Navigation } from "@/app/components/nav";

export default function HomePage() {
  return (
      <main className="relative min-h-screen flex items-center justify-center">
        <OrbParticles />
        <Navigation />
      <div className="z-10 text-white text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="mt-2 text-lg">Hello</p>
      </div>
    </main>
  );
}
