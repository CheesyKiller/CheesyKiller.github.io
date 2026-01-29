import { type LanguageCode, type Translations } from "./language-helper";

export const Kind = {
  HEADER: "Header",
  LIST: "List",
  LISTOF: "ListOf",
  PARAGRAPH: "Paragraph"
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

export type RawHTMLGroup = Paragraph | List | Header;

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
  }
}