// ======================================
// GameForge AI
// fileCreator.js
// Automatic File Creator
// ======================================



const FILE_KEY =
    "gameforge-files-v1";



let files =
    loadFiles();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadFiles(){


    const data =

        localStorage.getItem(

            FILE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveFiles(){


    localStorage.setItem(

        FILE_KEY,

        JSON.stringify(

            files

        )

    );


}



// --------------------------------------
// ファイル作成
// --------------------------------------

export function createFile({

    path,

    content=""

}){


    const exists =

        files.find(

            file=>

            file.path===path

        );



    if(exists){


        return {


            success:false,


            message:

            "File already exists"


        };


    }



    const file={


        id:

        "file_"

        +

        Date.now(),



        path,


        content,



        created:

        Date.now(),



        updated:

        Date.now()


    };



    files.push(

        file

    );



    saveFiles();



    return {


        success:true,


        file


    };


}



// --------------------------------------
// 更新
// --------------------------------------

export function updateFile(

    path,

    content

){


    const file =

        files.find(

            f=>

            f.path===path

        );



    if(!file){

        return false;

    }



    file.content =

        content;



    file.updated =

        Date.now();



    saveFiles();



    return true;


}



// --------------------------------------
// 自動フォルダ作成
// --------------------------------------

export function createStructure(

    structure

){


    const created=[];



    structure.forEach(

        item=>{


            const result =

                createFile({

                    path:

                    item.path,


                    content:

                    item.content || ""

                });



            created.push(

                result

            );


        }

    );



    return created;


}



// --------------------------------------
// ゲームプロジェクト生成
// --------------------------------------

export function createGameProject(){

    
    return createStructure([


        {


            path:

            "index.html",


            content:

            ""

        },


        {


            path:

            "css/style.css",


            content:

            ""

        },


        {


            path:

            "js/main.js",


            content:

            ""

        },


        {


            path:

            "js/game.js",


            content:

            ""

        },


        {


            path:

            "js/data.js",


            content:

            ""

        }



    ]);


}



// --------------------------------------
// ファイル取得
// --------------------------------------

export function getFiles(){


    return files;


}



// --------------------------------------
// ファイル検索
// --------------------------------------

export function findFile(

    path

){


    return files.find(

        file=>

        file.path===path

    );


}



// --------------------------------------
// 削除
// --------------------------------------

export function deleteFile(

    path

){


    files =

        files.filter(

            file=>

            file.path!==path

        );



    saveFiles();


}



// --------------------------------------
// 拡張子分析
// --------------------------------------

export function analyzeFiles(){


    const result={


        html:0,


        css:0,


        javascript:0,


        other:0


    };



    files.forEach(

        file=>{


            if(

                file.path.endsWith(".html")

            ){

                result.html++;

            }


            else if(

                file.path.endsWith(".css")

            ){

                result.css++;

            }


            else if(

                file.path.endsWith(".js")

            ){

                result.javascript++;

            }


            else{


                result.other++;

            }


        }

    );



    return result;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getFileCreatorInfo(){


    return {


        name:

        "GameForge File Creator AI",



        version:

        "1.0",



        files:

        files.length


    };


}
