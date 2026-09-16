import { CaseStudy } from "../../components/CaseStudy";
import { zeroMiles } from "../../data/zeroMiles";

export function ZeroMiles() {
  return (
    <main id="main" className="page">
      <CaseStudy data={zeroMiles} diagrams={{ architecture: ["pairing"], hard: ["notify"] }} />
    </main>
  );
}
