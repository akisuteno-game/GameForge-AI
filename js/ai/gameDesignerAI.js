// ======================================
// GameForge AI
// gameDesignerAI.js
// Game Design AI
// ======================================



const DESIGN_KEY =

    "gameforge-design-history-v1";



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

        JSON.stringify(

            designs

        )

    );


}



// --------------------------------------
// ジャンル分析
// --------------------------------------

function detectGenre(

    text

){


    const genres={


        RPG:

        [

            "rpg",

            "冒険",

            "レベル",

            "戦闘"

        ],



        Action:

        [

            "アクション",

            "バトル"

        ],



        Idle:

        [

            "放置",

            "idle",

            "自動"

        ],



        Horror:

        [

            "ホラー",

            "怖い"

        ],



        Simulation:

        [

            "育成",

            "経営"

        ]



    };



    for(

        const genre in genres

    ){


        for(

            const word of genres[genre]

        ){


            if(

                text

                .toLowerCase()

                .includes(

                    word

                )

            ){


                return genre;


            }


        }


    }



    return "RPG";


}



// --------------------------------------
// 企画生成
// --------------------------------------

export function createGameDesign(

    idea

){


    const genre =

        detectGenre(

            idea

        );



    const design={


        id:

        "design_"

        +

        Date.now(),



        title:

        generateTitle(

            genre

        ),



        genre,



        concept:

        generateConcept(

            genre,

            idea

        ),



        systems:

        generateSystems(

            genre

        ),



        world:

        generateWorld(

            genre

        ),



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
// タイトル生成
// --------------------------------------

function generateTitle(

    genre

){


    const titles={


        RPG:

        "Eternal Kingdom",



        Action:

        "Blade Revolution",



        Idle:

        "Infinite Growth",



        Horror:

        "Dark Memory",



        Simulation:

        "World Creator"



    };



    return titles[genre]

    ||

    "New Adventure";


}



// --------------------------------------
// コンセプト生成
// --------------------------------------

function generateConcept(

    genre,

    idea

){


    return `

ジャンル:

${genre}



企画:

${idea}



プレイヤーが成長し、

新しい能力や世界を解放していくゲーム。

`;


}



// --------------------------------------
// システム案生成
// --------------------------------------

function generateSystems(

    genre

){


    const base=[


        "キャラクター成長",

        "装備システム",

        "実績システム",

        "セーブ機能"

    ];



    if(

        genre==="RPG"

    ){


        base.push(

            "リアルタイム戦闘",

            "敵図鑑",

            "素材収集"

        );


    }



    if(

        genre==="Idle"

    ){


        base.push(

            "自動成長",

            "転生システム"

        );


    }



    return base;


}



// --------------------------------------
// 世界観生成
// --------------------------------------

function generateWorld(

    genre

){


    if(

        genre==="RPG"

    ){


        return `

魔物が存在する世界。

英雄となった主人公が

未知の大陸を探索する。

`;

    }



    return `

プレイヤー自身が

世界を発展させる。

`;



}



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getDesignHistory(){


    return designs;


}



// --------------------------------------
// 最新企画
// --------------------------------------

export function getLatestDesign(){


    return designs[

        designs.length-1

    ];


}



// --------------------------------------
// 企画書生成
// --------------------------------------

export function exportDesignDocument(

    design

){


    return `

# ${design.title}



## Genre

${design.genre}



## Concept

${design.concept}



## Systems

${design.systems.join("\n")}



## World

${design.world}


`;

}



// --------------------------------------
// 情報
// --------------------------------------

export function getGameDesignerInfo(){


    return {


        name:

        "Game Designer AI",



        version:

        "1.0",



        designs:

        designs.length


    };


}
