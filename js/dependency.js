// ======================================
// GameForge AI
// dependency.js
// Dependency Analyzer
// ======================================


import {
    getFiles
} from "./project.js";



// --------------------------------------
// 設定
// --------------------------------------

const DependencyConfig = {

    maxDepth:10

};



// --------------------------------------
// import解析
// --------------------------------------

function extractImports(content=""){


    const result=[];



    const patterns=[


        /import\s+.*?\s+from\s+["'](.+?)["']/g,


        /import\s*["'](.+?)["']/g,


        /require\(["'](.+?)["']\)/g


    ];



    patterns.forEach(regex=>{


        let match;



        while(

            (match=regex.exec(content))

        ){


            result.push(

                match[1]

            );


        }


    });



    return result;


}



// --------------------------------------
// export解析
// --------------------------------------

function extractExports(content=""){


    const exports=[];



    const regex =

        /export\s+(?:default\s+)?(?:function|const|let|class)\s+(\w+)/g;



    let match;



    while(

        (match=regex.exec(content))

    ){


        exports.push(

            match[1]

        );


    }



    return exports;


}



// --------------------------------------
// パス解決
// --------------------------------------

function resolvePath(

    current,

    target,

    files

){


    if(

        !target.startsWith(".")

    ){

        return target;

    }



    const parts =
        current.split("/");



    parts.pop();



    const targetParts =
        target.split("/");



    targetParts.forEach(part=>{


        if(part===".."){

            parts.pop();

        }

        else if(

            part!=="."

        ){

            parts.push(part);

        }


    });



    let path =
        parts.join("/");



    const extensions=[

        "",

        ".js",

        ".json",

        ".css",

        ".html"

    ];



    for(

        const ext of extensions

    ){

        if(

            files.some(

                f=>f.path===path+ext

            )

        ){

            return path+ext;

        }

    }



    return path;


}



// --------------------------------------
// グラフ作成
// --------------------------------------

export function buildDependencyGraph(){


    const files =
        getFiles();



    const graph={};



    files.forEach(file=>{


        graph[file.path]={


            imports:[],


            exports:

                extractExports(

                    file.content

                ),



            dependents:[]


        };


    });



    files.forEach(file=>{


        const imports =

            extractImports(

                file.content

            );



        imports.forEach(target=>{


            const resolved =

                resolvePath(

                    file.path,

                    target,

                    files

                );



            graph[file.path]
                .imports
                .push(resolved);



            if(

                graph[resolved]

            ){

                graph[resolved]
                    .dependents
                    .push(
                        file.path
                    );

            }


        });


    });



    return graph;


}



// --------------------------------------
// 影響範囲解析
// --------------------------------------

export function analyzeImpact(

    changedFile

){


    const graph =

        buildDependencyGraph();



    const result=[];



    function walk(file,depth){


        if(

            depth >
            DependencyConfig.maxDepth

        ){

            return;

        }



        if(

            !graph[file]

        ){

            return;

        }



        graph[file]
            .dependents
            .forEach(dep=>{


                if(

                    !result.includes(dep)

                ){


                    result.push(dep);


                    walk(

                        dep,

                        depth+1

                    );


                }


            });


    }



    walk(

        changedFile,

        0

    );



    return result;


}



// --------------------------------------
// グラフをテキスト化
// --------------------------------------

export function formatGraph(){


    const graph =

        buildDependencyGraph();



    let text=

        "# Dependency Graph\n\n";



    Object.entries(graph)

        .forEach(

            ([file,data])=>{


                text +=

`${file}

`;



                data.imports.forEach(

                    item=>{

                        text +=

`  ↓ ${item}

`;

                    }

                );



                text += "\n";


            }

        );



    return text;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDependencyInfo(){


    return {


        name:
        "GameForge Dependency Analyzer",


        version:
        "1.0"


    };


}
