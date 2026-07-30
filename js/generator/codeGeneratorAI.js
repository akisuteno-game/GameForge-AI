// ======================================
// GameForge AI
// codeGeneratorAI.js
// Code Generation AI
// ======================================



const CODE_KEY =

    "gameforge-code-history-v1";



let codes =

    loadCodes();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadCodes(){


    const data =

        localStorage.getItem(

            CODE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveCodes(){


    localStorage.setItem(

        CODE_KEY,

        JSON.stringify(

            codes

        )

    );


}



// --------------------------------------
// コード生成
// --------------------------------------

export function generateCode({

    name="New System",

    language="javascript",

    purpose="system"

}){


    const code={


        id:

        "code_"

        +

        Date.now(),



        name,



        language,



        purpose,



        structure:

        createStructure(

            purpose

        ),



        template:

        createTemplate(

            name,

            language

        ),



        created:

        Date.now()



    };



    codes.push(

        code

    );



    saveCodes();



    return code;


}



// --------------------------------------
// 構造生成
// --------------------------------------

function createStructure(

    purpose

){


    const structures={


        battle:

        [

            "data",

            "logic",

            "render",

            "action"

        ],



        ui:

        [

            "component",

            "style",

            "event"

        ],



        system:

        [

            "config",

            "manager",

            "save"

        ]



    };



    return structures[purpose]

        ||

        structures.system;


}



// --------------------------------------
// テンプレート生成
// --------------------------------------

function createTemplate(

    name,

    language

){


    if(

        language==="javascript"

    ){


        return `

// ${name}

export function ${name}(){

    return {

        created:true

    };

}

`;


    }



    return "";

}



// --------------------------------------
// ファイル設計生成
// --------------------------------------

export function generateFilePlan({

    feature

}){


    return {


        feature,



        files:

        [

            `${feature}.js`,

            `${feature}.data.js`,

            `${feature}.ui.js`

        ]



    };


}



// --------------------------------------
// コード改善案
// --------------------------------------

export function analyzeCode({

    code

}){


    const problems=[];



    if(

        code.length < 50

    ){


        problems.push(

            "コード量不足"

        );


    }



    if(

        !code.includes(

            "export"

        )

    ){


        problems.push(

            "モジュール化不足"

        );


    }



    return {


        problems,



        score:

        Math.max(

            0,

            100 -

            problems.length *

            20

        )



    };


}



// --------------------------------------
// 修正版生成
// --------------------------------------

export function createFixSuggestion({

    problem

}){


    return {


        problem,



        suggestion:

        "コード分割と機能整理を推奨"



    };


}



// --------------------------------------
// 全コード
// --------------------------------------

export function getCodes(){


    return codes;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestCode(){


    return codes[

        codes.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCodeGeneratorAIInfo(){


    return {


        name:

        "Code Generator AI",



        version:

        "1.0",



        generated:

        codes.length


    };


}
