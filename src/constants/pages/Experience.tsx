import { createHeader, createList, createListOf, createParagraph } from "../../utility/html-generation-parseing"

export const WORK_EXPERIENCE_LIST = createListOf(
    [
        createParagraph(
            {
                EN: "Back-end and systems-oriented software engineer at Amazon (Audible), responsible for designing, implementing, and maintaining internal services and system logic in a large-scale production environment. Focused on building reliable and maintainable systems, participating in Agile/Scrum development, performing code reviews, and diagnosing production issues through structured root-cause analysis within globally distributed teams.",
                JA: "Amazon（Audible）にてバックエンドおよびシステム指向のソフトウェアエンジニアとして、大規模な本番環境における内部サービスおよびシステムロジックの設計・実装・運用を担当。信頼性と保守性の高いシステム構築を重視し、Agile／Scrum 開発への参加、コードレビューの実施、ならびにグローバル分散チームと連携した体系的な原因分析による本番障害対応に従事。"
            },
            createHeader({
                EN: "Amazon (Audible) - Software Development Engineer",
                JA: "Amazon（Audible）― ソフトウェア開発エンジニア"
            })
        ),
        createList(
            [
                {
                    EN: "Back-end development",
                    JA: "バックエンド開発"
                },
                {
                    EN: "Large-scale production systems",
                    JA: "大規模本番システム"
                },
                {
                    EN: "System Design",
                    JA: "システム設計"
                },
                {
                    EN: "Java",
                    JA: "Java"
                },
                {
                    EN: "Production Issue Analysis / Troubleshooting",
                    JA: "本番障害分析／トラブルシューティング"
                }
            ]
        ),
        createParagraph(
            {
                EN: "Back-end and systems-oriented software engineer at Amazon (Audible), responsible for designing, implementing, and maintaining internal services and system logic in a large-scale production environment. Focused on building reliable and maintainable systems, participating in Agile/Scrum development, performing code reviews, and diagnosing production issues through structured root-cause analysis within globally distributed teams.",
                JA: "Amazon（Audible）にてバックエンドおよびシステム指向のソフトウェアエンジニアとして、大規模な本番環境における内部サービスおよびシステムロジックの設計・実装・運用を担当。信頼性と保守性の高いシステム構築を重視し、Agile／Scrum 開発への参加、コードレビューの実施、ならびにグローバル分散チームと連携した体系的な原因分析による本番障害対応に従事。"
            },
            createHeader({
                EN: "Amazon (Audible) - Software Development Engineer Intern",
                JA: "Amazon（Audible）― ソフトウェア開発エンジニア（インターン）"
            })
        ),
        createList(
            [
                {
                    EN: "Back-end development",
                    JA: "バックエンド開発"
                },
                {
                    EN: "Large-scale production systems",
                    JA: "大規模本番システム"
                },
                {
                    EN: "System Design",
                    JA: "システム設計"
                },
                {
                    EN: "Java",
                    JA: "Java"
                },
                {
                    EN: "Production Issue Analysis / Troubleshooting",
                    JA: "本番障害分析／トラブルシューティング"
                }
            ]
        ),
        createParagraph(
            {
                EN: "Worked in Amazon’s Global Operations Security Center supporting enterprise-scale security and access-control systems across multiple facilities. Responsible for software configuration, system integration, and operational support for authentication and physical access systems, including setup and validation during new site deployments. Performed troubleshooting and issue resolution in coordination with on-site and global teams, operating under standardized security and compliance processes in a large, mission-critical production environment.",
                JA: "Amazon のグローバル・オペレーション・セキュリティ・センター（GOSC）にて、複数拠点に展開されるエンタープライズ規模のセキュリティおよびアクセス制御システムを支援。認証および物理アクセスシステムのソフトウェア設定、システム統合、運用サポートを担当し、新拠点立ち上げ時の構築および検証業務にも従事。大規模かつミッションクリティカルな本番環境において、標準化されたセキュリティおよびコンプライアンス手順の下、現地およびグローバルチームと連携したトラブルシューティングおよび問題解決を実施。"
            },
            createHeader({
                EN: "Global Operations Security Center (GOSC), IT Systems Operations",
                JA: "グローバル・オペレーション・セキュリティ・センター（GOSC）IT システム運用"
            })
        ),
        createList(
            [
                {
                    EN: "System Operations",
                    JA: "システム運用"
                },
                {
                    EN: "System Integration",
                    JA: "システム統合"
                },
                {
                    EN: "Linux",
                    JA: "Linux"
                },
                {
                    EN: "Troubleshooting",
                    JA: "トラブルシューティング"
                },
                {
                    EN: "Production Operations",
                    JA: "本番運用"
                }
            ]
        )
    ],
    createHeader({
        EN: "Work Experience",
        JA: "職務経歴"
    })
 );

export const SKILLS_LIST = createList(
    [{
            EN: "TypeScript",
            JA: "TypeScript",
        }, {
            EN: "React",
            JA: "React",
        }, {
            EN: "Vite",
            JA: "Vite",
        }
    ],
    createHeader({
        EN: "Skills",
        JA: "スキル"
    })
);