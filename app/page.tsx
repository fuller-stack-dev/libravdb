import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Visualizer } from "./components/visualizer";
import { Integrations } from "./components/integrations";
import { CtaSection } from "./components/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Visualizer />
      <Integrations />
      <CtaSection />
    </>
  );
}
