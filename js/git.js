// ======================================
// GameForge AI
// git.js
// Internal Git System
// ======================================


import {
    getFiles
} from "./project.js";



// --------------------------------------
// Git状態
// --------------------------------------

const GIT_KEY =
    "gameforge-git-v1";


let gitState =
    loadGit();



// --------------------------------------
// 初期Git状態
// --------------------------------------

function createGit(){


    return {


        staged:[],


        commits:[],


        branches:{


            main:{

                commits:[]

            }


        },


        currentBranch:"main"


    };


}



// --------------------------------------
// 読み込み
// --------------------------------------

function loadGit(){


    const data =
        localStorage.getItem(
            GIT_KEY
        );



    if(!data){


        const git =
            createGit();



        saveGit(git);



        return git;


    }



    return JSON.parse(data);


}



// --------------------------------------
// 保存
// --------------------------------------

function saveGit(

    data=gitState

){


    localStorage.setItem(

        GIT_KEY,

        JSON.stringify(data)

    );


}



// --------------------------------------
// 変更確認
// --------------------------------------

export function getStatus(){


    const files =
        getFiles();



    const changed =
        files.map(file=>({


            path:
            file.path,


            updated:
            file.updated



        }));



    return {


        branch:

            gitState.currentBranch,


        changed,


        staged:

            gitState.staged


    };


}



// --------------------------------------
// Stage追加
// --------------------------------------

export function stageFile(

    path

){


    if(

        !gitState.staged.includes(path)

    ){


        gitState.staged.push(path);


    }



    saveGit();



    return true;


}



// --------------------------------------
// Stage解除
// --------------------------------------

export function unstageFile(

    path

){


    gitState.staged =

        gitState.staged.filter(

            file=>

            file!==path

        );



    saveGit();


}



// --------------------------------------
// Stage全解除
// --------------------------------------

export function clearStage(){


    gitState.staged=[];


    saveGit();


}



// --------------------------------------
// Commit作成
// --------------------------------------

export function createCommit(

    message

){


    const commit={


        id:

            "commit_"

            +

            Date.now(),



        message,



        files:

            [...gitState.staged],



        time:

            Date.now(),



        branch:

            gitState.currentBranch


    };



    gitState.commits.push(

        commit

    );



    gitState.branches[

        gitState.currentBranch

    ]

    .commits.push(

        commit.id

    );



    clearStage();



    saveGit();



    return commit;


}



// --------------------------------------
// Commit一覧
// --------------------------------------

export function getCommits(){


    return gitState.commits;


}



// --------------------------------------
// 現在Branch
// --------------------------------------

export function getCurrentBranch(){


    return gitState.currentBranch;


}



// --------------------------------------
// Branch変更
// --------------------------------------

export function checkoutBranch(

    name

){


    if(

        !gitState.branches[name]

    ){

        return false;

    }



    gitState.currentBranch =
        name;



    saveGit();



    return true;


}



// --------------------------------------
// Git情報
// --------------------------------------

export function getGitInfo(){


    return {


        commits:

            gitState.commits.length,


        branches:

            Object.keys(

                gitState.branches

            ),



        current:

            gitState.currentBranch


    };


}
