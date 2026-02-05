import { Link } from "react-router-dom";

import type { LanguageCode } from "../utility/language-helper";
import { print } from "../utility/html-generation-parseing";

import { GO_BACK_BEFORE_TEXT, GO_BACK_AFTER_TEXT, HOME_TEXT, PAGE_NOT_FOUND_TEXT } from "../constants/pages/NotFound";

export default function NotFound({ lang }: { lang: LanguageCode }) {
  return (
    <section>
      {print(lang, PAGE_NOT_FOUND_TEXT)}
      <p style={{ paddingLeft: "2rem" }}>
        {GO_BACK_BEFORE_TEXT[lang]}<Link to="/">{HOME_TEXT[lang]}</Link>{GO_BACK_AFTER_TEXT[lang]}
      </p>
    </section>
  );
}