// ======================================
// GameForge AI
// api.js
// AI API管理
// ======================================

import { getMemory } from "./memory.js";

const API_URL = "https://api.openai.com/v1/chat/completions";

let apiKey = localStorage.getItem("gameforge-api-key") || "";

export function setApiKey(key){

    apiKey = key;

    localStorage.setItem(
        "gameforge-api-key",
        key
    );

}

export function getApiKey(){

    return apiKey;

}

// ----------------------
// メッセージ作成
// ----------------------

function buildMessages(history){

    const memory = getMemory();

    const systemPrompt = `
あなたはGameForge AIです。

役割
・ゲーム設計
・ゲームプログラミング
・デバッグ
・UIデザイン
・RPG制作
・GitHub管理

長期記憶

${JSON.stringify(memory,null,2)}
`;

    return [

        {

            role:"system",

            content:systemPrompt

        },

        ...history

    ];

}

// ----------------------
// AI呼び出し
// ----------------------

export async function chat(history){

    if(!apiKey){

        throw new Error("APIキーが設定されていません。");

    }

    const response = await fetch(API_URL,{

        method:"POST",

        headers:{

            "Content-Type":"application/json",

            "Authorization":"Bearer " + apiKey

        },

        body:JSON.stringify({

            model:"gpt-5",

            messages:buildMessages(history),

            temperature:0.7

        })

    });

    if(!response.ok){

        const error = await response.text();

        throw new Error(error);

    }

    const json = await response.json();

    return json.choices[0].message.content;

}
