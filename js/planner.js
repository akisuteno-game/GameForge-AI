// ======================================
// GameForge AI
// planner.js
// AI Task Planner
// ======================================


import { getProject } from "./project.js";


// --------------------------------------
// 設定
// --------------------------------------

const PlannerConfig = {

    maxTasks:10

};


// --------------------------------------
// キーワード分析
// --------------------------------------

function detectCategory(input){


    const text =
        input.toLowerCase();



    if(
        text.includes("敵") ||
        text.includes("モンスター") ||
        text.includes("monster")
    ){

        return "monster";

    }



    if(
        text.includes("武器") ||
        text.includes("アイテム") ||
        text.includes("item")
    ){

        return "item";

    }



    if(
        text.includes("ui") ||
        text.includes("画面") ||
        text.includes("デザイン")
    ){

        return "ui";

    }



    if(
        text.includes("コード") ||
        text.includes("修正") ||
        text.includes("bug")
    ){

        return "code";

    }



    if(
        text.includes("ゲーム")
    ){

        return "game";

    }



    return "general";


}



// --------------------------------------
// 基本テンプレート
// --------------------------------------

function createTemplate(category){


    const templates = {


        monster:[

            "既存の敵データを確認",

            "モンスターデータ形式を解析",

            "新しい敵情報を作成",

            "ステータスバランスを調整",

            "必要な素材や画像を確認",

            "ファイルへ追加"

        ],



        item:[

            "アイテム構造を確認",

            "既存データを解析",

            "新規アイテム作成",

            "効果値を調整",

            "保存"

        ],



        ui:[

            "現在のUI構造を確認",

            "必要な画面変更を分析",

            "HTML/CSS修正",

            "表示確認"

        ],



        code:[

            "関連ファイル検索",

            "原因分析",

            "修正案作成",

            "コード変更",

            "動作確認"

        ],



        game:[

            "ゲーム仕様確認",

            "必要システム分析",

            "データ設計",

            "実装",

            "テスト"

        ],



        general:[

            "依頼内容分析",

            "関連情報検索",

            "実装方法検討",

            "結果作成"

        ]

    };



    return templates[category] ||
        templates.general;


}



// --------------------------------------
// Plan生成
// --------------------------------------

export async function createPlan(data){


    const input =
        data.input || "";



    const category =
        detectCategory(input);



    const project =
        getProject();



    const tasks =
        createTemplate(category)
        .slice(0,PlannerConfig.maxTasks);



    return {


        id:

            "plan_" +
            Date.now(),



        category,



        project:

            project.name,



        input,



        tasks,



        created:

            Date.now()


    };


}



// --------------------------------------
// Plan表示
// --------------------------------------

export function formatPlan(plan){


    let text =
`## 作業計画

種類:
${plan.category}

`;



    plan.tasks.forEach(

        (task,index)=>{

            text +=

`${index+1}. ${task}
`;

        }

    );



    return text;


}
