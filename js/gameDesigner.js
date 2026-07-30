// ======================================
// GameForge AI
// gameDesigner.js
// Game Design AI
// ======================================



// --------------------------------------
// 保存キー
// --------------------------------------

const DESIGN_KEY =
    "gameforge-design-data-v1";



let designs =
    loadDesigns();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDesigns(){


    const data =

        localStorage.getItem(

            DESIGN_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDesigns(){


    localStorage.setItem(

        DESIGN_KEY,

        JSON.stringify(designs)

    );


}



// --------------------------------------
// ジャンル分析
// --------------------------------------

export function analyzeGenre(

    description

){


    const text =

        description.toLowerCase();



    const genres=[];



    const list=[


        {

            key:"rpg",

            words:[

                "rpg",

                "冒険",

                "戦闘",

                "勇者"

            ]

        },


        {

            key:"idle",

            words:[

                "放置",

                "idle",

                "自動"

            ]

        },


        {

            key:"action",

            words:[

                "アクション",

                "戦う",

                "操作"

            ]

        },


        {

            key:"simulation",

            words:[

                "育成",

                "経営",

                "管理"

            ]

        }


    ];



    list.forEach(item=>{


        item.words.forEach(word=>{


            if(

                text.includes(word)

            ){

                genres.push(

                    item.key

                );

            }


        });


    });



    return [

        ...new Set(genres)

    ];



}



// --------------------------------------
// ゲーム設計生成
// --------------------------------------

export function createGameDesign({

    title,

    concept,

    genre=[],

    target="一般"

}){


    const design={



        id:

            "design_"

            +

            Date.now(),



        title,


        concept,


        genre,



        target,



        systems:{


            battle:

            "未設定",



            growth:

            "未設定",



            economy:

            "未設定",



            achievement:

            "未設定"


        },



        world:{


            story:

            "未設定",



            characters:

            [],



            locations:

            []


        },



        created:

            Date.now()


    };



    designs.push(

        design

    );



    saveDesigns();



    return design;


}



// --------------------------------------
// システム案追加
// --------------------------------------

export function addSystem(

    designId,

    category,

    content

){


    const design =

        designs.find(

            d=>

            d.id===designId

        );



    if(!design){

        return false;

    }



    design.systems[category] =

        content;



    saveDesigns();



    return true;


}



// --------------------------------------
// 世界観追加
// --------------------------------------

export function addWorldData(

    designId,

    type,

    value

){


    const design =

        designs.find(

            d=>

            d.id===designId

        );



    if(!design){

        return false;

    }



    if(

        Array.isArray(

            design.world[type]

        )

    ){

        design.world[type]

        .push(value);


    }

    else{


        design.world[type]=value;


    }



    saveDesigns();



}



// --------------------------------------
// 設計一覧
// --------------------------------------

export function getDesigns(){


    return designs;


}



// --------------------------------------
// 設計取得
// --------------------------------------

export function getDesign(

    id

){


    return designs.find(

        d=>

        d.id===id

    );


}



// --------------------------------------
// 仕様書生成
// --------------------------------------

export function createDesignDocument(

    id

){


    const d =

        getDesign(id);



    if(!d){

        return "";

    }



    return `

# ${d.title}


## Concept

${d.concept}



## Genre

${d.genre.join(", ")}



## World

${JSON.stringify(

d.world,

null,

2

)}



## Systems

${JSON.stringify(

d.systems,

null,

2

)}



Target:

${d.target}

`;

}



// --------------------------------------
// 情報
// --------------------------------------

export function getDesignerInfo(){


    return {


        name:

        "GameForge Game Designer AI",


        version:

        "1.0",


        designs:

        designs.length


    };


}
