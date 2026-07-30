// ======================================
// GameForge AI
// rag.js
// Retrieval-Augmented Generation (RAG)
// プロジェクト全体・長期記憶検索
// ======================================

import { getMemory } from "./memory.js";
import { getProject } from "./project.js";

const MAX_RESULTS = 20;
const SNIPPET_LENGTH = 400;

// --------------------------------------
// テキスト正規化
// --------------------------------------

function normalize(text = "") {

    return String(text)
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

}

// --------------------------------------
// スコア計算
// --------------------------------------

function score(text, keywords) {

    const source = normalize(text);

    let point = 0;

    for (const keyword of keywords) {

        if (!keyword) continue;

        const hit = source.match(
            new RegExp(keyword, "g")
        );

        if (hit) {

            point += hit.length;

        }

    }

    return point;

}

// --------------------------------------
// スニペット生成
// --------------------------------------

function snippet(text) {

    if (!text) return "";

    if (text.length <= SNIPPET_LENGTH) {

        return text;

    }

    return text.slice(0, SNIPPET_LENGTH) + "...";

}

// --------------------------------------
// 検索
// --------------------------------------

export function searchKnowledge(query) {

    const keywords = normalize(query)

        .split(" ")

        .filter(Boolean);

    const results = [];

    const project = getProject();

    const memory = getMemory();

    // ------------------
    // ファイル検索
    // ------------------

    project.files.forEach(file => {

        const text =
            file.path +
            " " +
            file.content;

        const s = score(text, keywords);

        if (s > 0) {

            results.push({

                type: "file",

                title: file.path,

                score: s,

                content: snippet(file.content)

            });

        }

    });

    // ------------------
    // フォルダ
    // ------------------

    project.folders.forEach(folder => {

        const s = score(folder, keywords);

        if (s > 0) {

            results.push({

                type: "folder",

                title: folder,

                score: s,

                content: folder

            });

        }

    });

    // ------------------
    // Facts
    // ------------------

    memory.facts.forEach(fact => {

        const s = score(fact, keywords);

        if (s > 0) {

            results.push({

                type: "fact",

                title: "Fact",

                score: s,

                content: fact

            });

        }

    });

    // ------------------
    // Summary
    // ------------------

    memory.summaries.forEach(summary => {

        const s = score(

            summary.text,

            keywords

        );

        if (s > 0) {

            results.push({

                type: "summary",

                title: new Date(
                    summary.time
                ).toLocaleString(),

                score: s,

                content: snippet(summary.text)

            });

        }

    });

    // ------------------
    // Projects
    // ------------------

    memory.projects.forEach(project => {

        const text = JSON.stringify(project);

        const s = score(text, keywords);

        if (s > 0) {

            results.push({

                type: "project",

                title: project.name,

                score: s,

                content: snippet(text)

            });

        }

    });

    // ------------------
    // Preferences
    // ------------------

    Object.entries(
        memory.preferences
    ).forEach(([key, value]) => {

        const text =
            key +
            " " +
            value;

        const s = score(text, keywords);

        if (s > 0) {

            results.push({

                type: "preference",

                title: key,

                score: s,

                content: String(value)

            });

        }

    });

    results.sort(

        (a, b) =>

            b.score - a.score

    );

    return results.slice(0, MAX_RESULTS);

}

// --------------------------------------
// AIへ渡すコンテキスト
// --------------------------------------

export function buildContext(query) {

    const hits = searchKnowledge(query);

    let context = "";

    hits.forEach(item => {

        context +=
`==================================
TYPE : ${item.type}
TITLE: ${item.title}

${item.content}

`;

    });

    return context;

}

// --------------------------------------
// AIプロンプト生成
// --------------------------------------

export function buildPrompt(query) {

    const project = getProject();

    const context = buildContext(query);

    return `

あなたはGameForge AIです。

# プロジェクト

名前:
${project.name}

バージョン:
${project.version}

エンジン:
${project.engine}

-------------------------

# 関連情報

${context}

-------------------------

# ユーザーの質問

${query}

回答では、
・関連情報を活用する
・存在するファイルを優先する
・存在しない場合は新規作成を提案する
・ゲーム開発者として最適な回答を返す

`;

}

// --------------------------------------
// 関連ファイル取得
// --------------------------------------

export function getRelatedFiles(query) {

    return searchKnowledge(query)

        .filter(

            item =>

                item.type === "file"

        )

        .map(

            item => item.title

        );

}

// --------------------------------------
// プロジェクト要約
// --------------------------------------

export function projectSummary() {

    const project = getProject();

    return {

        name: project.name,

        version: project.version,

        engine: project.engine,

        folders: project.folders.length,

        files: project.files.length

    };

}
