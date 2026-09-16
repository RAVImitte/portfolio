export type Role = "backend" | "android";

export const ROLE_QUERY = "role";

export function isRole(value: string | null | undefined): value is Role {
  return value === "backend" || value === "android";
}

export function parseRole(value: string | null | undefined): Role | null {
  return isRole(value) ? value : null;
}

export function pathOnly(to: string): string {
  return to.split("#")[0].split("?")[0];
}

/** `/backend/about` → `/about`; `/android` → `/`. */
export function stripEdition(path: string): string {
  const pathname = pathOnly(path);
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isRole(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function roleFromPath(path: string): Role | null {
  const first = pathOnly(path).split("/").filter(Boolean)[0];
  return parseRole(first);
}

/** Stamp an in-site path onto `/backend` or `/android`. */
export function withRoleParam(to: string, role: Role): string {
  if (!to.startsWith("/")) return to;
  const url = new URL(to, "https://ravi.local");
  url.searchParams.delete(ROLE_QUERY);
  const inner = stripEdition(url.pathname);
  const prefixed = inner === "/" ? `/${role}` : `/${role}${inner}`;
  return `${prefixed}${url.search}${url.hash}`;
}
