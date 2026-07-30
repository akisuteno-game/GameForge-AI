// ======================================
// GameForge AI
// enemyAI.js
// Enemy Generation AI
// ======================================



const ENEMY_KEY =
    "gameforge-enemy-data-v1";



let enemies =
    loadEnemies();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadEnemies(){


    const data =

        localStorage.getItem(

            ENEMY_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveEnemies(){


    localStorage.setItem(

        ENEMY_KEY,

        JSON.stringify(

            enemies

        )

    );


}



// --------------------------------------
// 名前生成
// --------------------------------------

function generateEnemyName(

    type

){


    const names={


        normal:[

            "スライム",

            "ゴブリン",

            "オーク",

            "魔獣"

        ],


        boss:[

            "深淵の王",

            "古代竜",

            "破壊神"

        ],


        undead:[

            "亡霊騎士",

            "闇の亡者"

        ]


    };



    const list =

        names[type]

        ||

        names.normal;



    return list[

        Math.floor(

            Math.random()

            *

            list.length

        )

    ];


}



// --------------------------------------
// 攻撃パターン生成
// --------------------------------------

function generateSkills(

    type

){


    if(

        type==="boss"

    ){

        return [


            {

                name:

                "必殺攻撃",


                power:

                3,


                chance:

                0.2


            },


            {

                name:

                "範囲攻撃",


                power:

                2,


                chance:

                0.4


            }


        ];

    }



    return [


        {

            name:

            "通常攻撃",


            power:

            1,


            chance:

            1


        }


    ];



}



// --------------------------------------
// 敵生成
// --------------------------------------

export function createEnemy({

    level=1,

    type="normal"

}){


    const multiplier =

        type==="boss"

        ?

        10

        :

        1;



    const enemy={


        id:

            "enemy_"

            +

            Date.now(),



        name:

            generateEnemyName(

                type

            ),



        level,



        type,



        stats:{


            hp:

                Math.floor(

                    100 *

                    level *

                    multiplier

                ),



            atk:

                Math.floor(

                    20 *

                    level *

                    multiplier

                ),



            defense:

                Math.floor(

                    10 *

                    level

                )


        },



        skills:

            generateSkills(

                type

            ),



        drops:[


            {

                name:

                "素材アイテム",


                rate:

                0.5

            },


            {

                name:

                "レア素材",


                rate:

                0.1

            }


        ],



        ai:{


            mode:

            type==="boss"

            ?

            "boss"

            :

            "normal",



            behavior:[


                "attack",

                "defend",

                "skill"

            ]


        },



        created:

            Date.now()


    };



    enemies.push(

        enemy

    );



    saveEnemies();



    return enemy;


}



// --------------------------------------
// ボス生成
// --------------------------------------

export function createBoss(

    level

){


    return createEnemy({

        level,

        type:"boss"

    });


}



// --------------------------------------
// 敵AI行動取得
// --------------------------------------

export function decideAction(

    enemy

){


    const actions =

        enemy.ai.behavior;



    return actions[

        Math.floor(

            Math.random()

            *

            actions.length

        )

    ];


}



// --------------------------------------
// 敵一覧
// --------------------------------------

export function getEnemies(){


    return enemies;


}



// --------------------------------------
// 敵検索
// --------------------------------------

export function findEnemy(

    id

){


    return enemies.find(

        e=>

        e.id===id

    );


}



// --------------------------------------
// 敵図鑑生成
// --------------------------------------

export function createEnemyBook(){


    return enemies.map(

        enemy=>({


            name:

            enemy.name,


            level:

            enemy.level,


            type:

            enemy.type


        })

    );


}



// --------------------------------------
// 情報
// --------------------------------------

export function getEnemyAIInfo(){


    return {


        name:

        "GameForge Enemy AI",


        version:

        "1.0",


        enemies:

        enemies.length


    };


}
