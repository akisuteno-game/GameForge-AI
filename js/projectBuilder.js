// ======================================
// GameForge AI
// projectBuilder.js
// Automatic Game Project Builder
// ======================================


import {

    createGameProject,
    createFile,
    updateFile

} from "./fileCreator.js";


import {

    generateCode

} from "./codeGenerator.js";



const BUILD_KEY =
    "gameforge-build-history-v1";



let builds =
    loadBuilds();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBuilds(){


    const data =

        localStorage.getItem(

            BUILD_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBuilds(){


    localStorage.setItem(

        BUILD_KEY,

        JSON.stringify(

            builds

        )

    );


}



// --------------------------------------
// プロジェクト生成
// --------------------------------------

export function buildProject({

    name="New Game",

    genre=["rpg"]

}){


    const build={


        id:

            "build_"

            +

            Date.now(),



        name,


        genre,



        status:

            "building",



        steps:[],



        files:[],



        created:

            Date.now()


    };



    // 基本構造作成

    createGameProject();



    build.steps.push(

        "Create Project Structure"

    );



    // HTML生成

    const html =

        generateCode({

            type:"html",

            template:"basic",

            data:{

                title:name

            }

        });



    createFile({

        path:

        "index.html",


        content:

        html.code

    });



    build.files.push(

        "index.html"

    );



    build.steps.push(

        "Generate HTML"

    );



    // CSS生成

    const css =

        generateCode({

            type:"css",

            template:"basic"

        });



    createFile({

        path:

        "css/style.css",


        content:

        css.code

    });



    build.files.push(

        "css/style.css"

    );



    build.steps.push(

        "Generate CSS"

    );



    // JS生成

    const js =

        generateCode({

            type:"js",

            template:"main"

        });



    createFile({

        path:

        "js/main.js",


        content:

        js.code

    });



    build.files.push(

        "js/main.js"

    );



    build.steps.push(

        "Generate JavaScript"

    );



    build.status=

        "completed";



    builds.push(

        build

    );



    saveBuilds();



    return build;


}



// --------------------------------------
// ビルド履歴
// --------------------------------------

export function getBuildHistory(){


    return builds;


}



// --------------------------------------
// 最新ビルド
// --------------------------------------

export function getLatestBuild(){


    return builds[

        builds.length-1

    ];


}



// --------------------------------------
// ビルド状態
// --------------------------------------

export function getBuildStatus(

    id

){


    const build =

        builds.find(

            b=>

            b.id===id

        );



    if(!build){

        return null;

    }



    return {


        name:

        build.name,


        status:

        build.status,


        progress:

        build.steps.length

    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getProjectBuilderInfo(){


    return {


        name:

        "GameForge Project Builder AI",



        version:

        "1.0",



        builds:

        builds.length


    };


}
