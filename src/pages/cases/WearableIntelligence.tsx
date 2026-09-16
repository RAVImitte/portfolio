import { CaseStudy } from "../../components/CaseStudy";
import { wearable } from "../../data/wearable";

export function WearableIntelligence() {
  return (
    <main id="main" className="page">
      <CaseStudy data={wearable} diagrams={{ architecture: ["wear"] }} />
    </main>
  );
}
