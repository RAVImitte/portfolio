import { CaseStudy } from "../components/CaseStudy";
import { livingLabs } from "../data/livingLabs";
import { findMyMobile } from "../data/findMyMobile";
import { wearable } from "../data/wearable";
import { zeroMiles } from "../data/zeroMiles";
import { dermaAssist } from "../data/dermaAssist";
import { mockServer } from "../data/mockServer";

export function LivingLabs() {
  return (
    <main id="main" className="page">
      <CaseStudy data={livingLabs} diagrams={{ architecture: ["bff"], hard: ["etl"] }} />
    </main>
  );
}

export function FindMyMobile() {
  return (
    <main id="main" className="page">
      <CaseStudy data={findMyMobile} diagrams={{ architecture: ["fmm"] }} />
    </main>
  );
}

export function WearableIntelligence() {
  return (
    <main id="main" className="page">
      <CaseStudy data={wearable} diagrams={{ architecture: ["wear"] }} />
    </main>
  );
}

export function ZeroMiles() {
  return (
    <main id="main" className="page">
      <CaseStudy data={zeroMiles} diagrams={{ architecture: ["pairing"], hard: ["notify"] }} />
    </main>
  );
}

export function DermaAssist() {
  return (
    <main id="main" className="page">
      <CaseStudy data={dermaAssist} diagrams={{ architecture: ["agent"] }} />
    </main>
  );
}

export function MockServer() {
  return (
    <main id="main" className="page">
      <CaseStudy data={mockServer} diagrams={{ architecture: ["mock"] }} />
    </main>
  );
}
