// ======================================
// GameForge AI
// tree.js
// Project Tree Generator
// ======================================


import {
    getFiles
} from "./project.js";



// --------------------------------------
// Tree Node
// --------------------------------------

class TreeNode {


    constructor(name,type="folder"){

        this.name = name;

        this.type = type;

        this.children = [];

    }


}



// --------------------------------------
// ノード検索
// --------------------------------------

function findChild(

    node,

    name

){


    return node.children.find(

        child =>

            child.name === name

    );


}



// --------------------------------------
// ツリー作成
// --------------------------------------

export function buildTree(){


    const root =

        new TreeNode(

            "root"

        );



    const files =

        getFiles();



    files.forEach(file=>{


        const parts =

            file.path.split("/");



        let current = root;



        parts.forEach(

            (part,index)=>{


                const isFile =

                    index ===

                    parts.length-1;



                let child =

                    findChild(

                        current,

                        part

                    );



                if(!child){


                    child =

                        new TreeNode(

                            part,

                            isFile

                            ? "file"

                            : "folder"

                        );



                    current.children.push(

                        child

                    );


                }



                current = child;


            }

        );


    });



    return root;


}



// --------------------------------------
// テキスト表示
// --------------------------------------

export function treeToText(

    node = buildTree(),

    prefix="",

    isRoot=true

){


    let result="";



    if(isRoot){


        result +=

            node.name

            + "\n";


    }



    node.children.forEach(

        (child,index)=>{


            const last =

                index ===

                node.children.length-1;



            const branch =

                last

                ? "└── "

                : "├── ";



            result +=

                prefix +

                branch +

                child.name +

                "\n";



            if(

                child.type==="folder"

            ){


                result +=

                    treeToText(

                        child,

                        prefix +

                        (

                            last

                            ? "    "

                            : "│   "

                        ),

                        false

                    );


            }


        }

    );



    return result;


}



// --------------------------------------
// ファイル検索
// --------------------------------------

export function findInTree(

    keyword

){


    const result=[];



    function search(node,path=""){



        const currentPath =

            path

            ? path+"/"+node.name

            : node.name;



        if(

            node.name

            .toLowerCase()

            .includes(

                keyword

                .toLowerCase()

            )

        ){


            result.push({

                name:

                    node.name,


                path:

                    currentPath,


                type:

                    node.type

            });


        }



        node.children.forEach(

            child=>

                search(

                    child,

                    currentPath

                )

        );


    }



    search(

        buildTree()

    );



    return result;


}



// --------------------------------------
// AI用構造データ
// --------------------------------------

export function treeToJSON(){


    function convert(node){


        return {


            name:

                node.name,


            type:

                node.type,


            children:

                node.children.map(

                    convert

                )


        };


    }



    return convert(

        buildTree()

    );


}



// --------------------------------------
// 統計
// --------------------------------------

export function getTreeStats(){


    const tree =

        buildTree();



    let files=0;

    let folders=0;



    function count(node){



        if(

            node.type==="file"

        ){

            files++;

        }

        else{

            folders++;

        }



        node.children.forEach(

            count

        );


    }



    count(tree);



    return {


        files,

        folders


    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getTreeInfo(){


    return {


        name:

        "GameForge Project Tree",


        version:

        "1.0"


    };


}
