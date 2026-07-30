// ======================================
// GameForge AI
// commit.js
// Commit Assistant
// ======================================


import {
    createCommit,
    stageFile,
    getStatus
} from "./git.js";



import {
    getFiles
} from "./project.js";



// --------------------------------------
// 変更分析
// --------------------------------------

export function analyzeChanges(){


    const status =
        getStatus();



    return {


        branch:

            status.branch,


        files:

            status.changed,


        staged:

            status.staged


    };


}



// --------------------------------------
// ファイルをStage
// --------------------------------------

export function stageChanges(

    files=[]

){


    files.forEach(

        file=>{


            stageFile(

                file

            );


        }

    );



    return getStatus();


}



// --------------------------------------
// 自動メッセージ生成
// --------------------------------------

export function generateMessage(

    files=[]

){


    if(

        files.length===0

    ){

        return "Update project";

    }



    const names =

        files.join(",");



    if(

        names.includes("enemy")

    ){

        return "Add enemy system";

    }



    if(

        names.includes("battle")

    ){

        return "Update battle system";

    }



    if(

        names.includes("ui") ||

        names.includes("css")

    ){

        return "Improve user interface";

    }



    return (

        "Update "

        +

        files.length

        +

        " files"

    );


}



// --------------------------------------
// AIコミット作成
// --------------------------------------

export function autoCommit(

    message=null

){


    const status =
        getStatus();



    const files =
        status.staged;



    if(

        files.length===0

    ){

        return {


            success:false,


            message:
            "変更ファイルがありません"


        };


    }



    const commitMessage =

        message ||

        generateMessage(

            files

        );



    const commit =

        createCommit(

            commitMessage

        );



    return {


        success:true,


        commit


    };


}



// --------------------------------------
// コミット情報生成
// --------------------------------------

export function formatCommit(

    commit

){


    return `

## Commit

ID:
${commit.id}


Message:
${commit.message}


Files:

${commit.files
.map(
file=>"・"+file
)
.join("\n")}


Time:

${new Date(
    commit.time
)
.toLocaleString()}


`;

}



// --------------------------------------
// AI用変更説明
// --------------------------------------

export function createChangeSummary(

    commit

){


    return {


        action:

            commit.message,


        affectedFiles:

            commit.files,


        timestamp:

            commit.time


    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCommitInfo(){


    return {


        name:

        "GameForge Commit Assistant",


        version:

        "1.0"


    };


}
