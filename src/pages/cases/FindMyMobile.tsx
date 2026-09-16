import { CaseStudy } from "../../components/CaseStudy";
import { findMyMobile } from "../../data/findMyMobile";

export function FindMyMobile() {
  return (
    <main id="main" className="page">
      <CaseStudy data={findMyMobile} diagrams={{ architecture: ["fmm"] }} />
    </main>
  );
}
