export const SupportedLanguages = {
    English: {
        CODE: "EN",
        LABEL: "English",
        MATCH: ["en"],
    },
    Japanese: {
        CODE: "JA",
        LABEL: "日本語",
        MATCH: ["ja"],
    },
} as const;

export type Translations = Record<LanguageCode, string>;

export type LanguageCode =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages]["CODE"];

const SUPPORTED = Object.values(SupportedLanguages);

export function detectLanguage(): LanguageCode {
  const browserLangs = navigator.languages ?? [navigator.language];

  for (const bl of browserLangs) {
    const lower = bl.toLowerCase();
    for (const s of SUPPORTED) {
      if (s.MATCH.some((m) => lower.startsWith(m))) {
        return s.CODE;
      }
    }
  }

  return "EN";
}

export function getInitialLang(): LanguageCode {
  const saved = localStorage.getItem("lang");

  if (
    saved &&
    SUPPORTED.some((s) => s.CODE === saved)
  ) {
    return saved as LanguageCode;
  }

  return detectLanguage();
}