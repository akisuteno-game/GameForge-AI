// ======================================
// GameForge AI
// project.js
// プロジェクト管理
// ======================================

const PROJECT_KEY = "gameforge-project-v1";

let project = loadProject();

// -----------------------------
// 初期化
// -----------------------------

function createProject() {

    return {

        name: "New Game",

        version: "0.1.0",

        engine: "HTML",

        created: Date.now(),

        updated: Date.now(),

        folders: [],

        files: [],

        settings: {}

    };

}

// -----------------------------
// 読み込み
// -----------------------------

function loadProject() {

    const data = localStorage.getItem(PROJECT_KEY);

    if (!data) {

        const p = createProject();

        localStorage.setItem(
            PROJECT_KEY,
            JSON.stringify(p)
        );

        return p;

    }

    return JSON.parse(data);

}

// -----------------------------
// 保存
// -----------------------------

function saveProject() {

    project.updated = Date.now();

    localStorage.setItem(

        PROJECT_KEY,

        JSON.stringify(project)

    );

}

// -----------------------------
// 取得
// -----------------------------

export function getProject() {

    return project;

}

// -----------------------------
// 基本情報
// -----------------------------

export function setProjectInfo(info) {

    Object.assign(project, info);

    saveProject();

}

// -----------------------------
// フォルダ追加
// -----------------------------

export function addFolder(path) {

    if (

        project.folders.includes(path)

    ) return;

    project.folders.push(path);

    saveProject();

}

// -----------------------------
// ファイル追加
// -----------------------------

export function addFile(path, content = "") {

    if (

        project.files.find(

            f => f.path === path

        )

    ) return;

    project.files.push({

        path,

        content,

        created: Date.now(),

        updated: Date.now()

    });

    saveProject();

}

// -----------------------------
// ファイル更新
// -----------------------------

export function updateFile(path, content) {

    const file = project.files.find(

        f => f.path === path

    );

    if (!file) return;

    file.content = content;

    file.updated = Date.now();

    saveProject();

}

// -----------------------------
// ファイル取得
// -----------------------------

export function getFile(path) {

    return project.files.find(

        f => f.path === path

    );

}

// -----------------------------
// 全ファイル
// -----------------------------

export function getFiles() {

    return project.files;

}

// -----------------------------
// 削除
// -----------------------------

export function deleteFile(path) {

    project.files = project.files.filter(

        f => f.path !== path

    );

    saveProject();

}

// -----------------------------
// 検索
// -----------------------------

export function searchFiles(keyword) {

    keyword = keyword.toLowerCase();

    return project.files.filter(file =>

        file.path.toLowerCase().includes(keyword) ||

        file.content.toLowerCase().includes(keyword)

    );

}

// -----------------------------
// エクスポート
// -----------------------------

export function exportProject() {

    return JSON.stringify(

        project,

        null,

        2

    );

}

// -----------------------------
// インポート
// -----------------------------

export function importProject(json) {

    project = JSON.parse(json);

    saveProject();

}
