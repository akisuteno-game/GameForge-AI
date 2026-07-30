// ======================================
// GameForge AI
// formatter.js
// Code Formatter
// ======================================



// --------------------------------------
// 設定
// --------------------------------------

const FormatterConfig = {

    indent:"    ",

    removeEmptyLines:true

};



// --------------------------------------
// JavaScript整形
// --------------------------------------

export function formatJS(code=""){


    let result = code;



    // 行末空白削除

    result = result

        .split("\n")

        .map(

            line =>

            line.trimEnd()

        )

        .join("\n");



    // { の後に改行

    result = result.replace(

        /\{/g,

        "{\n"

    );



    // } の前に改行

    result = result.replace(

        /\}/g,

        "\n}"

    );



    // カンマ後スペース

    result = result.replace(

        /,(?!\s)/g,

        ", "

    );



    return normalizeLines(result);


}



// --------------------------------------
// CSS整形
// --------------------------------------

export function formatCSS(code=""){


    let result = code;



    result = result.replace(

        /\{/g,

        " {\n"

    );



    result = result.replace(

        /;/g,

        ";\n"

    );



    result = result.replace(

        /\}/g,

        "\n}\n"

    );



    return normalizeLines(result);


}



// --------------------------------------
// HTML整形
// --------------------------------------

export function formatHTML(code=""){


    let result = code;



    result = result.replace(

        />\s*</g,

        ">\n<"

    );



    return normalizeLines(result);


}



// --------------------------------------
// 共通整理
// --------------------------------------

function normalizeLines(text){


    let lines =

        text.split("\n");



    if(

        FormatterConfig.removeEmptyLines

    ){


        lines =

            lines.filter(

                line=>

                line.trim()!==""


            );


    }



    let depth=0;



    lines = lines.map(line=>{


        line =
            line.trim();



        if(

            line.startsWith("}")

        ){

            depth--;

        }



        const result =

            FormatterConfig.indent
            .repeat(
                Math.max(depth,0)
            )
            +
            line;



        if(

            line.endsWith("{")

        ){

            depth++;

        }



        return result;


    });



    return lines.join("\n");


}



// --------------------------------------
// 拡張子自動判定
// --------------------------------------

export function formatCode(

    path,

    code

){


    if(

        path.endsWith(".js")

    ){

        return formatJS(code);

    }



    if(

        path.endsWith(".css")

    ){

        return formatCSS(code);

    }



    if(

        path.endsWith(".html")

    ){

        return formatHTML(code);

    }



    return code;


}



// --------------------------------------
// 品質チェック
// --------------------------------------

export function checkCodeQuality(

    code

){


    const warnings=[];



    if(

        code.includes("console.log")

    ){

        warnings.push(

            "console.logが残っています"

        );

    }



    if(

        code.includes("TODO")

    ){

        warnings.push(

            "TODOがあります"

        );

    }



    if(

        code.length===0

    ){

        warnings.push(

            "コードが空です"

        );

    }



    return warnings;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getFormatterInfo(){


    return {


        name:

        "GameForge Formatter",


        version:

        "1.0"


    };


}
