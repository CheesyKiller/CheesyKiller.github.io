import { type ListDef, type ParagraphDef } from "../../utility/html-generation-parseing"

export const ABOUT_TEXT = {
    HEADER: {
        EN: "About This Webpage",
        JA: "本ウェブページについて"
    },
    TEXT: {
        EN: "This is my resume site built with React + TypeScript, deployed on GitHub Pages.",
        JA: "本サイトは、React と TypeScript を用いて構築した私の職務経歴サイトで、GitHub Pages 上にデプロイしています。"
    },
} as const satisfies ParagraphDef;

export const FOCUS_LIST = {
    HEADER: {
        EN: "Primary Focus",
        JA: "重点的に取り組んでいる分野"
    },
    ITEMS: [{
            EN: "Frontend: React, TypeScript",
            JA: "フロントエンド：React、TypeScript",
        }, {
            EN: "Deployment: GitHub Pages",
            JA: "デプロイメント: GitHub Pages",
        }, {
            EN: "Next Project: JSON + three.js",
            JA: "次のプロジェクト: JSON + three.js",
        }
    ]
} as const satisfies ListDef;