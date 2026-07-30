// ======================================
// GameForge AI
// preview.js
// Game Preview System
// ======================================



const PREVIEW_KEY =

    "gameforge-preview-state-v1";



let previewState =

    loadState();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadState(){


    const data =

        localStorage.getItem(

            PREVIEW_KEY

        );



    return data

        ? JSON.parse(data)

        :

        {


            running:false,


            file:"index.html",


            lastRun:null


        };


}



// --------------------------------------
// 保存
// --------------------------------------

function saveState(){


    localStorage.setItem(

        PREVIEW_KEY,

        JSON.stringify(

            previewState

        )

    );


}



// --------------------------------------
// プレビュー開始
// --------------------------------------

export function startPreview(

    url="index.html",

    elementId="gamePreview"

){


    const frame =

        document.getElementById(

            elementId

        );



    if(!frame){

        return false;

    }



    frame.src =

        url;



    previewState.running=

        true;



    previewState.file=

        url;



    previewState.lastRun=

        Date.now();



    saveState();



    return true;


}



// --------------------------------------
// リロード
// --------------------------------------

export function reloadPreview(

    elementId="gamePreview"

){


    const frame =

        document.getElementById(

            elementId

        );



    if(!frame){

        return false;

    }



    frame.src =

        frame.src;



    return true;


}



// --------------------------------------
// 停止
// --------------------------------------

export function stopPreview(

    elementId="gamePreview"

){


    const frame =

        document.getElementById(

            elementId

        );



    if(frame){


        frame.src=

        "about:blank";


    }



    previewState.running=

        false;



    saveState();



}



// --------------------------------------
// サイズ変更
// --------------------------------------

export function setPreviewSize(

    width,

    height,

    elementId="gamePreview"

){


    const frame =

        document.getElementById(

            elementId

        );



    if(!frame){

        return;

    }



    frame.style.width=

        width+"px";



    frame.style.height=

        height+"px";


}



// --------------------------------------
// iPad表示
// --------------------------------------

export function setTabletPreview(

    elementId="gamePreview"

){


    setPreviewSize(

        820,

        1180,

        elementId

    );


}



// --------------------------------------
// PC表示
// --------------------------------------

export function setDesktopPreview(

    elementId="gamePreview"

){


    setPreviewSize(

        1280,

        720,

        elementId

    );


}



// --------------------------------------
// 実行状態
// --------------------------------------

export function getPreviewState(){


    return previewState;


}



// --------------------------------------
// プレビュー情報
// --------------------------------------

export function getPreviewInfo(){


    return {


        name:

        "GameForge Preview Engine",



        version:

        "1.0",



        running:

        previewState.running


    };


}
