// ======================================
// GameForge AI
// githubAPI.js
// GitHub Integration System
// ======================================



const GITHUB_KEY =

    "gameforge-github-config-v1";



let githubConfig =

    loadConfig();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadConfig(){


    const data =

        localStorage.getItem(

            GITHUB_KEY

        );



    return data

        ? JSON.parse(data)

        :

        {


            username:"",


            repository:"",


            branch:"main",


            connected:false


        };


}



// --------------------------------------
// 保存
// --------------------------------------

function saveConfig(){


    localStorage.setItem(

        GITHUB_KEY,

        JSON.stringify(

            githubConfig

        )

    );


}



// --------------------------------------
// GitHub設定
// --------------------------------------

export function setupGitHub({

    username,

    repository,

    branch="main"

}){


    githubConfig={


        username,


        repository,


        branch,


        connected:true


    };



    saveConfig();



    return githubConfig;


}



// --------------------------------------
// 接続状態
// --------------------------------------

export function isConnected(){


    return githubConfig.connected;


}



// --------------------------------------
// 設定取得
// --------------------------------------

export function getGitHubConfig(){


    return githubConfig;


}



// --------------------------------------
// ファイルアップロードデータ生成
// --------------------------------------

export function createUploadData(

    files=[]

){


    return files.map(

        file=>({


            path:

            file.path,



            content:

            file.content


        })

    );


}



// --------------------------------------
// リポジトリ情報
// --------------------------------------

export function getRepositoryInfo(){


    return {


        owner:

        githubConfig.username,


        repo:

        githubConfig.repository,


        branch:

        githubConfig.branch


    };


}



// --------------------------------------
// 公開URL生成
// --------------------------------------

export function createPagesURL(){


    if(

        !githubConfig.connected

    ){

        return null;

    }



    return `https://${githubConfig.username}.github.io/${githubConfig.repository}/`;


}



// --------------------------------------
// 切断
// --------------------------------------

export function disconnectGitHub(){


    githubConfig.connected=

        false;



    saveConfig();


}



// --------------------------------------
// 情報
// --------------------------------------

export function getGitHubInfo(){


    return {


        name:

        "GameForge GitHub AI",



        version:

        "1.0",



        connected:

        githubConfig.connected


    };


}
