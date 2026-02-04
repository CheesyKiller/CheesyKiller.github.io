import { type LanguageCode, type Translations } from "./language-helper";

export const Kind = {
  HEADER: "Header",
  LIST: "List",
  LISTOF: "ListOf",
  PARAGRAPH: "Paragraph",
  DATE: "Date"
} as const;

export type Header = {
  KIND: typeof Kind.HEADER;
  TEXT: Translations;
};

export type Paragraph = {
  KIND: typeof Kind.PARAGRAPH;
  TEXT: Translations;
  HEADER?: Header;
};

export type List = {
  KIND: typeof Kind.LIST;
  ITEMS: Translations[];
  HEADER?: Header;
};

export type FlexDate = {
  KIND: typeof Kind.DATE;
  DAY: number;
  MONTH: number;
  YEAR: number;
  TITLE?: Translations;
};

export type RawHTMLGroup = FlexDate | Paragraph | List | Header;

export type ListOf = {
  KIND: typeof Kind.LISTOF;
  ITEMS: RawHTMLGroup[];
  HEADER?: Header;
}

export type HTMLGroup = RawHTMLGroup | ListOf;

export function createHeader (
  TEXT: Translations
): Header {
  return {
    KIND: Kind.HEADER,
    TEXT
  }
}

export function createParagraph(
  TEXT: Translations,
  HEADER?: Header
): Paragraph {
  return {
    KIND: Kind.PARAGRAPH,
    TEXT,
    HEADER
  };
}

export function createList(
  ITEMS: Translations[],
  HEADER?: Header
): List {
  return {
    KIND: Kind.LIST,
    ITEMS,
    HEADER
  };
}

export function createFlexDate(
  DAY: number,
  MONTH: number,
  YEAR: number,
  TITLE?: Translations
): FlexDate {
  return {
    KIND: Kind.DATE,
    DAY,
    MONTH,
    YEAR,
    TITLE
  };
}

export function createListOf(
  ITEMS: RawHTMLGroup[],
  HEADER?: Header
): ListOf {
  return {
    KIND: Kind.LISTOF,
    ITEMS,
    HEADER
  };
}

function printHeader(def: Header, size: number, lang: LanguageCode, indentSize?: number) {
  if (indentSize == null) {
    indentSize = 0;
  }
  switch (size) {
    case 1:
      return (<h1 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h1>);
    case 2:
      return (<h2 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h2>);
    case 3:
      return (<h3 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h3>);
    case 4:
      return (<h4 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h4>);
    case 5:
      return (<h5 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h5>);
    default:
      return (<h6 style={{ paddingLeft: `${indentSize}rem` }}>{def.TEXT[lang]}</h6>);
  }
}

function printParagraph(def: Paragraph, size: number, lang: LanguageCode, indentSize: number) {
  return (
    <section>
      {print(lang, def.HEADER, size, indentSize)}
      <p style={{ paddingLeft: `${indentSize + 1}rem` }}>{def.TEXT[lang]}</p>
    </section>
  );
}

function printList(def: List, size: number, lang: LanguageCode, indentSize: number) {
  return (
    <section>
      {print(lang, def.HEADER, size, indentSize)}
      <ul style={{ paddingLeft: `${indentSize + 2}rem` }}>
        {def.ITEMS.map((item) => (
          <li key={item[lang]}>{item[lang]}</li>
        ))}
      </ul>
    </section>
  );
}

function formatDate(
  date: FlexDate,
  lang: LanguageCode
): string {
  const { YEAR, MONTH, DAY } = date;

  if (lang === "JA") {
    return `${YEAR}年${MONTH}月${DAY}日`;
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const monthName = monthNames[MONTH - 1];
  return `${monthName} ${DAY}, ${YEAR}`;
}

function printFlexDate(def: FlexDate, lang: LanguageCode, indentSize: number) {
  return (
    <section>
      <div style={{ paddingLeft: `${indentSize}rem`}}>
        {def.TITLE ? (
          <>
            <span>
              {def.TITLE[lang] ?? def.TITLE.EN}
            </span>
            {": "}
          </>
        ) : null}
        {formatDate(def, lang)}
      </div>
    </section>
  );
}

function printListOf(def: ListOf, size: number, lang: LanguageCode, indentSize: number) {
  return (
    <section>
      {print(lang, def.HEADER, size, indentSize)}
      {def.ITEMS.map((item) => (
        <>
          {print(lang, item, size + 1, indentSize + 1)}
        </>
      ))}
    </section>
  );
}

export function print(lang: LanguageCode, def?: HTMLGroup, size?: number, indentSize?: number) {
  if (def == null) {
    return;
  }
  if (size == null) {
    size = 2;
  }
  if (indentSize == null) {
    indentSize = 1;
  }
  switch (def.KIND) {
    case Kind.PARAGRAPH:
      return printParagraph(def, size, lang, indentSize);
    case Kind.LIST:
      return printList(def, size, lang, indentSize);
    case Kind.LISTOF:
      return printListOf(def, size, lang, indentSize);
    case Kind.HEADER:
      return printHeader(def, size, lang, indentSize);
    case Kind.DATE:
      return printFlexDate(def, lang, indentSize);
  }
}