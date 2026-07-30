// ======================================
// GameForge AI
// editor.js
// Code Editor Manager
// ======================================


import {
    getFile,
    updateFile
} from "./project.js";



// --------------------------------------
// Editor状態
// --------------------------------------

let editorState = {


    currentFile:null,


    content:"",


    history:[],


    cursor:0


};



// --------------------------------------
// ファイルを開く
// --------------------------------------

export function openFile(path){


    const file =
        getFile(path);



    if(!file){


        return {


            success:false,


            error:
            "File not found"


        };


    }



    editorState.currentFile =
        path;



    editorState.content =
        file.content;



    editorState.history=[];



    editorState.cursor=0;



    return {


        success:true,


        path,


        content:
        editorState.content


    };


}



// --------------------------------------
// 内容取得
// --------------------------------------

export function getEditorContent(){


    return editorState.content;


}



// --------------------------------------
// 編集
// --------------------------------------

export function setEditorContent(

    content

){


    saveHistory();



    editorState.content =
        content;



}



// --------------------------------------
// 追加
// --------------------------------------

export function insertText(

    text,

    position=

        editorState.content.length

){


    saveHistory();



    editorState.content =


        editorState.content.slice(

            0,

            position

        )

        +

        text

        +

        editorState.content.slice(

            position

        );


}



// --------------------------------------
// 削除
// --------------------------------------

export function deleteText(

    start,

    end

){


    saveHistory();



    editorState.content =


        editorState.content.slice(

            0,

            start

        )

        +

        editorState.content.slice(

            end

        );


}



// --------------------------------------
// 保存
// --------------------------------------

export function saveFile(){


    if(

        !editorState.currentFile

    ){

        return false;

    }



    updateFile(

        editorState.currentFile,

        editorState.content

    );



    return true;


}



// --------------------------------------
// Undo履歴
// --------------------------------------

function saveHistory(){


    editorState.history.push({

        content:

            editorState.content,


        time:

            Date.now()

    });



    if(

        editorState.history.length>50

    ){


        editorState.history.shift();


    }


}



// --------------------------------------
// Undo
// --------------------------------------

export function undo(){


    const last =

        editorState.history.pop();



    if(!last){

        return false;

    }



    editorState.content =
        last.content;



    return true;


}



// --------------------------------------
// 現在ファイル
// --------------------------------------

export function getCurrentFile(){


    return {


        path:

            editorState.currentFile,


        content:

            editorState.content


    };


}



// --------------------------------------
// エディター情報
// --------------------------------------

export function getEditorInfo(){


    return {


        file:

            editorState.currentFile,


        length:

            editorState.content.length,


        history:

            editorState.history.length


    };


}
