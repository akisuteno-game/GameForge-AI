// ======================================
// GameForge AI
// chatController.js
// チャット × コード生成 × プロジェクト保存 を繋ぐ
// ======================================

import {
    sendUserMessage,
    sendAIMessage,
    getMessages,
    renderChat,
    setupChatInput
} from "./chatUI.js";

import {
    chat,
    setApiKey,
    getApiKey
} from "./api.js";

import {
    addFile,
    updateFile,
    getFiles
} from "./project.js";

// --------------------------------------
// AIの返信からファイルを抜き出す
// 形式: ### FILE: path/to/file.js の次のコードブロック
// --------------------------------------

function extractFiles(text) {

    const files = [];

    const pattern =
        /###\s*FILE:\s*(.+?)\s*\n```[a-zA-Z0-9]*\n([\s\S]*?)```/g;

    let match;

    while ((match = pattern.exec(text)) !== null) {

        files.push({
            path: match[1].trim(),
            content: match[2].replace(/\n$/, "")
        });

    }

    return files;

}

// --------------------------------------
// 抽出したファイルをプロジェクトに保存
// --------------------------------------

function saveExtractedFiles(files) {

    files.forEach(file => {

        const result = addFile(file.path, file.content);

        if (!result.success) {
            updateFile(file.path, file.content);
        }

    });

    if (files.length > 0) {
        renderFileList();
    }

}

// --------------------------------------
// ファイル一覧表示
// --------------------------------------

function renderFileList(elementId = "fileList") {

    const area = document.getElementById(elementId);

    if (!area) return;

    const files = getFiles();

    if (files.length === 0) {
        area.innerHTML = "<p class=\"file-empty\">まだファイルはありません</p>";
        return;
    }

    area.innerHTML = files
        .map(file => `<div class="file-item">${file.path}</div>`)
        .join("");

}

// --------------------------------------
// APIキー設定UI
// --------------------------------------

function setupApiKeyInput() {

    const input = document.getElementById("apiKeyInput");
    const button = document.getElementById("apiKeySaveButton");

    if (!input || !button) return;

    if (getApiKey()) {
        input.value = getApiKey();
    }

    button.onclick = () => {

        const key = input.value.trim();

        if (!key) return;

        setApiKey(key);

        sendAIMessage("APIキーを保存しました。ゲームの内容を話しかけてください。");

        renderChat();

    };

}

// --------------------------------------
// メッセージ送信時の処理
// --------------------------------------

async function handleUserMessage(text) {

    if (!getApiKey()) {

        sendAIMessage(
            "先にAPIキーを設定してください(上の入力欄に貼り付けて保存)。"
        );

        renderChat();

        return;

    }

    sendAIMessage("……考え中……");

    renderChat();

    try {

        const history = getMessages()
            .filter(m => m.content !== "……考え中……")
            .map(m => ({
                role: m.role,
                content: m.content
            }));

        const reply = await chat(history);

        // 「考え中」の表示を消してから本回答を追加する
        const messages = getMessages();
        const lastIndex = messages.length - 1;

        if (
            messages[lastIndex] &&
            messages[lastIndex].content === "……考え中……"
        ) {
            messages.pop();
        }

        sendAIMessage(reply);

        renderChat();

        const files = extractFiles(reply);

        saveExtractedFiles(files);

    } catch (error) {

        sendAIMessage("エラー: " + error.message);

        renderChat();

    }

}

// --------------------------------------
// 初期化
// --------------------------------------

export function initChatController() {

    renderChat();

    renderFileList();

    setupApiKeyInput();

    setupChatInput({
        inputId: "chatInput",
        buttonId: "sendButton",
        callback: handleUserMessage
    });

}

window.addEventListener("DOMContentLoaded", () => {
    initChatController();
});
