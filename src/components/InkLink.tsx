import type { MouseEvent, ReactNode } from "react";
import { useMotion } from "../motion/MotionRoot";
import { useRole } from "../role/RoleContext";

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  flipId?: string;
};

export function InkLink({ to, children, className, flipId }: Props) {
  const { go } = useMotion();
  const { withRole } = useRole();
  const external = to.startsWith("http") || to.startsWith("mailto:") || to.endsWith(".pdf");
  const href = external ? to : withRole(to);

  if (external) {
    return (
      <a className={className} href={to} target={to.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    go(href, { flipId });
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
