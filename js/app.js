// ======================================
// GameForge AI
// app.js
// ======================================

const messages = document.getElementById("messages");
const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");

// 会話履歴
let history = [];

// -------------------------
// メッセージ追加
// -------------------------

function addMessage(role, text) {

    const div = document.createElement("div");

    div.className = `message ${role}`;

    div.textContent = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

// -------------------------
// AI応答（仮）
// -------------------------

function fakeAI(message){

    const lower = message.toLowerCase();

    if(lower.includes("html")){

        return "HTMLコードを生成できます。";

    }

    if(lower.includes("css")){

        return "CSSコードを生成できます。";

    }

    if(lower.includes("javascript")){

        return "JavaScriptコードを生成できます。";

    }

    if(lower.includes("敵")){

        return "敵データを生成します。";

    }

    if(lower.includes("武器")){

        return "武器データを生成します。";

    }

    if(lower.includes("ui")){

        return "UIデザインを提案します。";

    }

    return "了解しました。\n今後ここはAI APIに接続されます。";

}

// -------------------------
// 送信
// -------------------------

function send(){

    const text = promptInput.value.trim();

    if(text==="") return;

    history.push({

        role:"user",

        content:text

    });

    addMessage("user",text);

    promptInput.value="";

    const reply = fakeAI(text);

    setTimeout(()=>{

        history.push({

            role:"assistant",

            content:reply

        });

        addMessage("ai",reply);

        saveHistory();

    },500);

}

// -------------------------
// 保存
// -------------------------

function saveHistory(){

    localStorage.setItem(

        "gameforge-history",

        JSON.stringify(history)

    );

}

// -------------------------
// 読み込み
// -------------------------

function loadHistory(){

    const data = localStorage.getItem(

        "gameforge-history"

    );

    if(!data) return;

    history = JSON.parse(data);

    history.forEach(msg=>{

        addMessage(

            msg.role==="user" ? "user":"ai",

            msg.content

        );

    });

}

// -------------------------
// Enter送信
// -------------------------

promptInput.addEventListener("keydown",(e)=>{

    if(

        e.key==="Enter" &&

        !e.shiftKey

    ){

        e.preventDefault();

        send();

    }

});

// -------------------------
// ボタン
// -------------------------

sendButton.addEventListener(

    "click",

    send

);

// -------------------------
// 起動
// -------------------------

loadHistory();

addMessage(

    "ai",

`こんにちは！

私は GameForge AI です。

・ゲーム企画
・コード生成
・デバッグ
・UI設計
・RPGデータ作成

などを支援できます。`
);
