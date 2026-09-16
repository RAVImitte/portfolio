import { CaseStudy } from "../../components/CaseStudy";
import { livingLabs } from "../../data/livingLabs";

export function LivingLabs() {
  return (
    <main id="main" className="page">
      <CaseStudy data={livingLabs} diagrams={{ architecture: ["bff"], hard: ["etl"] }} />
    </main>
  );
}
