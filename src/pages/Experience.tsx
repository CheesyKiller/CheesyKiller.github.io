import type { LanguageCode } from "../utility/language-helper";
import { print } from "../utility/html-generation-parseing";

import { WORK_EXPERIENCE_LIST, SKILLS_LIST } from "../constants/pages/Experience";

export default function Experience({ lang }: { lang: LanguageCode }) {
  return (
    <section>
      {print(lang, WORK_EXPERIENCE_LIST)}
      {print(lang, SKILLS_LIST)}
    </section>
  );
}