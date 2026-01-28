import { type Translations } from "./language-helper";

export type ParagraphDef = {
  HEADER: Translations;
  TEXT: Translations;
};

export type ListDef = {
  HEADER: Translations;
  ITEMS: Translations[];
}