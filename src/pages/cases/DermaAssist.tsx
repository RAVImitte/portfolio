import { CaseStudy } from "../../components/CaseStudy";
import { dermaAssist } from "../../data/dermaAssist";

export function DermaAssist() {
  return (
    <main id="main" className="page">
      <CaseStudy data={dermaAssist} diagrams={{ architecture: ["agent"] }} />
    </main>
  );
}
