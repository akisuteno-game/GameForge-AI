// ======================================
// GameForge AI
// battleAI.js
// Battle System Design AI
// ======================================



const BATTLE_KEY =

    "gameforge-battle-history-v1";



let battles =

    loadBattles();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBattles(){


    const data =

        localStorage.getItem(

            BATTLE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBattles(){


    localStorage.setItem(

        BATTLE_KEY,

        JSON.stringify(

            battles

        )

    );


}



// --------------------------------------
// 戦闘システム生成
// --------------------------------------

export function createBattleSystem({

    type="realtime",

    style="rpg"

}){


    const battle={


        id:

        "battle_"

        +

        Date.now(),



        type,



        style,



        player:

        createPlayerSetting(),



        enemy:

        createEnemySetting(),



        skills:

        createSkills(),



        formula:

        createDamageFormula(),



        created:

        Date.now()


    };



    battles.push(

        battle

    );



    saveBattles();



    return battle;


}



// --------------------------------------
// プレイヤー設定
// --------------------------------------

function createPlayerSetting(){


    return {


        hp:500,


        atk:50,


        defense:20,


        speed:2000,


        critical:10



    };


}



// --------------------------------------
// 敵設定
// --------------------------------------

function createEnemySetting(){


    return {


        hpGrowth:1.25,


        atkGrowth:1.15,


        aiType:

        "smart",



        patterns:[


            "normalAttack",


            "skillAttack",


            "defense"


        ]


    };


}



// --------------------------------------
// スキル生成
// --------------------------------------

function createSkills(){


    return [


        {


            name:

            "強撃",


            power:

            2,


            cost:

            30



        },



        {


            name:

            "回復",


            power:

            1.5,


            cost:

            40



        },



        {


            name:

            "究極技",


            power:

            5,


            cost:

            100



        }



    ];


}



// --------------------------------------
// ダメージ計算生成
// --------------------------------------

function createDamageFormula(){


    return {


        normal:

        "ATK - DEF",



        critical:

        "ATK * 2",



        skill:

        "ATK * skillPower"



    };


}



// --------------------------------------
// 敵AI生成
// --------------------------------------

export function createEnemyAI(

    difficulty=1

){


    return {


        level:

        difficulty,



        behavior:[


            {

                action:

                "attack",


                rate:

                70

            },



            {

                action:

                "skill",


                rate:

                20

            },



            {

                action:

                "heal",


                rate:

                10

            }


        ]



    };


}



// --------------------------------------
// ゲージ戦闘設定
// --------------------------------------

export function createGaugeBattle(){


    return {


        system:

        "attack_speed_gauge",



        playerGauge:

        0,



        enemyGauge:

        0,



        max:

        100,



        tick:

        100



    };


}



// --------------------------------------
// バランス用データ生成
// --------------------------------------

export function generateBattleData(

enemyCount=10

){


    const data=[];



    for(

        let i=1;

        i<=enemyCount;

        i++

    ){


        data.push({


            enemy:

            "Enemy "+i,



            hp:

            100*i,



            atk:

            20*i



        });


    }



    return data;


}



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getBattleHistory(){


    return battles;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestBattle(){


    return battles[

        battles.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBattleAIInfo(){


    return {


        name:

        "Battle AI",



        version:

        "1.0",



        systems:

        battles.length


    };


}
