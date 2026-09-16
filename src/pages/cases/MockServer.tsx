import { CaseStudy } from "../../components/CaseStudy";
import { mockServer } from "../../data/mockServer";

export function MockServer() {
  return (
    <main id="main" className="page">
      <CaseStudy data={mockServer} diagrams={{ architecture: ["mock"] }} />
    </main>
  );
}
