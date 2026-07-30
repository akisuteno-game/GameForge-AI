// ======================================
// GameForge AI
// memory.js
// 長期会話メモリ管理
// ======================================

const MEMORY_KEY = "gameforge-memory-v1";

let memory = loadMemory();

// -------------------------
// メモリ読み込み
// -------------------------

function loadMemory() {

    try {

        const data = localStorage.getItem(MEMORY_KEY);

        if (!data) {

            return {
                profile: {},
                projects: [],
                facts: [],
                preferences: {},
                summaries: []
            };

        }

        return JSON.parse(data);

    } catch (e) {

        console.error(e);

        return {
            profile: {},
            projects: [],
            facts: [],
            preferences: {},
            summaries: []
        };

    }

}

// -------------------------
// 保存
// -------------------------

function saveMemory() {

    localStorage.setItem(

        MEMORY_KEY,

        JSON.stringify(memory)

    );

}

// -------------------------
// 全取得
// -------------------------

export function getMemory() {

    return memory;

}

// -------------------------
// リセット
// -------------------------

export function clearMemory() {

    memory = {

        profile: {},
        projects: [],
        facts: [],
        preferences: {},
        summaries: []

    };

    saveMemory();

}

// -------------------------
// プロファイル
// -------------------------

export function setProfile(key, value) {

    memory.profile[key] = value;

    saveMemory();

}

export function getProfile(key) {

    return memory.profile[key];

}

// -------------------------
// 設定
// -------------------------

export function setPreference(key, value) {

    memory.preferences[key] = value;

    saveMemory();

}

export function getPreference(key) {

    return memory.preferences[key];

}

// -------------------------
// プロジェクト
// -------------------------

export function addProject(project) {

    const exists = memory.projects.find(

        p => p.id === project.id

    );

    if (exists) return;

    memory.projects.push(project);

    saveMemory();

}

export function updateProject(id, data) {

    const project = memory.projects.find(

        p => p.id === id

    );

    if (!project) return;

    Object.assign(project, data);

    saveMemory();

}

export function getProjects() {

    return memory.projects;

}

// -------------------------
// 重要情報
// -------------------------

export function addFact(text) {

    if (

        memory.facts.includes(text)

    ) return;

    memory.facts.push(text);

    saveMemory();

}

export function removeFact(text) {

    memory.facts = memory.facts.filter(

        f => f !== text

    );

    saveMemory();

}

export function getFacts() {

    return memory.facts;

}

// -------------------------
// 会話要約
// -------------------------

export function addSummary(summary) {

    memory.summaries.push({

        time: Date.now(),

        text: summary

    });

    if (

        memory.summaries.length > 100

    ) {

        memory.summaries.shift();

    }

    saveMemory();

}

export function getSummaries() {

    return memory.summaries;

}

// -------------------------
// 全文検索
// -------------------------

export function searchMemory(keyword) {

    const result = [];

    memory.facts.forEach(f => {

        if (

            f.toLowerCase().includes(

                keyword.toLowerCase()

            )

        ) {

            result.push({

                type: "fact",

                value: f

            });

        }

    });

    memory.projects.forEach(p => {

        if (

            JSON.stringify(p)

                .toLowerCase()

                .includes(

                    keyword.toLowerCase()

                )

        ) {

            result.push({

                type: "project",

                value: p

            });

        }

    });

    memory.summaries.forEach(s => {

        if (

            s.text.toLowerCase()

                .includes(

                    keyword.toLowerCase()

                )

        ) {

            result.push({

                type: "summary",

                value: s

            });

        }

    });

    return result;

}

// -------------------------
// エクスポート
// -------------------------

export function exportMemory() {

    return JSON.stringify(

        memory,

        null,

        2

    );

}

// -------------------------
// インポート
// -------------------------

export function importMemory(json) {

    try {

        memory = JSON.parse(json);

        saveMemory();

        return true;

    } catch (e) {

        console.error(e);

        return false;

    }

}
