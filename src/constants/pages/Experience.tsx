import { type ListDef, type ParagraphDef } from "../../utility/html-generation-parseing"

export const EXPERIENCE_TEXT = {
    HEADER: {
        EN: "Experience",
        JA: ""
    },
    TEXT: {
        EN: "Add your work history, skills, and highlights here.",
        JA: ""
    },
} as const satisfies ParagraphDef;

export const SKILLS_LIST = {
    HEADER: {
        EN: "Skills",
        JA: ""
    },
    ITEMS: [{
            EN: "TypeScript",
            JA: "TypeScript",
        }, {
            EN: "React",
            JA: "React",
        }, {
            EN: "Vite",
            JA: "Vite",
        }
    ]
} as const satisfies ListDef;