// ======================================
// GameForge AI
// bugFixer.js
// Automatic Bug Fix AI
// ======================================


import {

    findFile,

    updateFile

} from "./fileCreator.js";



const FIX_KEY =
    "gameforge-fix-history-v1";



let fixes =
    loadFixes();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadFixes(){


    const data =

        localStorage.getItem(

            FIX_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveFixes(){


    localStorage.setItem(

        FIX_KEY,

        JSON.stringify(

            fixes

        )

    );


}



// --------------------------------------
// エラー分析
// --------------------------------------

export function analyzeBug(

    issue

){


    let type =

        "unknown";



    let solution =

        "原因調査が必要";



    const text =

        issue.message

        .toLowerCase();



    if(

        text.includes(

            "console"

        )

    ){


        type="cleanup";


        solution=

        "不要なconsole.logを削除";


    }



    else if(

        text.includes(

            "todo"

        )

    ){


        type="unfinished";


        solution=

        "未完成処理を実装";


    }



    else if(

        text.includes(

            "html"

        )

    ){


        type="html";


        solution=

        "HTML構造を修正";


    }



    else if(

        text.includes(

            "css"

        )

    ){


        type="css";


        solution=

        "CSS構文を修正";


    }



    return {


        issue,


        type,


        solution


    };


}



// --------------------------------------
// 修正案生成
// --------------------------------------

export function generateFix(

    analysis

){


    const fix={


        id:

        "fix_"

        +

        Date.now(),



        type:

        analysis.type,



        description:

        analysis.solution,



        created:

        Date.now()



    };



    return fix;


}



// --------------------------------------
// ファイル修正
// --------------------------------------

export function applyFix(

    path,

    operation

){


    const file =

        findFile(

            path

        );



    if(!file){


        return {


            success:false,


            message:

            "ファイルがありません"


        };


    }



    let content =

        file.content;



    if(

        operation.type==="cleanup"

    ){


        content =

            content.replace(

                /console\.log\(.*?\);?/g,

                ""

            );


    }



    if(

        operation.type==="unfinished"

    ){


        content +=

`

// AI Generated Fix

// TODO completed

`;



    }



    updateFile(

        path,

        content

    );



    const record={


        path,


        operation,


        time:

        Date.now()



    };



    fixes.push(

        record

    );



    saveFixes();



    return {


        success:true,


        record


    };


}



// --------------------------------------
// 修正履歴
// --------------------------------------

export function getFixHistory(){


    return fixes;


}



// --------------------------------------
// 自動修復フロー
// --------------------------------------

export function autoFix(

    issues=[]

){


    return issues.map(

        issue=>{


            const analysis =

                analyzeBug(

                    issue

                );



            return generateFix(

                analysis

            );


        }

    );


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBugFixerInfo(){


    return {


        name:

        "GameForge Bug Fixer AI",


        version:

        "1.0",


        fixes:

        fixes.length


    };


}
