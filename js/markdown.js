// ======================================
// GameForge AI
// markdown.js
// Markdownレンダラー
// ======================================

// -----------------------------
// エスケープ
// -----------------------------

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}

// -----------------------------
// インライン変換
// -----------------------------

function parseInline(text) {

    return text

        // コード
        .replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        )

        // 太字
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )

        // 斜体
        .replace(
            /\*(.*?)\*/g,
            "<em>$1</em>"
        )

        // リンク
        .replace(
            /$begin:math:display$\(\.\*\?\)$end:math:display$$begin:math:text$\(\.\*\?\)$end:math:text$/g,
            '<a href="$2" target="_blank">$1</a>'
        );

}

// -----------------------------
// Markdown変換
// -----------------------------

export function renderMarkdown(markdown) {

    markdown = escapeHTML(markdown);

    // -------------------------
    // コードブロック
    // -------------------------

    markdown = markdown.replace(

        /```([\w+-]*)\n([\s\S]*?)```/g,

        (_, language, code) => {

            return `
<div class="code-block">

<div class="code-header">

<span>${language || "text"}</span>

<button class="copy-btn">
コピー
</button>

</div>

<pre>

<code class="language-${language}">

${code}

</code>

</pre>

</div>
`;

        }

    );

    // -------------------------
    // 見出し
    // -------------------------

    markdown = markdown

        .replace(/^###### (.*)$/gm, "<h6>$1</h6>")
        .replace(/^##### (.*)$/gm, "<h5>$1</h5>")
        .replace(/^#### (.*)$/gm, "<h4>$1</h4>")
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/^# (.*)$/gm, "<h1>$1</h1>");

    // -------------------------
    // 引用
    // -------------------------

    markdown = markdown.replace(

        /^> (.*)$/gm,

        "<blockquote>$1</blockquote>"

    );

    // -------------------------
    // 箇条書き
    // -------------------------

    markdown = markdown.replace(

        /^- (.*)$/gm,

        "<li>$1</li>"

    );

    markdown = markdown.replace(

        /(<li>[\s\S]*?<\/li>)/g,

        "<ul>$1</ul>"

    );

    // -------------------------
    // 太字など
    // -------------------------

    markdown = parseInline(markdown);

    // -------------------------
    // 改行
    // -------------------------

    markdown = markdown.replace(/\n/g, "<br>");

    return markdown;

}

// -----------------------------
// HTML表示
// -----------------------------

export function appendMarkdown(container, markdown, className = "ai") {

    const div = document.createElement("div");

    div.className = `message ${className}`;

    div.innerHTML = renderMarkdown(markdown);

    container.appendChild(div);

    setupCopyButtons(div);

}

// -----------------------------
// コードコピー
// -----------------------------

export function setupCopyButtons(root = document) {

    root.querySelectorAll(".copy-btn").forEach(button => {

        if (button.dataset.ready) return;

        button.dataset.ready = "1";

        button.addEventListener("click", () => {

            const code = button
                .closest(".code-block")
                .querySelector("code")
                .innerText;

            navigator.clipboard.writeText(code);

            const old = button.textContent;

            button.textContent = "コピー完了";

            setTimeout(() => {

                button.textContent = old;

            }, 1500);

        });

    });

}

// -----------------------------
// メッセージ更新
// -----------------------------

export function updateMarkdown(element, markdown) {

    element.innerHTML = renderMarkdown(markdown);

    setupCopyButtons(element);

}
