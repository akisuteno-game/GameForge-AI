// ======================================
// GameForge AI
// enemyBalanceAI.js
// Enemy Balance AI
// ======================================



const ENEMY_BALANCE_KEY =

    "gameforge-enemy-balance-history-v1";



let balances =

    loadBalances();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBalances(){


    const data =

        localStorage.getItem(

            ENEMY_BALANCE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBalances(){


    localStorage.setItem(

        ENEMY_BALANCE_KEY,

        JSON.stringify(

            balances

        )

    );


}



// --------------------------------------
// 敵バランス作成
// --------------------------------------

export function createEnemyBalance({

    enemyName="Monster",

    level=1,

    type="normal"

}){


    const enemy={


        id:

        "enemy_balance_"

        +

        Date.now(),



        enemyName,



        level,



        type,



        stats:

        generateStats(

            level,

            type

        ),



        element:

        generateElement(),



        created:

        Date.now()



    };



    balances.push(

        enemy

    );



    saveBalances();



    return enemy;


}



// --------------------------------------
// ステータス生成
// --------------------------------------

function generateStats(

    level,

    type

){


    let multiplier=1;



    if(type==="elite"){


        multiplier=2;


    }



    if(type==="boss"){


        multiplier=8;


    }



    return {


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



        def:

        Math.floor(

            10 *

            level *

            multiplier

        ),



        speed:

        Math.max(

            500,

            2000 -

            level *

            20

        )



    };


}



// --------------------------------------
// 属性生成
// --------------------------------------

function generateElement(){


    const elements=[


        "fire",

        "water",

        "earth",

        "wind",

        "light",

        "dark"



    ];



    return elements[

        Math.floor(

            Math.random()

            *

            elements.length

        )

    ];


}



// --------------------------------------
// 敵調整
// --------------------------------------

export function adjustEnemy({

    enemy,

    winRate

}){


    if(

        winRate > 0.9

    ){


        enemy.stats.hp *= 1.2;

        enemy.stats.atk *= 1.15;


    }



    if(

        winRate < 0.4

    ){


        enemy.stats.hp *= 0.8;

        enemy.stats.atk *= 0.85;


    }



    enemy.stats.hp =

        Math.floor(

            enemy.stats.hp

        );



    enemy.stats.atk =

        Math.floor(

            enemy.stats.atk

        );



    return enemy;


}



// --------------------------------------
// ボス生成
// --------------------------------------

export function createBossBalance({

    name="Final Boss",

    level=100

}){


    return createEnemyBalance({


        enemyName:

        name,



        level,



        type:

        "boss"



    });


}



// --------------------------------------
// 属性相性
// --------------------------------------

export function createElementTable(){


    return {


        fire:

        {

            weak:

            "water"

        },



        water:

        {

            weak:

            "earth"

        },



        earth:

        {

            weak:

            "wind"

        },



        wind:

        {

            weak:

            "fire"

        },



        light:

        {

            weak:

            "dark"

        },



        dark:

        {

            weak:

            "light"

        }



    };


}



// --------------------------------------
// 敵評価
// --------------------------------------

export function evaluateEnemy(

    enemy

){


    const power =

        enemy.stats.hp *

        0.5

        +

        enemy.stats.atk *

        2;



    return {


        name:

        enemy.enemyName,



        power:



        Math.floor(

            power

        )



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getEnemyBalanceHistory(){


    return balances;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestEnemyBalance(){


    return balances[

        balances.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getEnemyBalanceAIInfo(){


    return {


        name:

        "Enemy Balance AI",



        version:

        "1.0",



        enemies:

        balances.length


    };


}
