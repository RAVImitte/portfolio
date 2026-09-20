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
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${__SITE_ORIGIN__}${location.pathname}`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", copy.documentTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", copy.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `${__SITE_ORIGIN__}${location.pathname}`);
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    const imageUrl = `${__SITE_ORIGIN__}/og-${role}.png`;
    if (ogImage) ogImage.setAttribute("content", imageUrl);
    if (twitterImage) twitterImage.setAttribute("content", imageUrl);
  }, [location.pathname, role]);

  const withRole = useCallback((to: string) => withRoleParam(to, role), [role]);
  const value = useMemo(() => ({ role, withRole }), [role, withRole]);

  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>;
}
