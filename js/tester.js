// ======================================
// GameForge AI
// tester.js
// Automatic Game Tester
// ======================================


import {

    getFiles

} from "./fileCreator.js";



// --------------------------------------
// テスト結果
// --------------------------------------

const TEST_KEY =
    "gameforge-test-results-v1";



let results =
    loadResults();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadResults(){


    const data =

        localStorage.getItem(

            TEST_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveResults(){


    localStorage.setItem(

        TEST_KEY,

        JSON.stringify(

            results

        )

    );


}



// --------------------------------------
// JavaScriptチェック
// --------------------------------------

function testJavaScript(

    file

){


    const issues=[];



    const code =

        file.content;



    if(

        code.includes(

            "console.log"

        )

    ){


        issues.push({

            type:

            "warning",


            message:

            "console.logがあります"

        });


    }



    if(

        code.includes(

            "TODO"

        )

    ){


        issues.push({

            type:

            "warning",


            message:

            "未完成TODOがあります"

        });


    }



    if(

        !code.includes(

            "function"

        )

        &&

        code.length>100

    ){


        issues.push({

            type:

            "info",


            message:

            "関数構造が少ない可能性があります"

        });


    }



    return issues;


}



// --------------------------------------
// HTMLチェック
// --------------------------------------

function testHTML(

    file

){


    const issues=[];



    if(

        !file.content.includes(

            "<html"

        )

    ){


        issues.push({

            type:

            "error",


            message:

            "HTML構造が不完全です"

        });


    }



    return issues;


}



// --------------------------------------
// CSSチェック
// --------------------------------------

function testCSS(

    file

){


    const issues=[];



    const open =

        (

            file.content.match(

                /{/g

            )

            ||

            []

        )

        .length;



    const close =

        (

            file.content.match(

                /}/g

            )

            ||

            []

        )

        .length;



    if(

        open!==close

    ){


        issues.push({

            type:

            "error",


            message:

            "CSS括弧エラー"

        });


    }



    return issues;


}



// --------------------------------------
// プロジェクトテスト
// --------------------------------------

export function runTest(){


    const files =

        getFiles();



    const report={


        id:

        "test_"

        +

        Date.now(),



        files:

        files.length,



        issues:[],


        score:100,



        created:

        Date.now()


    };



    files.forEach(

        file=>{


            if(

                file.path.endsWith(

                    ".js"

                )

            ){


                report.issues.push(

                    ...testJavaScript(

                        file

                    )

                );


            }



            if(

                file.path.endsWith(

                    ".html"

                )

            ){


                report.issues.push(

                    ...testHTML(

                        file

                    )

                );


            }



            if(

                file.path.endsWith(

                    ".css"

                )

            ){


                report.issues.push(

                    ...testCSS(

                        file

                    )

                );


            }


        }

    );



    report.score -=

        report.issues.length *

        5;



    report.score =

        Math.max(

            0,

            report.score

        );



    results.push(

        report

    );



    saveResults();



    return report;


}



// --------------------------------------
// 最新結果
// --------------------------------------

export function getLatestTest(){


    return results[

        results.length-1

    ];


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getTestHistory(){


    return results;


}



// --------------------------------------
// レポート生成
// --------------------------------------

export function createTestReport(

    report

){


    return `

# GameForge Test Report


Files:

${report.files}



Score:

${report.score}%



Issues:

${report.issues

.map(

i=>

"・"+i.message

)

.join("\n")}


`;

}



// --------------------------------------
// 情報
// --------------------------------------

export function getTesterInfo(){


    return {


        name:

        "GameForge Tester AI",


        version:

        "1.0",


        tests:

        results.length


    };


}
