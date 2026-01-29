import { createHeader, createList, createParagraph} from "../../utility/html-generation-parseing"

export const ABOUT_TEXT = createParagraph(
    {
        EN: "This is my resume site built with React + TypeScript, deployed on GitHub Pages.",
        JA: "本サイトは、React と TypeScript を用いて構築した私の職務経歴サイトで、GitHub Pages 上にデプロイしています。本サイトは英語から日本語へ翻訳しています。翻訳上の不備がありましたらご容赦ください。"
    },
    createHeader({
        EN: "About This Webpage",
        JA: "本ウェブページについて"
    })
);

export const CURRENT_PROJECT_TEXT = createParagraph(
    {
        EN: "I am currently working on a 3D renderer and physics engine based around signed distance fields with Vulkan.",
        JA: "現在、Vulkan を用いた符号付き距離関数（Signed Distance Fields）ベースの 3D レンダラーおよび物理エンジンの開発に取り組んでいます。"
    },
    createHeader({
        EN: "Current Project",
        JA: "現在取り組んでいるプロジェクト"
    })
);

export const FOCUS_LIST = createList(
    [{
            EN: "Frontend: React, TypeScript",
            JA: "フロントエンド：React、TypeScript",
        }, {
            EN: "Deployment: GitHub Pages",
            JA: "デプロイメント: GitHub Pages",
        }, {
            EN: "Next Project: JSON + three.js",
            JA: "次のプロジェクト: JSON + three.js",
        }
    ],
    createHeader({
        EN: "Primary Focus",
        JA: "重点的に取り組んでいる分野"
    })
);