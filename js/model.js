// ======================================
// GameForge AI
// model.js
// AI Model Manager
// ======================================



// --------------------------------------
// 保存キー
// --------------------------------------

const MODEL_KEY =
    "gameforge-ai-model-v1";



// --------------------------------------
// 初期モデル
// --------------------------------------

const DefaultModel = {


    name:

        "GameForge AI",



    level:

        1,



    mode:

        "developer",



    abilities:{


        coding:50,


        design:50,


        debugging:50,


        architecture:30,


        gameKnowledge:50


    },



    style:{


        detailed:true,


        creative:true,


        explain:true


    },



    tools:{


        editor:true,


        rag:true,


        git:true,


        analyzer:true


    }



};



// --------------------------------------
// 現在モデル
// --------------------------------------

let model =
    loadModel();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadModel(){


    const data =

        localStorage.getItem(

            MODEL_KEY

        );



    if(!data){


        saveModel(

            DefaultModel

        );


        return {

            ...DefaultModel

        };


    }



    return JSON.parse(data);


}



// --------------------------------------
// 保存
// --------------------------------------

function saveModel(

    data=model

){


    localStorage.setItem(

        MODEL_KEY,

        JSON.stringify(data)

    );


}



// --------------------------------------
// モード変更
// --------------------------------------

export function setMode(

    mode

){


    model.mode =

        mode;



    saveModel();



}



// --------------------------------------
// 能力取得
// --------------------------------------

export function getAbilities(){


    return model.abilities;


}



// --------------------------------------
// 能力強化
// --------------------------------------

export function improveAbility(

    name,

    amount

){


    if(

        model.abilities[name]

        === undefined

    ){

        return false;

    }



    model.abilities[name] +=

        amount;



    model.abilities[name] =

        Math.min(

            100,

            model.abilities[name]

        );



    saveModel();



    return true;


}



// --------------------------------------
// AI経験値
// --------------------------------------

export function addExperience(

    amount

){


    model.level +=

        Math.floor(

            amount / 100

        );



    saveModel();



    return model.level;


}



// --------------------------------------
// ツール制御
// --------------------------------------

export function enableTool(

    tool,

    enabled=true

){


    model.tools[tool] =

        enabled;



    saveModel();


}



// --------------------------------------
// スタイル設定
// --------------------------------------

export function setStyle(

    key,

    value

){


    model.style[key] =

        value;



    saveModel();


}



// --------------------------------------
// モデル取得
// --------------------------------------

export function getModel(){


    return model;


}



// --------------------------------------
// AI能力評価
// --------------------------------------

export function getPowerLevel(){


    const values =

        Object.values(

            model.abilities

        );



    return Math.floor(


        values.reduce(

            (a,b)=>

            a+b,

            0

        )

        /

        values.length

    );


}



// --------------------------------------
// AI状態表示
// --------------------------------------

export function createModelReport(){


    return `

# GameForge AI Status


Name:

${model.name}


Level:

${model.level}


Mode:

${model.mode}


Power:

${getPowerLevel()}%



Abilities:

${JSON.stringify(

model.abilities,

null,

2

)}


`;

}



// --------------------------------------
// リセット
// --------------------------------------

export function resetModel(){


    model = {

        ...DefaultModel

    };


    saveModel();



}



// --------------------------------------
// 情報
// --------------------------------------

export function getModelInfo(){


    return {


        name:

        model.name,


        level:

        model.level,


        mode:

        model.mode,


        power:

        getPowerLevel()


    };


}
