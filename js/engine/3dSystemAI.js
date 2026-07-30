// ======================================
// GameForge AI
// 3dSystemAI.js
// 3D Game System Design AI
// ======================================



const THREE_D_KEY =

    "gameforge-3d-history-v1";



let scenes =

    loadScenes();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadScenes(){


    const data =

        localStorage.getItem(

            THREE_D_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveScenes(){


    localStorage.setItem(

        THREE_D_KEY,

        JSON.stringify(

            scenes

        )

    );


}



// --------------------------------------
// 3Dシーン生成
// --------------------------------------

export function create3DScene({

    name="New World",

    style="fantasy"

}){


    const scene={


        id:

        "scene_"

        +

        Date.now(),



        name,



        style,



        world:

        createWorld(),



        camera:

        createCamera(),



        lighting:

        createLighting(),



        objects:

        [],



        created:

        Date.now()



    };



    scenes.push(

        scene

    );



    saveScenes();



    return scene;


}



// --------------------------------------
// ワールド生成
// --------------------------------------

function createWorld(){


    return {


        size:

        {

            x:1000,

            y:500,

            z:1000

        },



        terrain:

        "procedural",



        weather:

        "clear"



    };


}



// --------------------------------------
// カメラ設定
// --------------------------------------

function createCamera(){


    return {


        type:

        "third_person",



        distance:

        8,



        height:

        3



    };


}



// --------------------------------------
// ライト設定
// --------------------------------------

function createLighting(){


    return {


        main:

        "sun",



        intensity:

        1,



        shadows:

        true


    };


}



// --------------------------------------
// オブジェクト追加
// --------------------------------------

export function addObject(

    scene,

    object

){


    scene.objects.push({


        id:

        Date.now(),



        name:

        object.name,



        position:

        object.position ||

        {

            x:0,

            y:0,

            z:0

        },



        type:

        object.type || "model"



    });



    saveScenes();



    return scene;


}



// --------------------------------------
// マップ自動生成
// --------------------------------------

export function generateWorldMap({

    size=10

}){


    const map=[];



    for(

        let x=0;

        x<size;

        x++

    ){


        for(

            let z=0;

            z<size;

            z++

        ){


            map.push({


                x,


                z,



                terrain:

                randomTerrain()



            });


        }


    }



    return map;


}



// --------------------------------------
// 地形生成
// --------------------------------------

function randomTerrain(){


    const terrains=[


        "grass",

        "mountain",

        "water",

        "forest"



    ];



    return terrains[

        Math.floor(

            Math.random()

            *

            terrains.length

        )

    ];


}



// --------------------------------------
// シーン一覧
// --------------------------------------

export function getScenes(){


    return scenes;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestScene(){


    return scenes[

        scenes.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function get3DAIInfo(){


    return {


        name:

        "3D System AI",



        version:

        "1.0",



        scenes:

        scenes.length


    };


}
