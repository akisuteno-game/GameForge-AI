// ======================================
// GameForge AI
// analyzer.js
// Project Analyzer
// ======================================


import {
    getProject
} from "./project.js";



// --------------------------------------
// 設定
// --------------------------------------

const AnalyzerConfig = {

    maxWarnings:50

};



// --------------------------------------
// 拡張子取得
// --------------------------------------

function getExtension(path){


    const parts =
        path.split(".");


    if(
        parts.length < 2
    ){

        return "unknown";

    }


    return parts.pop();

}



// --------------------------------------
// 行数計算
// --------------------------------------

function countLines(content=""){


    if(!content){

        return 0;

    }


    return content
        .split("\n")
        .length;


}



// --------------------------------------
// ファイル解析
// --------------------------------------

function analyzeFile(file){


    return {


        path:file.path,


        extension:
            getExtension(file.path),


        size:
            file.content.length,


        lines:
            countLines(file.content)


    };


}



// --------------------------------------
// 拡張子統計
// --------------------------------------

function analyzeExtensions(files){


    const result={};



    files.forEach(file=>{


        const ext =
            getExtension(
                file.path
            );


        if(!result[ext]){

            result[ext]=0;

        }


        result[ext]++;


    });



    return result;


}



// --------------------------------------
// 危険コード検出
// --------------------------------------

function detectProblems(files){


    const warnings=[];



    const patterns=[


        {

            name:
            "無限ループの可能性",


            regex:
/while\s*\(\s*true\s*\)/

        },


        {

            name:
            "危険なeval使用",


            regex:
/eval\s*\(/


        },


        {

            name:
            "大量DOM操作",


            regex:
/document\.write/

        }


    ];



    files.forEach(file=>{


        patterns.forEach(pattern=>{


            if(
                pattern.regex
                .test(file.content)
            ){


                warnings.push({

                    file:
                    file.path,


                    message:
                    pattern.name


                });


            }


        });


    });



    return warnings.slice(

        0,

        AnalyzerConfig.maxWarnings

    );


}



// --------------------------------------
// ゲーム構造チェック
// --------------------------------------

function checkGameStructure(project){


    const files =
        project.files
        .map(
            f=>f.path
        );



    return {


        hasHTML:
            files.some(
                f=>f.endsWith(".html")
            ),



        hasCSS:
            files.some(
                f=>f.endsWith(".css")
            ),



        hasJavaScript:
            files.some(
                f=>f.endsWith(".js")
            ),



        hasDataFolder:
            files.some(
                f=>f.includes("data")
            )


    };


}



// --------------------------------------
// メイン解析
// --------------------------------------

export function analyzeProject(){


    const project =
        getProject();



    const files =
        project.files;



    const fileData =
        files.map(
            analyzeFile
        );



    return {


        project:


            project.name,



        summary:{


            files:
                files.length,


            lines:

                fileData.reduce(

                    (sum,f)=>

                        sum+f.lines,

                    0

                ),



            size:

                fileData.reduce(

                    (sum,f)=>

                        sum+f.size,

                    0

                )


        },



        extensions:

            analyzeExtensions(files),



        warnings:

            detectProblems(files),



        structure:

            checkGameStructure(project),



        files:

            fileData,



        analyzed:

            Date.now()


    };


}



// --------------------------------------
// レポート生成
// --------------------------------------

export function createReport(){


    const data =
        analyzeProject();



    return `

# GameForge AI
プロジェクト解析結果


## 基本情報

ファイル数:
${data.summary.files}


コード量:
${data.summary.lines} 行


容量:
${data.summary.size} bytes



## 拡張子

${JSON.stringify(
    data.extensions,
    null,
    2
)}



## 警告

${JSON.stringify(
    data.warnings,
    null,
    2
)}



## 構造

${JSON.stringify(
    data.structure,
    null,
    2
)}

`;

}



// --------------------------------------
// 簡易情報
// --------------------------------------

export function getAnalyzerInfo(){


    return {


        name:
        "GameForge Project Analyzer",


        version:
        "1.0"


    };


}
