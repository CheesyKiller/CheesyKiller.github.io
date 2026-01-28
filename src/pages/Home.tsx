import type { LanguageCode } from "../utility/language-helper";

import { ABOUT_TEXT, FOCUS_LIST } from "../constants/pages/Home";

export default function Home({ lang }: { lang: LanguageCode }) {
  return (
    <section>
      <h2>{ABOUT_TEXT.HEADER[lang]}</h2>
      <p>{ABOUT_TEXT.TEXT[lang]}</p>

      <h3>{FOCUS_LIST.HEADER[lang]}</h3>
      <ul>
        {FOCUS_LIST.ITEMS.map((item) => (
          <li key={item.EN}>{item[lang]}</li>
        ))}
      </ul>
    </section>
  );
}