import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MotionRoot } from "./motion/MotionRoot";
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
  const queryRole = parseRole(new URLSearchParams(location.search).get(ROLE_QUERY));
  const next = withRoleParam(`${location.pathname}${location.search}${location.hash}`, queryRole ?? "backend");
  return <Navigate to={next} replace />;
}

function editionPages() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="work" element={<RoleRedirect to="/" />} />
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
      <Header />
      <Routes>
        <Route path="backend">{editionPages()}</Route>
        <Route path="android">{editionPages()}</Route>
        <Route path="*" element={<LegacyToEdition />} />
      </Routes>
      <Footer />
    </MotionRoot>
  );
}
