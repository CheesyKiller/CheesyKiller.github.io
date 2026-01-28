import type { LanguageCode } from "../utility/language-helper";

import { EXPERIENCE_TEXT, SKILLS_LIST } from "../constants/pages/Experience";

export default function Experience({ lang }: { lang: LanguageCode }) {
  return (
    <section>
      <h2>{EXPERIENCE_TEXT.HEADER[lang]}</h2>
      <p>{EXPERIENCE_TEXT.TEXT[lang]}</p>

      <h3>{SKILLS_LIST.HEADER[lang]}</h3>
      <ul>
        {SKILLS_LIST.ITEMS.map((item) => (
          <li key={item.EN}>{item[lang]}</li>
        ))}
      </ul>
    </section>
  );
}