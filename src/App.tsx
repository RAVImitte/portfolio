import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MotionRoot } from "./motion/MotionRoot";
import { AmbientField } from "./design/AmbientField";
import { LiveField } from "./design/LiveField";
import { PointerCursor } from "./motion/PointerCursor";
import { Home } from "./pages/Home";
import { ProjectsIndex } from "./pages/ProjectsIndex";
import { About } from "./pages/About";
import {
  DermaAssist,
  FindMyMobile,
  LivingLabs,
  MockServer,
  WearableIntelligence,
  ZeroMiles,
} from "./pages/cases";
import { parseRole, ROLE_QUERY, withRoleParam } from "./data/role";
import { useRole } from "./role/RoleContext";

function RoleRedirect({ to }: { to: string }) {
  const { withRole } = useRole();
  return <Navigate to={withRole(to)} replace />;
}

function LegacyToEdition() {
  const location = useLocation();
  const known = ["/", "/work", "/about", "/experience", "/projects", "/projects/zero-miles", "/projects/derma-assist", "/projects/dynamic-mock-server", "/work/living-labs", "/work/find-my-mobile", "/work/wearable-intelligence"];
  if (!known.includes(location.pathname)) return <NotFound />;
  const queryRole = parseRole(new URLSearchParams(location.search).get(ROLE_QUERY));
  const next = withRoleParam(`${location.pathname}${location.search}${location.hash}`, queryRole ?? "backend");
  return <Navigate to={next} replace />;
}

function NotFound() {
  return (
    <main id="main" className="page secondary-page not-found wrap">
      <p className="kicker">404 · The page moved</p>
      <h1>Nothing here yet.</h1>
      <p className="lede">Try the selected work index or get in touch if a link sent you somewhere unexpected.</p>
      <a className="btn btn-solid" href="/backend">Back to selected work</a>
    </main>
  );
}

function editionPages() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="work" element={<ProjectsIndex all />} />
      <Route path="work/living-labs" element={<LivingLabs />} />
      <Route path="work/find-my-mobile" element={<FindMyMobile />} />
      <Route path="work/wearable-intelligence" element={<WearableIntelligence />} />
      <Route path="projects" element={<ProjectsIndex />} />
      <Route path="projects/zero-miles" element={<ZeroMiles />} />
      <Route path="projects/derma-assist" element={<DermaAssist />} />
      <Route path="projects/dynamic-mock-server" element={<MockServer />} />
      <Route path="experience" element={<RoleRedirect to="/about#history" />} />
      <Route path="about" element={<About />} />
    </>
  );
}

export default function App() {
  return (
    <MotionRoot>
      <AmbientField />
      <LiveField />
      <PointerCursor />
      <Header />
      <Routes>
        <Route path="backend">{editionPages()}</Route>
        <Route path="android">{editionPages()}</Route>
        <Route path="*" element={<LegacyToEdition />} />
      </Routes>
      <Footer />
      <Analytics />
    </MotionRoot>
  );
}
