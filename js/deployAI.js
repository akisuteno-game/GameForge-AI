// ======================================
// GameForge AI
// deployAI.js
// Deployment Management AI
// ======================================



import {

    createPagesURL,

    isConnected

} from "./githubAPI.js";



const DEPLOY_KEY =

    "gameforge-deploy-history-v1";



let deployments =

    loadDeployments();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDeployments(){


    const data =

        localStorage.getItem(

            DEPLOY_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDeployments(){


    localStorage.setItem(

        DEPLOY_KEY,

        JSON.stringify(

            deployments

        )

    );


}



// --------------------------------------
// デプロイ準備確認
// --------------------------------------

export function checkDeployReady(){


    return {


        github:

            isConnected(),



        ready:

            isConnected()



    };


}



// --------------------------------------
// デプロイ作成
// --------------------------------------

export function createDeployment({

    version="v1.0.0",

    message=""

}){


    const deployment={


        id:

        "deploy_"

        +

        Date.now(),



        version,



        message,



        status:

        "waiting",



        url:

        createPagesURL(),



        created:

        Date.now()


    };



    deployments.push(

        deployment

    );



    saveDeployments();



    return deployment;


}



// --------------------------------------
// デプロイ開始
// --------------------------------------

export function startDeploy(

    id

){


    const deploy =

        deployments.find(

            item=>

            item.id===id

        );



    if(!deploy){

        return null;

    }



    deploy.status=

        "deploying";



    saveDeployments();



    return deploy;


}



// --------------------------------------
// 完了
// --------------------------------------

export function completeDeploy(

    id

){


    const deploy =

        deployments.find(

            item=>

            item.id===id

        );



    if(!deploy){

        return null;

    }



    deploy.status=

        "completed";



    deploy.completed=

        Date.now();



    saveDeployments();



    return deploy;


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getDeployHistory(){


    return deployments;


}



// --------------------------------------
// 最新デプロイ
// --------------------------------------

export function getLatestDeploy(){


    return deployments[

        deployments.length-1

    ];


}



// --------------------------------------
// 公開状態
// --------------------------------------

export function getDeployStatus(){


    const latest =

        getLatestDeploy();



    if(!latest){

        return {


            status:

            "none"

        };


    }



    return {


        status:

        latest.status,



        url:

        latest.url



    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDeployAIInfo(){


    return {


        name:

        "GameForge Deploy AI",



        version:

        "1.0",



        deployments:

        deployments.length


    };


}
