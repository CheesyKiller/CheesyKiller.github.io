import type { LanguageCode } from "../utility/language-helper";
import { print } from "../utility/html-generation-parseing";

import { ABOUT_TEXT, CURRENT_PROJECT_TEXT, FOCUS_LIST } from "../constants/pages/Home";

export default function Home({ lang }: { lang: LanguageCode }) {
  return (
    <section>
      {print(lang, CURRENT_PROJECT_TEXT)}
      {print(lang, ABOUT_TEXT)}
      {print(lang, FOCUS_LIST)}
    </section>
  );
}