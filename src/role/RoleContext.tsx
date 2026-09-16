import { createContext, useCallback, useContext, useLayoutEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { parseRole, ROLE_QUERY, roleFromPath, withRoleParam, type Role } from "../data/role";
import { edition } from "../data/editions";

type RoleApi = {
  role: Role;
  withRole: (to: string) => string;
};

const RoleCtx = createContext<RoleApi>({
  role: "backend",
  withRole: (to) => to,
});

export function useRole(): RoleApi {
  return useContext(RoleCtx);
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const fromPath = roleFromPath(location.pathname);
  const fromQuery = parseRole(new URLSearchParams(location.search).get(ROLE_QUERY));
  const role: Role = fromPath ?? fromQuery ?? "backend";

  useLayoutEffect(() => {
    const copy = edition[role];
    document.documentElement.dataset.role = role;
    document.title = copy.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", copy.description);
  }, [role]);

  const withRole = useCallback((to: string) => withRoleParam(to, role), [role]);
  const value = useMemo(() => ({ role, withRole }), [role, withRole]);

  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>;
}
