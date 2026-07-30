// ======================================
// GameForge AI
// workspace.js
// Multi Project Workspace Manager
// ======================================


const WORKSPACE_KEY =
    "gameforge-workspace-v1";



// --------------------------------------
// 初期状態
// --------------------------------------

let workspace =
    loadWorkspace();



// --------------------------------------
// Workspace生成
// --------------------------------------

function createWorkspace(){


    return {


        projects:[],


        current:null,


        recent:[],


        favorites:[],


        settings:{}


    };


}



// --------------------------------------
// 読み込み
// --------------------------------------

function loadWorkspace(){


    const data =
        localStorage.getItem(
            WORKSPACE_KEY
        );



    if(!data){


        const ws =
            createWorkspace();



        saveWorkspace(ws);



        return ws;


    }



    return JSON.parse(data);


}



// --------------------------------------
// 保存
// --------------------------------------

function saveWorkspace(

    data=workspace

){


    localStorage.setItem(

        WORKSPACE_KEY,

        JSON.stringify(data)

    );


}



// --------------------------------------
// プロジェクト追加
// --------------------------------------

export function addWorkspaceProject(

    project

){


    const exists =

        workspace.projects.find(

            p=>

            p.id===project.id

        );



    if(exists){

        return false;

    }



    workspace.projects.push({

        id:

            project.id || Date.now(),


        name:

            project.name,


        engine:

            project.engine || "HTML",


        created:

            Date.now(),


        updated:

            Date.now()



    });



    saveWorkspace();



    return true;


}



// --------------------------------------
// プロジェクト削除
// --------------------------------------

export function removeWorkspaceProject(

    id

){


    workspace.projects =

        workspace.projects.filter(

            p=>

            p.id!==id

        );



    if(

        workspace.current===id

    ){

        workspace.current=null;

    }



    saveWorkspace();


}



// --------------------------------------
// 切替
// --------------------------------------

export function openProject(

    id

){


    const project =

        workspace.projects.find(

            p=>

            p.id===id

        );



    if(!project){

        return false;

    }



    workspace.current=id;



    workspace.recent =

        workspace.recent.filter(

            x=>

            x!==id

        );



    workspace.recent.unshift(id);



    workspace.recent =

        workspace.recent.slice(

            0,

            10

        );



    saveWorkspace();



    return true;


}



// --------------------------------------
// 現在のプロジェクト
// --------------------------------------

export function getCurrentProject(){


    return workspace.projects.find(

        p=>

        p.id===workspace.current

    );


}



// --------------------------------------
// 一覧
// --------------------------------------

export function getProjects(){


    return workspace.projects;


}



// --------------------------------------
// 最近使用
// --------------------------------------

export function getRecentProjects(){


    return workspace.recent.map(

        id=>

        workspace.projects.find(

            p=>

            p.id===id

        )

    ).filter(Boolean);


}



// --------------------------------------
// お気に入り
// --------------------------------------

export function toggleFavorite(

    id

){


    if(

        workspace.favorites.includes(id)

    ){


        workspace.favorites =

            workspace.favorites.filter(

                x=>

                x!==id

            );


    }

    else{


        workspace.favorites.push(id);


    }



    saveWorkspace();


}



// --------------------------------------
// お気に入り取得
// --------------------------------------

export function getFavorites(){


    return workspace.projects.filter(

        p=>

        workspace.favorites.includes(

            p.id

        )

    );


}



// --------------------------------------
// 設定
// --------------------------------------

export function setWorkspaceSetting(

    key,

    value

){


    workspace.settings[key]=value;


    saveWorkspace();


}



// --------------------------------------
// 情報
// --------------------------------------

export function getWorkspaceInfo(){


    return {


        projects:

            workspace.projects.length,


        current:

            workspace.current,


        recent:

            workspace.recent.length


    };


}



// --------------------------------------
// Export
// --------------------------------------

export function exportWorkspace(){


    return JSON.stringify(

        workspace,

        null,

        2

    );


}



// --------------------------------------
// Import
// --------------------------------------

export function importWorkspace(

    json

){


    workspace =
        JSON.parse(json);



    saveWorkspace();


}
