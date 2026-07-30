// ======================================
// GameForge AI
// branch.js
// Branch Manager
// ======================================


import {
    getGitInfo,
    checkoutBranch
} from "./git.js";



// --------------------------------------
// Git保存
// --------------------------------------

const BRANCH_KEY =
    "gameforge-branches-v1";



let branches =
    loadBranches();



// --------------------------------------
// 初期化
// --------------------------------------

function createBranches(){


    return {


        main:{


            name:"main",


            created:

                Date.now(),



            type:"main"


        }


    };


}



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBranches(){


    const data =

        localStorage.getItem(

            BRANCH_KEY

        );



    if(!data){


        const b =
            createBranches();



        saveBranches(b);



        return b;


    }



    return JSON.parse(data);


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBranches(

    data=branches

){


    localStorage.setItem(

        BRANCH_KEY,

        JSON.stringify(data)

    );


}



// --------------------------------------
// ブランチ作成
// --------------------------------------

export function createBranch(

    name,

    type="feature"

){


    if(

        branches[name]

    ){

        return {


            success:false,


            message:
            "すでに存在します"


        };


    }



    branches[name]={


        name,


        type,


        created:

            Date.now()



    };



    saveBranches();



    return {


        success:true,


        branch:

            branches[name]


    };


}



// --------------------------------------
// AI用ブランチ作成
// --------------------------------------

export function createFeatureBranch(

    feature

){


    const name =

        "feature/"

        +

        feature

        .toLowerCase()

        .replace(

            /\s+/g,

            "-"

        );



    return createBranch(

        name,

        "feature"

    );


}



// --------------------------------------
// 切替
// --------------------------------------

export function switchBranch(

    name

){


    if(

        !branches[name]

    ){

        return false;

    }



    return checkoutBranch(

        name

    );


}



// --------------------------------------
// 削除
// --------------------------------------

export function deleteBranch(

    name

){


    if(

        name==="main"

    ){

        return false;

    }



    delete branches[name];



    saveBranches();



    return true;


}



// --------------------------------------
// 一覧
// --------------------------------------

export function getBranches(){


    return Object.values(

        branches

    );


}



// --------------------------------------
// 検索
// --------------------------------------

export function searchBranch(

    keyword

){


    return getBranches()

        .filter(

            branch=>

            branch.name

            .includes(

                keyword

            )

        );


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBranchInfo(){


    return {


        total:

            Object.keys(

                branches

            ).length,


        current:

            getGitInfo()

            .current


    };


}
