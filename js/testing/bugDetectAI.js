// ======================================
// GameForge AI
// bugDetectAI.js
// Bug Detection AI
// ======================================



const BUG_KEY =

    "gameforge-bug-history-v1";



let bugs =

    loadBugs();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBugs(){


    const data =

        localStorage.getItem(

            BUG_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBugs(){


    localStorage.setItem(

        BUG_KEY,

        JSON.stringify(

            bugs

        )

    );


}



// --------------------------------------
// バグ登録
// --------------------------------------

export function createBug({

    title,

    description,

    type="error"

}){


    const bug={


        id:

        "bug_"

        +

        Date.now(),



        title,



        description,



        type,



        severity:

        analyzeSeverity(

            type

        ),



        status:

        "open",



        created:

        Date.now()



    };



    bugs.push(

        bug

    );



    saveBugs();



    return bug;


}



// --------------------------------------
// コード解析
// --------------------------------------

export function scanCode(

    code

){


    const result=[];



    if(

        code.includes(

            "undefined"

        )

    ){


        result.push(

            createBug({


                title:

                "Undefined detected",



                description:

                "未定義値の可能性があります",



                type:

                "logic"



            })

        );


    }



    if(

        code.includes(

            "console.log"

        )

    ){


        result.push(

            createBug({


                title:

                "Debug code found",



                description:

                "不要なデバッグコードがあります",



                type:

                "warning"



            })

        );


    }



    return result;


}



// --------------------------------------
// 重要度判定
// --------------------------------------

function analyzeSeverity(

    type

){


    const levels={


        error:

        "high",



        logic:

        "high",



        warning:

        "low"



    };



    return levels[type]

        ||

        "normal";


}



// --------------------------------------
// バグ解決
// --------------------------------------

export function resolveBug(

    id

){


    const bug=

        bugs.find(

            b=>

            b.id===id

        );



    if(!bug)

        return null;



    bug.status=

        "fixed";



    bug.fixed=

        Date.now();



    saveBugs();



    return bug;


}



// --------------------------------------
// 未修正一覧
// --------------------------------------

export function getOpenBugs(){


    return bugs.filter(

        bug=>

        bug.status==="open"

    );


}



// --------------------------------------
// 修正提案
// --------------------------------------

export function suggestFix(

    bug

){


    return {


        bug:

        bug.title,



        suggestion:

        [

            "コード確認",

            "条件分岐確認",

            "データ型確認"

        ]



    };


}



// --------------------------------------
// バグ数
// --------------------------------------

export function getBugCount(){


    return bugs.length;


}



// --------------------------------------
// 全バグ
// --------------------------------------

export function getBugs(){


    return bugs;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestBug(){


    return bugs[

        bugs.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBugDetectAIInfo(){


    return {


        name:

        "Bug Detect AI",



        version:

        "1.0",



        bugs:

        bugs.length


    };


}
