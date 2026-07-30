// ======================================
// GameForge AI
// autocomplete.js
// AI Code Completion Engine
// ======================================


import {
    getFiles
} from "./project.js";



// --------------------------------------
// 設定
// --------------------------------------

const AutoCompleteConfig = {

    maxResults:10,

    minLength:1

};



// --------------------------------------
// コード解析
// --------------------------------------

function extractSymbols(code=""){


    const symbols=[];



    const patterns=[


        // function

        /function\s+(\w+)/g,


        // const

        /const\s+(\w+)/g,


        // let

        /let\s+(\w+)/g,


        // class

        /class\s+(\w+)/g,


        // export

        /export\s+(?:function|const|class)\s+(\w+)/g


    ];



    patterns.forEach(regex=>{


        let match;



        while(

            (match=regex.exec(code))

        ){


            symbols.push(

                match[1]

            );


        }


    });



    return symbols;


}



// --------------------------------------
// プロジェクト解析
// --------------------------------------

export function collectSymbols(){


    const files =
        getFiles();



    const symbols=[];



    files.forEach(file=>{


        symbols.push(

            ...extractSymbols(

                file.content

            )

        );


    });



    return [

        ...new Set(symbols)

    ];


}



// --------------------------------------
// ドット補完
// --------------------------------------

function findObjectProperties(

    objectName

){


    const results=[];



    const files =
        getFiles();



    const regex =

        new RegExp(

            objectName +

            "\\.(\\w+)",

            "g"

        );



    files.forEach(file=>{


        let match;



        while(

            (match=regex.exec(file.content))

        ){


            results.push(

                match[1]

            );


        }


    });



    return results;


}



// --------------------------------------
// 補完候補生成
// --------------------------------------

export function getSuggestions(

    code,

    cursorPosition

){


    const before =

        code.slice(

            0,

            cursorPosition

        );



    const lastWord =

        before.match(

            /[\w.]+$/

        );



    if(!lastWord){

        return [];

    }



    const query =
        lastWord[0];



    let results=[];



    // player.xxx形式

    if(

        query.includes(".")

    ){


        const parts =

            query.split(".");


        results =

            findObjectProperties(

                parts[0]

            );


    }

    else{


        results =

            collectSymbols();


    }



    return results

        .filter(

            item=>

            item

            .toLowerCase()

            .startsWith(

                query

                .toLowerCase()

            )

            ||

            item

            .toLowerCase()

            .includes(

                query

                .toLowerCase()

            )

        )

        .slice(

            0,

            AutoCompleteConfig.maxResults

        );


}



// --------------------------------------
// AI補完候補生成
// --------------------------------------

export function createCompletionContext(

    code,

    cursorPosition

){


    return {


        code:


            code.slice(

                Math.max(

                    0,

                    cursorPosition-500

                ),

                cursorPosition

            ),



        suggestions:

            getSuggestions(

                code,

                cursorPosition

            )


    };


}



// --------------------------------------
// 候補追加
// --------------------------------------

export function applySuggestion(

    code,

    cursorPosition,

    suggestion

){


    return {


        text:

            code.slice(

                0,

                cursorPosition

            )

            +

            suggestion

            +

            code.slice(

                cursorPosition

            ),



        position:

            cursorPosition

            +

            suggestion.length


    };


}



// --------------------------------------
// ゲーム専用補完
// --------------------------------------

export function getGameSuggestions(){


    return [

        "player.hp",

        "player.atk",

        "player.def",

        "enemy.hp",

        "enemy.atk",

        "battle.start()",


        "battle.end()",


        "saveGame()",


        "loadGame()",


        "updateUI()"

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getAutocompleteInfo(){


    return {


        name:

        "GameForge AI Autocomplete",


        version:

        "1.0",


        maxResults:

        AutoCompleteConfig.maxResults


    };


}
