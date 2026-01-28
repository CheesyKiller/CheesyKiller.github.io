import type { ComponentType } from "react";

import { type Translations } from "../utility/language-helper";

import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";

type PageDef = {
  ELEMENT: ComponentType<any>;
  NAV_TITLE: Translations;
  ROUTE: string;
  TITLE: Translations;
};

export const PAGE_LIST = {
  HOME: {
    ELEMENT: Home,
    NAV_TITLE: {
      EN: "Home",
      JA: "ホーム",
    },
    ROUTE: "/",
    TITLE: {
      EN: "Resume",
      JA: "履歴書",
    },
  },
  PROJECTS: {
    ELEMENT: Projects,
    NAV_TITLE: {
      EN: "Projects",
      JA: "プロジェクト",
    },
    ROUTE: "/projects",
    TITLE: {
      EN: "Projects",
      JA: "プロジェクト",
    },
  },
  EXPERIENCE: {
    ELEMENT: Experience,
    NAV_TITLE: {
      EN: "Experience",
      JA: "経歴",
    },
    ROUTE: "/experience",
    TITLE: {
      EN: "Experience",
      JA: "経歴",
    },
  },
} as const satisfies Record<string, PageDef>;