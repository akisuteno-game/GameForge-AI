// ======================================
// GameForge AI
// balance.js
// Game Balance AI
// ======================================



const BalanceConfig = {


    difficulty:

        1.2,


    maxLevel:

        100



};



// --------------------------------------
// 成長曲線計算
// --------------------------------------

export function calculateGrowth(

    level,

    base,

    rate=1.15

){


    return Math.floor(

        base *

        Math.pow(

            rate,

            level-1

        )

    );


}



// --------------------------------------
// 敵データ生成
// --------------------------------------

export function generateEnemyBalance({

    level,

    name="Enemy"

}){


    return {


        name,


        level,



        hp:

            calculateGrowth(

                level,

                100,

                1.25

            ),



        atk:

            calculateGrowth(

                level,

                20,

                1.18

            ),



        defense:

            calculateGrowth(

                level,

                5,

                1.12

            ),



        gold:

            calculateGrowth(

                level,

                10,

                1.1

            ),



        exp:

            calculateGrowth(

                level,

                30,

                1.15

            )


    };


}



// --------------------------------------
// プレイヤー成長
// --------------------------------------

export function generatePlayerGrowth(

    level

){


    return {


        level,


        hp:

            calculateGrowth(

                level,

                200,

                1.18

            ),



        atk:

            calculateGrowth(

                level,

                30,

                1.15

            ),



        defense:

            calculateGrowth(

                level,

                10,

                1.1

            )


    };


}



// --------------------------------------
// 戦闘難易度分析
// --------------------------------------

export function analyzeDifficulty(

    player,

    enemy

){


    const power =


        player.atk

        +

        player.hp / 10;



    const enemyPower =


        enemy.atk

        +

        enemy.hp / 10;



    const ratio =


        power /

        enemyPower;



    let result="normal";



    if(

        ratio > 2

    ){

        result="easy";

    }



    if(

        ratio < 0.5

    ){

        result="hard";

    }



    return {


        ratio,


        difficulty:

            result


    };


}



// --------------------------------------
// 報酬調整
// --------------------------------------

export function balanceReward(

    reward,

    difficulty

){


    let multiplier = 1;



    if(

        difficulty==="easy"

    ){

        multiplier=0.8;

    }



    if(

        difficulty==="hard"

    ){

        multiplier=1.3;

    }



    return Math.floor(

        reward *

        multiplier

    );


}



// --------------------------------------
// レベル帯生成
// --------------------------------------

export function generateLevelTable(

    max=

    BalanceConfig.maxLevel

){


    const table=[];



    for(

        let i=1;

        i<=max;

        i++

    ){


        table.push({

            level:i,


            enemy:

                generateEnemyBalance({

                    level:i

                }),



            player:

                generatePlayerGrowth(

                    i

                )


        });


    }



    return table;


}



// --------------------------------------
// バランス評価
// --------------------------------------

export function evaluateBalance(

    data=[]

){


    let problems=[];



    data.forEach(item=>{


        const result =

            analyzeDifficulty(

                item.player,

                item.enemy

            );



        if(

            result.difficulty==="hard"

        ){


            problems.push({

                level:

                    item.level,


                message:

                    "難易度が高すぎます"


            });


        }



    });



    return problems;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBalanceInfo(){


    return {


        name:

        "GameForge Balance AI",


        version:

        "1.0"


    };


}
