// ======================================
// GameForge AI
// diff.js
// Code Difference Analyzer
// ======================================



// --------------------------------------
// 行分割
// --------------------------------------

function splitLines(text=""){


    return text.split("\n");


}



// --------------------------------------
// 差分生成
// --------------------------------------

export function createDiff(

    oldText,

    newText

){


    const oldLines =
        splitLines(oldText);



    const newLines =
        splitLines(newText);



    const result=[];



    const max = Math.max(

        oldLines.length,

        newLines.length

    );



    for(

        let i=0;

        i<max;

        i++

    ){


        const oldLine =
            oldLines[i];


        const newLine =
            newLines[i];



        if(

            oldLine===newLine

        ){


            result.push({

                type:"same",

                line:
                oldLine || ""

            });



        }

        else{


            if(oldLine!==undefined){


                result.push({

                    type:"remove",

                    line:
                    oldLine


                });


            }



            if(newLine!==undefined){


                result.push({

                    type:"add",

                    line:
                    newLine


                });


            }


        }


    }



    return result;


}



// --------------------------------------
// Diff表示
// --------------------------------------

export function diffToText(

    diff

){


    let output =
        "";



    diff.forEach(item=>{


        if(

            item.type==="add"

        ){


            output +=

`+ ${item.line}
`;


        }



        else if(

            item.type==="remove"

        ){


            output +=

`- ${item.line}
`;


        }



        else{


            output +=

`  ${item.line}
`;


        }


    });



    return output;


}



// --------------------------------------
// HTML表示用
// --------------------------------------

export function diffToHTML(

    diff

){


    return diff.map(item=>{


        let className =
            "diff-same";



        if(

            item.type==="add"

        ){

            className =
                "diff-add";

        }



        if(

            item.type==="remove"

        ){

            className =
                "diff-remove";

        }



        return `

<div class="${className}">

${escapeHTML(item.line)}

</div>

`;



    }).join("");



}



// --------------------------------------
// HTMLエスケープ
// --------------------------------------

function escapeHTML(text){


    return text

        .replace(

            /&/g,

            "&amp;"

        )

        .replace(

            /</g,

            "&lt;"

        )

        .replace(

            />/g,

            "&gt;"

        );


}



// --------------------------------------
// 変更量計算
// --------------------------------------

export function diffStats(

    diff

){


    let add=0;

    let remove=0;



    diff.forEach(item=>{


        if(

            item.type==="add"

        ){

            add++;

        }



        if(

            item.type==="remove"

        ){

            remove++;

        }


    });



    return {


        added:add,


        removed:remove,


        changed:

            add+remove


    };


}



// --------------------------------------
// 差分適用
// --------------------------------------

export function applyDiff(

    diff

){


    return diff

        .filter(

            item=>

            item.type!=="remove"

        )

        .map(

            item=>

            item.line

        )

        .join("\n");


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDiffInfo(){


    return {


        name:

        "GameForge Diff Engine",


        version:

        "1.0"


    };


}
