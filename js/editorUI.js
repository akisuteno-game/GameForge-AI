// ======================================
// GameForge AI
// editorUI.js
// Browser Code Editor UI
// ======================================



import {

    getFiles,

    findFile,

    updateFile

} from "./fileCreator.js";



let currentFile = null;



// --------------------------------------
// ファイル一覧表示
// --------------------------------------

export function renderFileList(

    elementId="fileList"

){


    const area =

        document.getElementById(

            elementId

        );



    if(!area){

        return;

    }



    area.innerHTML="";



    const files =

        getFiles();



    files.forEach(

        file=>{


            const button =

            document.createElement(

                "button"

            );



            button.textContent =

                file.path;



            button.onclick=()=>{


                openFile(

                    file.path

                );


            };



            area.appendChild(

                button

            );


        }

    );


}



// --------------------------------------
// ファイルを開く
// --------------------------------------

export function openFile(

    path

){


    const file =

        findFile(

            path

        );



    if(!file){

        return false;

    }



    currentFile =

        file.path;



    const editor =

        document.getElementById(

            "codeEditor"

        );



    if(editor){


        editor.value =

            file.content;


    }



    return file;


}



// --------------------------------------
// 保存
// --------------------------------------

export function saveCurrentFile(){


    if(!currentFile){

        return false;

    }



    const editor =

        document.getElementById(

            "codeEditor"

        );



    if(!editor){

        return false;

    }



    updateFile(

        currentFile,

        editor.value

    );



    return true;


}



// --------------------------------------
// 新規ファイル
// --------------------------------------

export function createEditorFile(

    path,

    content=""

){


    const event =

        new CustomEvent(

            "create-file",

            {

                detail:{

                    path,

                    content

                }

            }

        );



    document.dispatchEvent(

        event

    );


}



// --------------------------------------
// コード検索
// --------------------------------------

export function searchCode(

    keyword

){


    const result=[];



    getFiles()

    .forEach(

        file=>{


            if(

                file.content.includes(

                    keyword

                )

            ){


                result.push(

                    file

                );


            }


        }

    );



    return result;


}



// --------------------------------------
// コード解析
// --------------------------------------

export function analyzeCurrentCode(){


    if(!currentFile){

        return null;

    }



    const file =

        findFile(

            currentFile

        );



    if(!file){

        return null;

    }



    return {


        file:

            file.path,



        lines:

            file.content

            .split("\n")

            .length,



        size:

            file.content.length,



        functions:

            (

                file.content

                .match(

                    /function/g

                )

                ||

                []

            )

            .length


    };


}



// --------------------------------------
// AI補完候補
// --------------------------------------

export function generateSuggestion(

    code

){


    const suggestions=[];



    if(

        code.includes(

            "function"

        )

    ){


        suggestions.push(

            "関数コメントを追加できます"

        );


    }



    if(

        code.includes(

            "class"

        )

    ){


        suggestions.push(

            "クラス設計を改善できます"

        );


    }



    if(

        code.includes(

            "TODO"

        )

    ){


        suggestions.push(

            "未完成部分をAIで生成できます"

        );


    }



    return suggestions;


}



// --------------------------------------
// エディタ初期化
// --------------------------------------

export function setupEditor(){


    renderFileList();



    const saveButton =

        document.getElementById(

            "saveButton"

        );



    if(saveButton){


        saveButton.onclick=()=>{


            saveCurrentFile();



        };


    }



}



// --------------------------------------
// 情報
// --------------------------------------

export function getEditorUIInfo(){


    return {


        name:

        "GameForge Editor UI",



        version:

        "1.0",



        current:

        currentFile


    };


}
