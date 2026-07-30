// ======================================
// GameForge AI
// levelDesignAI.js
// Level Design AI
// ======================================



const LEVEL_KEY =

    "gameforge-level-history-v1";



let levels =

    loadLevels();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadLevels(){


    const data =

        localStorage.getItem(

            LEVEL_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveLevels(){


    localStorage.setItem(

        LEVEL_KEY,

        JSON.stringify(

            levels

        )

    );


}



// --------------------------------------
// ステージ生成
// --------------------------------------

export function createLevel({

    name="Stage 1",

    difficulty=1,

    theme="forest"

}){


    const level={


        id:

        "level_"

        +

        Date.now(),



        name,



        difficulty,



        theme,



        enemies:

        generateEnemies(

            difficulty

        ),



        rewards:

        generateRewards(

            difficulty

        ),



        map:

        generateMap(

            theme

        ),



        created:

        Date.now()



    };



    levels.push(

        level

    );



    saveLevels();



    return level;


}



// --------------------------------------
// 敵配置生成
// --------------------------------------

function generateEnemies(

    difficulty

){


    const result=[];



    const count =

        difficulty * 3;



    for(

        let i=0;

        i<count;

        i++

    ){


        result.push({


            id:

            i+1,



            name:

            enemyName(

                difficulty

            ),



            hp:

            100 *

            difficulty *

            (i+1),



            atk:

            20 *

            difficulty



        });


    }



    return result;


}



// --------------------------------------
// 敵名生成
// --------------------------------------

function enemyName(

    difficulty

){


    const names=[


        "スライム",

        "ゴブリン",

        "オーク",

        "ドラゴン",

        "魔王軍兵士"



    ];



    return names[

        Math.min(

            difficulty-1,

            names.length-1

        )

    ];


}



// --------------------------------------
// 報酬生成
// --------------------------------------

function generateRewards(

    difficulty

){


    return {


        gold:

        difficulty *

        100,



        experience:

        difficulty *

        50,



        items:[


            "回復薬",


            "強化素材"



        ]


    };


}



// --------------------------------------
// マップ生成
// --------------------------------------

function generateMap(

    theme

){


    const maps={



        forest:


        [

            "入口",

            "森",

            "小屋",

            "ボス部屋"

        ],



        cave:


        [

            "洞窟入口",

            "地下道",

            "宝物庫",

            "深層"

        ],



        castle:


        [

            "城門",

            "廊下",

            "玉座前",

            "王座"

        ]



    };



    return maps[theme]

    ||

    maps.forest;


}



// --------------------------------------
// 難易度曲線生成
// --------------------------------------

export function generateDifficultyCurve(

maxStage=10

){


    const curve=[];



    for(

        let i=1;

        i<=maxStage;

        i++

    ){


        curve.push({


            stage:i,



            difficulty:

            Math.pow(

                1.2,

                i

            )


        });


    }



    return curve;


}



// --------------------------------------
// ダンジョン生成
// --------------------------------------

export function generateDungeon({

floors=10

}){


    const dungeon=[];



    for(

        let i=1;

        i<=floors;

        i++

    ){


        dungeon.push(

        createLevel({


            name:

            `Floor ${i}`,


            difficulty:i,


            theme:

            i%3===0

            ?

            "castle"

            :

            "cave"



        })

        );


    }



    return dungeon;


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getLevelHistory(){


    return levels;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestLevel(){


    return levels[

        levels.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getLevelDesignerInfo(){


    return {


        name:

        "Level Design AI",



        version:

        "1.0",



        levels:

        levels.length


    };


}
