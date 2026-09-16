import type { Role } from "./role";

export type SkillBlock = {
  label: string;
  items: string[];
};

export type Metric = {
  value: string;
  numeric?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Shown first, and marked, when this edition is active. */
  focus?: Role | readonly Role[];
};

export type Chapter = { id: string; label: string };

export type SourceLink = { label: string; href: string };

export type RoleLens = {
  dek: string;
  frame: string;
  stackLead: string[];
};

export type CaseStudy = {
  slug: string;
  kicker: string;
  title: string;
  flipId: string;
  dek: string;
  role: string;
  timeframe: string;
  chapters: Chapter[];
  problem: string[];
  constraints: string[];
  built: string[];
  hardParts: { title: string; body: string[] }[];
  metrics: Metric[];
  outcomes: string[];
  stack: string[];
  sources?: SourceLink[];
  note?: string;
  lenses: Record<Role, RoleLens>;
};
